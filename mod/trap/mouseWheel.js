function mouseWheel(e) {
    if (e.deltaY < 0) {
        lab.ioCtrl.pageUp(1)
    } else {
        lab.ioCtrl.pageDown(1)
    }
}
