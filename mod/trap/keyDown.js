function keyDown(e) {
    if (!e.repeat) {
        env.currentKey = e.key.toLowerCase()
    }

    if (e.ctrlKey || e.metaKey) {
        switch(e.code) {
            case 'KeyC':
            case 'Backspace':
                lab.ioCtrl.stop()
                break

            case 'ArrowUp':
                lab.ioCtrl.prevLine()
                break
            case 'ArrowDown':
                lab.ioCtrl.nextLine()
                break
            case 'ArrowLeft':
                lab.ioCtrl.firstLine()
                break
            case 'ArrowRight':
                lab.ioCtrl.lastLine()
                break
            case 'Home':
                lab.ioCtrl.firstPage()
                break
            case 'End':
                lab.ioCtrl.lastPage()
                break
        }

    } else if (e.key.length === 1) {
        lab.ioCtrl.inputKey(e.key)
    } else {
        switch (e.code) {
            case 'Escape':
                lab.ioCtrl.stop()
                break

            case 'Enter':
                lab.ioCtrl.enter()
                break

            case 'Backspace':
                lab.ioCtrl.backspace()
                break

            case 'ArrowUp':
                lab.ioCtrl.prev()
                break

            case 'ArrowDown':
                lab.ioCtrl.next()
                break
            case 'Home':
                lab.ioCtrl.home()
                break
            case 'ArrowLeft':
                lab.ioCtrl.left()
                break
            case 'ArrowRight':
                lab.ioCtrl.right()
                break
            case 'End':
                lab.ioCtrl.end()
                break
            case 'Delete':
                lab.ioCtrl.del()
                break
            case 'PageUp':
                lab.ioCtrl.pageUp()
                break
            case 'PageDown':
                lab.ioCtrl.pageDown()
                break
        }
    }
}
