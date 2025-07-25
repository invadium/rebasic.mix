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

