function hash(str) {
    setTimeout(() => {
        let run = false
        let target = str.substring(1)
        if (target.startsWith('!')) {
            run = true
            target = target.substring(1)
        }
        lab.vm.exec('load "' + target + '"')
        if (run) lab.vm.exec('run')
    }, 100)
}
