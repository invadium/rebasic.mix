const Z = 2
const SPACE = ' '

// possible cursors - use rectangle for now
//const CUR = '*'
//const CUR = '_'
//const CUR = '█'

function init() {
    this.timer = 0
    this.cx = 0
    this.cy = 0
    this.cmode = 1
    this.bottomLine = 0
    this.cell = []
    this.cellFace = []
    this.cellBack = []
    this.cellFX   = []
    this.adjust()
    this.clear()
}

function adjust() {
    const W = env.context.width
    const H = env.context.height

    /*
    // cool
    this.font = 'px coolville'
    this.fontSize = 10
    this.curSize = 8
    this.curShift = 0
    this.fw = 5
    this.fh = 10


    // basis33
    this.font = 'px basis33'
    this.fontSize = 8
    this.curSize = 6
    this.curShift = 1
    this.fw = 4
    this.fh = 8

    // operator
    this.font = 'px pixel-operator-mono8'
    this.fontSize = 6
    this.curSize = 8
    this.curShift = -1
    this.fw = 6
    this.fh = 10

    // typewriter
    this.font = 'px typewriter'
    this.fontSize = 6
    this.curSize = 8
    this.curShift = 0
    this.fw = 5
    this.fh = 10
    */

    // TODO move out from adjust? Only dx/dy are variables here

    // monogram
    this.font = 'px monogram'
    this.fontSize = 12
    this.curSize = 8
    this.curShift = 2
    this.fw = 5
    this.fh = 10
    this.fdx = -.5
    this.fdy = 1
    this.fsx = .5
    this.fsy = .5

    this.tw = floor(W / this.fw) - 1
    this.th = floor(H / this.fh)
    this.dx = floor(W - this.tw*this.fw)/2
    this.dy = floor(H - this.th*this.fh)/2

    env.context.columns = this.tw
    env.context.rows    = this.th
}

function clear() {
    const tw = this.tw,
          th = this.th

    this.cell = []
    this.cellFace = []
    this.cellBack = []
    this.cellFX   = []
    for (let i = 0; i < th * tw; i++) {
        this.cell.push(SPACE)
    }
    this.lastPage()
    this.cx = 0
    this.cy = th - 1
    this.lastFX = 0
}

function touch() {
    this.bottomLine = this.cell.length / this.tw - 1
}

function saveState() {
    this.lastFX = env.context.fx
}

function restoreState() {
    this.cmode = 1
    env.context.fx = this.lastFX
}

function shiftScreen() {
    const w = this.tw
    const h = this.th
    const cell = this.cell
    /*
    for (let y = 1; y < h; y++) {
        for (let x = 0; x < w; x++) {
            cell[(y-1)*w + x] = cell[y*w + x]
        }
    }
    const y = h - 1
    */
    for (let x = 0; x < w; x++) {
        cell.push(SPACE)
    }
    this.bottomLine = floor(cell.length / w) - 1
}

function returnCursor() {
    this.cx = 0
    this.cy ++
    if (this.cy >= this.th) {
        this.shiftScreen()
        this.cy = this.th - 1
    }
}

function shiftCursor() {
    this.cx ++
    if (this.cx >= this.tw) {
        this.returnCursor()
        return true
    }
}

// how many character positions are still available on this line
function shiftsRemaining() {
    return this.tw - this.cx
}

function setCursor(x, y) {
    this.touch()
    this.cx = x
    this.cy = y
}

function getc(x, y) {
    if (x < 0 || x >= this.tw || y < 0 && y >= this.th) return SPACE // out of the screen area
    const tw = this.tw,
          th = this.th,
          fy = this.bottomLine - (th - 1 - y)
    return this.cell[fy * tw + x] || SPACE
}

// get the next char from the position
function getnc(x, y) {
    const tw = this.tw,
          th = this.th
    x++
    if (x >= tw) {
        x = 0
        y++
    }
    if (x < 0 || x >= tw || y < 0 || y >= th) return SPACE
    const fy = this.bottomLine - (th - 1 - y)
    return this.cell[fy * tw + x]
}

function putc(x, y, c) {
    if (!c || c.length !== 1) return // not a symbol
    const tw = this.tw, th = this.th
    if (x < 0 || x >= tw || y < 0 || y >= th) return // out of screen
    //this.cell[y * this.tw + x] = c
    this.touch()
    const at = (this.bottomLine - (th - 1 - y)) * tw + x
    this.cell[at] = c.toUpperCase()
    this.cellFace[at] = env.context.ink
    this.cellBack[at] = env.context.back
    this.cellFX[at]   = env.context.fx
}

function swap(x, y, c) {
    if (!c || c.length !== 1) return // not a symbol
    const tw = this.tw, th = this.th
    if (x < 0 || x >= tw || y < 0 || y >= th) return // out of screen

    this.touch()
    const fy = this.bottomLine - (th - 1 - y),
          s = this.cell[fy * this.tw + x]
    this.cell[fy * this.tw + x] = c.toUpperCase()
    return s
}

