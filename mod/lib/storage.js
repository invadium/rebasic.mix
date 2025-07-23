function restoreEntry(key) {
    try {
        const raw = window.localStorage.getItem( env.tune.storagePrefix + '-' + key.toLowerCase())

        if (raw) {
            return JSON.parse(raw)
        }
    } catch (e) {
        log.error(e)
    }
}

function storeEntry(key, payload) {
    try {
        const json = JSON.stringify(payload)
        window.localStorage.setItem( env.tune.storagePrefix + '-' + key.toLowerCase(), json )
    } catch (e) {
        log.error(e)
    }
}

function restoreMap(map, data) {
    if (!data) return

    map.data = {}

    log(`restored ${map.name}:`)
    Object.keys(data).forEach(key => {
        const val = data[key]
        map.set(key, val)
        log.raw(`    ${key}: ${val}`)
    })
}

function setProfile(profile) {
    profile = profile.toLowerCase()

    env.profile = profile
    this.storeEntry('profile', {
        name: profile,
    })
}

function restoreProfile() {
    const storedProfile = this.restoreEntry('profile')
    if (storedProfile && storedProfile.name) {
        env.profile = storageProfile.name
    }
}

function storeOpt() {
    this.storeEntry('opt-' + env.profile, lab.vm.scope.opt.data)
}

function restoreOpt() {
    const storedOpt = this.restoreEntry('opt-' + env.profile)
    this.restoreMap(lab.vm.scope.opt, storedOpt)
}

function storeCache() {
    this.storeEntry('cache-' + env.profile, lab.vm.scope.store.data)
}

function restoreCache() {
    const storedCache = this.restoreEntry('cache-' + env.profile)
    this.restoreMap(lab.vm.scope.store, storedCache)
}
