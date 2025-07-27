function restoreEntry(key) {
    try {
        // log('loading: ' + env.tune.storagePrefix + '-' + key.toLowerCase())
        const raw = localStorage.getItem( env.tune.storagePrefix + '-' + key.toLowerCase())

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
        localStorage.setItem( env.tune.storagePrefix + '-' + key.toLowerCase(), json )
    } catch (e) {
        log.error(e)
    }
}

function clearEntries() {
    window.localStorage.clear()
}
