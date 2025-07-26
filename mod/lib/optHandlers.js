const optHandlers = {

    mouse: function(val) {
        if (val === "show") {
            lib.ui.showCursor()
        } else if (val === "hide") {
            lib.ui.hideCursor()
        } else {
            throw new Error('must be either "show" or "hide"')
        }
    }

}
