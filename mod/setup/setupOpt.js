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

        this.store()
    }

    opt.store = function() {
        lib.storage.storeOpt()
    }

    lab.vm.assign('opt', opt)
    lib.storage.restoreOpt()
}
setupOpt.Z = 23
