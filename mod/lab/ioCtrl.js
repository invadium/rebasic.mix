function init() {
    this.cur = 0
    this.buf = []
    this.history = []
    this.historyPos = 0
    this.editorPos = 0
    this.disabled = false
}

function enable() {
    this.disabled = false
}

function disable() {
    this.disabled = true
}

function sync(cmd) {
    cmd = cmd || ''
    // clean up current message
    this.buf.forEach(c => lab.textmode.backspace())
    this.buf = cmd.split('')
    lab.textmode.printout(cmd)
}

function inputKey(c) {
    if (this.disabled) return
    // escape non-ascii and control characters
    const code = c.charCodeAt(0)
    if (code < 32 || code > 126) return

    //if (c === "'") c = '"'
    //if (c === '&') return
    //if (c === '{') c = '['
    //if (c === '}') c = ']'
    
    if (this.cur === 0) {
        this.buf.push(c)
        const nextLine = lab.textmode.outc(c)
        if (nextLine) this.my --
    } else if (this.cur < 0) {
        const pos = this.buf.length - abs(this.cur)
        this.buf.splice(pos, 0, c)
        lab.textmode.insc(c)
    }
}

function backspace() {
    if (this.disabled) return
    if (this.buf.length > 0) {
        if (this.cur < 0) {
            const pos = this.buf.length - abs(this.cur)
            this.buf.splice(pos-1, 1)
            lab.textmode.backshift()
        } else {
            this.buf.splice(-1, 1)
            lab.textmode.backspace()
        }
    }
}

function saveHistory(cmd) {
    let last
    if (this.history.length > 0) {
        last = this.history[this.history.length - 1]
    }
    if (cmd && cmd !== last) {
        this.unexecuted = null
        this.history.push(cmd)
        this.historyPos = this.history.length
    }
}

function command(cmd) {
    lab.textmode.touch()
    this.saveHistory(cmd) // TODO we don't need that history in input mode?
    lab.vm.inputHandler(cmd)
}

function enter() {
    if (this.disabled) return
    lab.textmode.returnCursor()
    this.command(this.buf.join(''))
    this.cur = 0
    this.buf = []
}

function prev() {
    if (this.disabled) return
    lab.textmode.touch()
    if (this.historyPos > 0) {
        if (this.historyPos === this.history.length) {
            this.unexecuted = this.buf.join('')
        }
        this.historyPos --
        const cmd = this.history[this.historyPos]
        this.sync(cmd)
    }
}

function next() {
    if (this.disabled) return
    lab.textmode.touch()
    if (this.historyPos < this.history.length) {
        this.historyPos ++
        let cmd = this.history[this.historyPos]
        if (!cmd && this.unexecuted) {
            cmd = this.unexecuted
        }
        this.sync(cmd)
    }
}

function onNewLine(n) {
    this.editorPos = n
}

function firstLine() {
    if (this.disabled) return
    lab.textmode.touch()
    this.editorPos = 0
    let cmd = lab.vm.lines[this.editorPos]
    while(this.editorPos < lab.vm.lines.length && !cmd) {
        this.editorPos ++
        cmd = lab.vm.lines[this.editorPos]
    }
    if (!cmd && this.unexecuted) {
        cmd = this.unexecuted
    }
    this.sync(cmd)
}

function lastLine() {
    if (this.disabled) return
    lab.textmode.touch()
    this.editorPos = lab.vm.lines.length - 1
    if (this.editorPos === lab.vm.lines.length) {
        this.unexecuted = this.buf.join('')
    }

    let cmd = lab.vm.lines[this.editorPos]
    while (this.editorPos > 0 && !cmd) {
        this.editorPos --
        cmd = lab.vm.lines[this.editorPos]
    }
    this.sync(cmd)
}

function prevLine() {
    if (this.disabled) return
    lab.textmode.touch()

    let currentCmd = lab.vm.lines[this.editorPos]
    if (currentCmd && currentCmd !== this.buf.join('')) {
        this.sync(currentCmd)
        return
    }

    if (this.editorPos > 0) {
        if (this.editorPos === lab.vm.lines.length) {
            this.unexecuted = this.buf.join('')
        }

        let cmd
        while (this.editorPos > 0 && !cmd) {
            this.editorPos --
            cmd = lab.vm.lines[this.editorPos]
        }
        this.sync(cmd)
    }
}

function nextLine() {
    if (this.disabled) return
    lab.textmode.touch()

    let currentCmd = lab.vm.lines[this.editorPos]
    if (currentCmd && currentCmd !== this.buf.join('')) {
        this.sync(currentCmd)
        return
    }

    if (this.editorPos < lab.vm.lines.length) {
        let cmd
        while(this.editorPos < lab.vm.lines.length && !cmd) {
            this.editorPos ++
            cmd = lab.vm.lines[this.editorPos]
        }
        if (!cmd && this.unexecuted) {
            cmd = this.unexecuted
        }
        this.sync(cmd)
    }
}

function home() {
    if (this.disabled) return
    lab.textmode.touch()
    const shift = this.buf.length - abs(this.cur)
    for (let i = 0; i < shift; i++) this.left()
}

function right() {
    if (this.disabled) return
    lab.textmode.touch()
    if (this.cur < 0) {
        this.cur ++
        lab.textmode.right()
    }
}

function left() {
    if (this.disabled) return
    lab.textmode.touch()
    const pos = abs(this.cur)
    if (pos < this.buf.length) {
        this.cur --
        lab.textmode.left()
    }
}

function end() {
    if (this.disabled) return
    lab.textmode.touch()
    while(this.cur < 0) this.right()
}

function del() {
    if (this.disabled) return
    lab.textmode.touch()
    if (this.buf.length > 0 && this.cur < 0) {
        const pos = this.buf.length - abs(this.cur)
        this.buf.splice(pos, 1)
        this.cur ++
        lab.textmode.del()
    }
}

function pageUp(n) {
    if (this.disabled) return
    lab.textmode.pageUp(n)
}

function pageDown(n) {
    if (this.disabled) return
    lab.textmode.pageDown(n)
}

function firstPage() {
    if (this.disabled) return
    lab.textmode.firstPage()
}

function lastPage() {
    if (this.disabled) return
    lab.textmode.lastPage()
}

function stop() {
    lab.vm.stop()
    this.enable()
}
