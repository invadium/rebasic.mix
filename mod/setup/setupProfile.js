function setupOpt() {
    const opt = new lab.vm.Map('opt')

    opt.handlers = extend({}, lib.optHandlers)
    opt.handlers.__ = opt
    opt.handlers.vm = lab.vm

    opt.set = function(key, val) {
        key = key.toLowerCase()
        if (val.toLowerCase) val = val.toLowerCase()
        lab.vm.Map.prototype.set.apply(this, [ key, val ])

        // find a custom handler
        if (isFun(this.handlers[key])) {
            this.handlers[key](val)
        }
        // lib.profile.storeOpt()
    }

    lab.vm.assign('opt', opt)
    lab.vm.defineConst('opt', opt)
    env.opt = opt.data

    opt.set('mouse', 'show')
    opt.set('edge', env.tune.edge)
    opt.set('dscale', 1)
}

function setupCache() {
    const cache = new lab.vm.Map('cache')

    cache.set = function(key, val) {
        ey = key.toLowerCase()
        lab.vm.Map.prototype.set.apply(this, [ key, val ])
        lib.profile.storeCache()
    }

    lab.vm.assign('cache', cache)
    lab.vm.defineConst('cache', cache)
    //lib.profile.restoreCache()
}

function setupProfile() {
    env.profile = {
        name: 'default',
        customList: [],
    }
    setupOpt()
    setupCache()

    lib.profile.restoreProfileConfig()
    log(`PROFILE: [${env.profile.name}]`)
    console.dir(env.profile.customList)

    lib.profile.loadProfile(env.profile.name)
    lab.textmode.clear()
    //lib.gx.syncOutAll()
    lib.gx.clearAll()
    lib.gx.flood(env.context.paper)
}
setupProfile.Z = 21