function outc(c) {
    this.touch()
    this.timer = 0
    if (c === '\n') {
        this.returnCursor()
    } else {
        this.putc(this.cx, this.cy, c)
        return this.shiftCursor()
    }
}

function insc(c) {
    this.touch()
    // shift the first line
    let tx = this.cx
    let ty = this.cy
    let s = this.getc(tx++, ty)
    while (tx < this.tw) {
        s = this.swap(tx, ty, s)
        tx ++
    }
    while (ty < this.th) {
        tx = 0
        while(tx < this.w) {
            s = this.swap(tx, ty, s)
            tx ++
        }
        ty ++
    }
    this.outc(c)
}

function del() {
    this.touch()
    this.right()
    this.backshift()
}

function printout(line) {
    this.touch()
    line = line || ''
    line = '' + line
    for (let i = 0, ln = line.length; i < ln; i++) {
        this.outc(line.charAt(i))
    }
}

function println(line) {
    this.touch()
    this.printout(line)
    this.returnCursor()
}

function left() {
    this.touch()
    this.timer = 0
    if (this.cx === 0) {
        if (this.cy > 0) {
            this.cy --
            this.cx = this.tw - 1
        } else {
            return false // unable to move left
        }
    } else {
        this.cx --
    }
    return true
}

function right() {
    this.touch()
    this.timer = 0
    if (this.cx >= this.tw - 1) {
        if (this.cy < this.th - 1)  {
            this.cy ++
            this.cx = 0
        } else {
            return false // unable to move right
        }
    } else {
        this.cx ++
    }
    return true
}

function pageUp() {
    if (this.bottomLine > this.th * 2 - 2) this.bottomLine --
}

function pageDown() {
    const maxLine = (this.cell.length / this.tw) - 1
    if (this.bottomLine < maxLine) this.bottomLine ++
}

function lastPage() {
    this.touch()
}

function isLastPage() {
    return (this.bottomLine >= (this.cell.length / this.tw) - 1)
}

function firstPage() {
    this.bottomLine = this.th * 2 - 2
}

function backspace() {
    this.touch()
    this.left()
    this.putc(this.cx, this.cy, SPACE)
}

function backshift() {
    this.touch()
    this.backspace()

    let tx = this.cx
    let ty = this.cy
    // shift the first line
    while (tx < this.tw) {
        const nextc = this.getnc(tx, ty)
        this.putc(tx, ty, nextc)
        tx ++
    }
    while (ty < this.th) {
        tx = 0
        while(tx < this.w) {
            s = this.swap(tx, ty, s)
            tx ++
        }
        ty ++
    }
}

function htab(x) {
    if (!x) return
    this.touch()
    this.cx = limit(x - 1, 0, this.tw - 1)
}

function vtab(y) {
    if (!y) return
    this.touch()
    this.cy = limit(y - 1, 0, this.th - 1)
}

function locate(x, y, c) {
    if (!x || !y) return
    this.touch()
    this.cx = limit(x - 1, 0, this.tw - 1)
    this.cy = limit(y - 1, 0, this.th - 1)
    if (c !== undefined) {
        this.cmode = c? 1 : 0
    }
}

function evo(dt) {
    this.timer += dt
}

function draw() {
    save()
    baseTop()
    alignLeft()

    const cell = this.cell
    const { x, y, scale } = lab.render
    translate(x + this.dx*scale, y + this.dy*scale)
    font(this.fontSize * scale + this.font)

    const tw = this.tw,
          th = this.th,
          fw = this.fw,
          fh = this.fh,
          fdx = this.fdx,
          fdy = this.fdy,
          fsx = this.fsx,
          fsy = this.fsy

    for (let y = 0, l1 = th; y < l1; y++) {
        for (let x = 0, l2 = tw; x < l2; x++) {
            const at = (this.bottomLine - (th - 1 - y)) * tw + x,
                  ch = cell[at] || '?',
                  fx   = this.cellFX[at]
            let face = this.cellFace[at] || env.context.ink,
                back = this.cellBack[at] || null

            switch(fx) {
                case 1:
                    if (this.timer % 1 < .5) {
                        back = back || env.context.paper
                        const nback = face
                        face = back
                        back = nback
                    }
                    break
                case 2:
                    if (this.timer % 1 > .5) {
                        continue 
                    }
                    break
            }

            if (back) {
                fill(back)
                rect((x*fw + fdx) * scale, (y*fh + fdy) * scale,
                       (fw + fsx) * scale,   (fh + fsy) * scale)
            }
            fill(face)
            text(ch, x*fw*scale, y*fh*scale)
        }
    }

    // show cursor if needed
    if (this.cmode === 1
            && !lab.ioCtrl.disabled
            && this.timer % 1 < .5
            && this.isLastPage()) {
        fill(env.context.ink)
        rect(this.cx*fw*scale,
                (this.cy*fh + this.curShift)*scale,
                fw*scale, this.curSize*scale)
        //text(CUR, this.cx*fw*scale, this.cy*fh*scale)
    }

    restore()
}
