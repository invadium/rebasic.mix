function setupOpt() {
    const opt = new lab.vm.Map('opt')

    opt.handlers = extend({}, lib.optHandlers)
    opt.handlers.__ = opt
    opt.handlers.vm = lab.vm

    opt.set = function(key, val) {
        key = key.toLowerCase()
        lab.vm.Map.prototype.set.apply(this, [ key, val ])

        // find a custom handler
        if (isFun(this.handlers[key])) {
            this.handlers[key](val)
        }
        lib.profile.storeOpt()
    }

    lab.vm.assign('opt', opt)
    lab.vm.defineConst('opt', opt)
    //lib.profile.restoreOpt()
}

function setupCache() {
    const cache = new lab.vm.Map('cache')

    cache.set = function(key, val) {
        key = key.toLowerCase()
        lab.vm.Map.prototype.set.apply(this, [ key, val ])
        lib.profile.storeCache()
    }

    lab.vm.assign('cache', cache)
    lab.vm.defineConst('cache', cache)
    //lib.profile.restoreCache()
}

function setupProfile() {
    setupOpt()
    setupCache()

    env.profile = {
        name: 'default',
        customList: [],
    }
    lib.profile.restoreProfileConfig()
    log(`PROFILE: [${env.profile.name}]`)
    console.dir(env.profile.customList)
    lib.profile.loadProfileConfig(env.profile.name)
}
setupProfile.Z = 21
