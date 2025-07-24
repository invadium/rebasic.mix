function setupCache() {
    const cache = new lab.vm.Map('cache')

    cache.set = function(key, val) {
        key = key.toLowerCase()
        lab.vm.Map.prototype.set.apply(this, [ key, val ])
        lib.storage.storeCache()
    }

    lab.vm.assign('cache', cache)
    lib.storage.restoreCache()
}
setupCache.Z = 25
