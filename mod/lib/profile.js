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
function setProfile(profile) {
    profile = profile.toLowerCase()

    // TODO store the custom index
    env.profile = profile
    lib.storage.storeEntry('profile', {
        name: profile,
    })
}

// restore the profile from cache if previously stored
function restoreProfileConfig() {
    const storedProfile = lib.storage.restoreEntry('profile')
    if (storedProfile && storedProfile.name) {
        env.profile = storedProfile.name
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

        const optRestored   = this.restoreOpt()
        if (!optRestored) {
            lab.vm.scope.opt.data = {}
        }

        const cacheRestored = this.restoreCache()
        if (!cacheRestored) {
            lab.vm.scope.cache.data = {}
        }

    } else {
        throw new Error(`can't find the profile [${name}]`)
    }

    /*
    const optRestored   = this.restoreOpt()

    if (!optRestored) {
        const opt = lab.vm.scope.opt
        const bcontext = env.context

        log(`setting profile ink to ${bcontext.ink}`)
        opt.set('ink', bcontext.ink)

        log(`setting profile paper to ${bcontext.paper}`)
        opt.set('paper', bcontext.paper)

        log(`setting profile border to ${bcontext.paper}`)
        opt.set('border', bcontext.border)
    }
    */
}

function storeOpt(profile) {
    lib.storage.storeEntry('opt-' + (profile || env.profile), lab.vm.scope.opt.data)
}

function restoreOpt() {
    const storedOpt = lib.storage.restoreEntry('opt-' + env.profile)
    return this.restoreMap(lab.vm.scope.opt, storedOpt)
}

function storeCache(profile) {
    lib.storage.storeEntry('cache-' + (profile || env.profile), lab.vm.scope.cache.data)
}

function restoreCache() {
    const storedCache = lib.storage.restoreEntry('cache-' + env.profile)
    return this.restoreMap(lab.vm.scope.cache, storedCache)
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
}
