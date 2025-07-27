function restoreMap(map, data) {
    if (!data) return false

    map.data = {}

    log(`restored ${map.name}:`)
    Object.keys(data).forEach(key => {
        const val = data[key]
        map.set(key, val)
        log.raw(`    ${key}: ${val}`)
    })
    return true
}

// set the profile name and cache the profile config
function setProfile(profileName) {
    profileName = profileName.toLowerCase()

    // TODO store the custom index
    if (!isObj(env.profile)) {
        env.profile = {
            name: profileName,
            customList: []
        }
    } else {
        env.profile.name = profileName
    }
    storeProfileConfig()
}

function registerCustomProfile(profileName) {
    if (!isObj(env.profile)) {
        env.profile = {
            name: 'default',
            customList: []
        }
    }
    if (env.profile.customList.indexOf(profileName) < 0) {
        env.profile.customList.push(profileName)
    }
}

// restore the profile from cache if previously stored
function restoreProfileConfig() {
    const storedProfile = lib.storage.restoreEntry('profile')
    if (storedProfile && storedProfile.name) {
        env.profile = storedProfile
    }
}

// load an existing profile or create and store a new one
function loadProfile(name) {
    name = name.toLowerCase()

    // look for a predefined profiled
    let profileSrc = lib.profiles[name]
    if (!profileSrc) {
        // try to load a custom profile
        const storedProfile = lib.storage.restoreEntry('profile-' + name)
        if (storedProfile && storedProfile.src) profileSrc = storedProfile.src
    }

    if (profileSrc) {
        this.setProfile(name)

        log(`profile [${name}]:`)
        log.raw(profileSrc)
        lab.vm.runSource(profileSrc)

        const optRestored = this.restoreOpt()
        if (!optRestored) {
            lab.vm.scope.opt.data = {}
        }
        env.opt = lab.vm.scope.opt.data

        const cacheRestored = this.restoreCache()
        if (!cacheRestored) {
            lab.vm.scope.cache.data = {}
        }

    } else {
        throw new Error(`can't find the profile [${name}]`)
    }
}

function storeOpt(profile) {
    if (!lab.vm.scope.opt || Object.keys(lab.vm.scope.opt.data).length === 0) return
    lib.storage.storeEntry('opt-' + (profile || env.profile.name), lab.vm.scope.opt.data)
}

function restoreOpt() {
    const storedOpt = lib.storage.restoreEntry('opt-' + env.profile.name)
    return this.restoreMap(lab.vm.scope.opt, storedOpt)
}

function storeCache(profile) {
    if (!lab.vm.scope.cache || Object.keys(lab.vm.scope.cache.data).length === 0) return
    lib.storage.storeEntry('cache-' + (profile || env.profile.name), lab.vm.scope.cache.data)
}

function restoreCache() {
    const storedCache = lib.storage.restoreEntry('cache-' + env.profile.name)
    return this.restoreMap(lab.vm.scope.cache, storedCache)
}

function storeProfileConfig() {
    lib.storage.storeEntry('profile', env.profile)
}

function saveProfile(name) {
    log(`saving profile [${name}]`)
    const profileSrc = lab.vm.source()
    log.raw(profileSrc)
    lib.storage.storeEntry('profile-' + name, {
        src: profileSrc,
    })
    storeOpt(name)
    storeCache(name)
    registerCustomProfile(name)
    storeProfileConfig()
}
