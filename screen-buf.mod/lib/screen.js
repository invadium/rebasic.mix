const palette = [
    //'#000000', // black
    //'#dc322f', // red
]

const colors = {
    'clear':    null,           // transparent
    'yellow':   '#b58900',      // solar - yellow
    'orange':   '#cb4b16',      // solar - orange
    'purple':   '#5d275d',
    'red':      '#e9362b',      // solar - red
    'magenta':  '#d33682',      // solar - magenta

    'dark blue': '#29366f',     // dark blue
    'violet':    '#6c71c4',      // solar - violet
    'some blue': '#3b5dc9',     // blue
    'blue':      '#268bd2',      // solar - blue
    'sky':       '#41a6f6',      // sky
    'not-cyan':  '#73eff7',      // cyan

    'deep-teal': '#002b36',     // solar - base 03
    'base-teal': '#073642',     // solar - base 02
    'ocean':     '#257179',     // darker teal
    'teal':      '#2aa198',     // solar - cyan

    'green':    '#859900',      // solar - green
    'grass':    '#38b764',      // green
    'salad':    '#a7f070',      // salad

    'base01':        '#586e75', // solar - base 01
    'base00':        '#657b83', // solar - base 00
    'base0':         '#839496', // solar - base 0
    'base1':         '#93a1a1', // solar - base 1
    'metal':         '#94b0c2', // metal
    'dark-metal':    '#566c86', // dark metal
    'gray-blue':     '#333c57', // grayish blue
    'bluisn-black':  '#1a1c2c', // bluish black
    'black':         '#252527',
    'white':         '#fdf6e3', // base 3
    'pale-mocca':    '#eee8d5', // base 2 - pale mocca
    'pale-yellow':   '#d1cf94', // pale yellow paper
    'brown':         '#d98148',
    'dark-orange':   '#ef7d57', // orange
    'dark-red':      '#b13e53', // red
    'bright-yellow': '#ffcd75', // yellow

    'gray':          '#808080',
}

const context = {
    x: 0,
    y: 0,
}

Object.values(colors).forEach(c => palette.push(c))

function mapColor(ci) {
    let c
    if (isNumber(ci)) {
        c = palette[ci | 0]
    } else if (isString(ci)) {
        if (ci.startsWith('#')) {
            c = ci
        } else {
            const cn = colors[ci.toLowerCase()]
            if (cn) c = ci
        }
    }
    return c
}

function drawLine(x1, y1, x2, y2, ci) {
    const c = mapColor(ci) || env.context.ink
    const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

    const dx = abs(x2 - x1),
          dy = abs(y2 - y1),
          sx = x2 >= x1? 1 : -1,
          sy = y2 >= y1? 1 : -1

    if (dy <= dx) {
        let d = (dy << 1) - dx
        let d1 = dy << 1
        let d2 = (dy - dx) << 1
        lib.gx.put(x1, y1, RGBA)

        for (let x = x1 + sx, y = y1, i = 1; i <= dx; i++, x += sx) {
            if (d > 0) {
                d += d2
                y += sy
            } else {
                d += d1
            }
            lib.gx.put(x, y, RGBA)
        }
    } else {
        let d = (dx << 1) - dy
        let d1 = dx << 1
        let d2 = (dx - dy) << 1
        lib.gx.put(x1, y1, RGBA)
        for (let x = x1, y = y1 + sy, i = 1; i <= dy; i++, y += sy) {
            if (d > 0) {
                d += d2
                x += sx
            } else {
                d += d1
            }
            lib.gx.put(x, y, RGBA)
        }
    }
}

const screen = {

    //
    // === graphics commands ===
    //

    ink: function(ci) {
        const c = mapColor(ci)
        if (!c) return
        env.context.ink = c
    },

    backdrop: function(ci) {
        const c = mapColor(ci)
        if (!c) env.context.back = null
        env.context.back = c
    },

    fx: function(ifx) {
        env.context.fx = ifx
    },

    // clear the framebuffer and set the background(paper) color
    paper: function(ci) {
        if (!ci) {
            ctx.fillStyle = env.context.paper
            ctx.fillRect(0, 0, rx(1), ry(1))
        } else {
            const c = mapColor(ci)
            if (!c) return
            ctx.fillStyle = c
            ctx.fillRect(0, 0, rx(1), ry(1))
            env.context.paper = c
        }
        lab.framebuffer = ctx.getImageData(0, 0, ctx.width, ctx.height)
        lab.pdata = lab.framebuffer.data
    },

    border: function(ci) {
        const c = mapColor(ci)
        if (!c) return
        env.context.border = c
    },

    plot: function(x, y, ci) {
        x = Math.round(x)
        y = Math.round(y)
        if (x < 0 || x >= env.width || y < 0 || y >= env.height) return
        const c = mapColor(ci) || env.context.ink
        if (!c) return
        const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

        let i = (y * env.width + x) * 4
        lab.pdata[i++] = RGBA[0]
        lab.pdata[i++] = RGBA[1]
        lab.pdata[i++] = RGBA[2]
        lab.pdata[i  ] = RGBA[3]

        // cache coordinates in the graphical context
        context.x = x
        context.y = y
    },

    pset: function(x, y, ci) {
        const c = mapColor(ci) || env.context.ink
        if (!c) return
        const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

        let i = (y * env.width + x) * 4
        lab.pdata[i++] = RGBA[0]
        lab.pdata[i++] = RGBA[1]
        lab.pdata[i++] = RGBA[2]
        lab.pdata[i  ] = RGBA[3]
    },

    line: function(x1, y1, x2, y2, ci) {
        const c = mapColor(ci) || env.context.ink
        const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

        const dx = abs(x2 - x1),
              dy = abs(y2 - y1),
              sx = x2 >= x1? 1 : -1,
              sy = y2 >= y1? 1 : -1

        if (dy <= dx) {
            let d = (dy << 1) - dx
            let d1 = dy << 1
            let d2 = (dy - dx) << 1
            lib.gx.put(x1, y1, RGBA)

            for (let x = x1 + sx, y = y1, i = 1; i <= dx; i++, x += sx) {
                if (d > 0) {
                    d += d2
                    y += sy
                } else {
                    d += d1
                }
                lib.gx.put(x, y, RGBA)
            }
        } else {
            let d = (dx << 1) - dy
            let d1 = dx << 1
            let d2 = (dx - dy) << 1
            lib.gx.put(x1, y1, RGBA)
            for (let x = x1, y = y1 + sy, i = 1; i <= dy; i++, y += sy) {
                if (d > 0) {
                    d += d2
                    x += sx
                } else {
                    d += d1
                }
                lib.gx.put(x, y, RGBA)
            }
        }
    },

    line: drawLine,

    drawto: function(x, y) {
        drawLine(context.x, context.y, x, y)
        context.x = x
        context.y = y
    },

    circle: function(x, y, r, ci) {
        const c = mapColor(ci) || env.context.ink
        const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

        lib.gx.drawCircle(x, y, r, RGBA)
    },

    box: function(x, y, w, h, ci) {
        let c = mapColor(ci) || env.context.ink
        const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

        lib.gx.drawBox(x, y, w, h, RGBA)
    },

    color: function(faceColor, backgroundColor, borderColor) {
        if (faceColor && typeof faceColor !== 'object') {
            this.command.ink(faceColor)
        }
        if (backgroundColor && typeof backgroundColor !== 'object') {
            this.command.paper(backgroundColor)
        }
        if (borderColor && typeof borderColor !== 'object') {
            this.command.border(borderColor)
        }
    },
}

// aliases
screen.background = screen.paper
screen.face = screen.ink

//
// === help ===
//
screen.background.usage = '[color]'
screen.background.man = 'set background(paper) color'

screen.paper.usage = '[color]'
screen.paper.man = 'set background(paper) color'

screen.border.usage = '[color]'
screen.border.man = 'set border color'

screen.ink.usage = '[color]'
screen.ink.man = 'set ink color'

screen.backdrop.usage = '[color]'
screen.backdrop.man = 'set character backdrop color, 0 if transparent'

screen.fx.usage = '[type]'
screen.fx.man = 'set character effect\n    available types:'
                + '\n    0: none'
                + '\n    1: inverse blink'
                + '\n    2: blink'
                + '\n    3: underscore with the face color'
                + '\n    4: underscore with the backdrop color'
                + '\n    5: strikethrough with the face color'
                + '\n    6: strikethrough with the backdrop color'

screen.face.usage = '[color]'
screen.face.man = 'set ink color'

screen.color.usage = "<face>, <background>, <border>"
screen.color.man =   "set colors"

screen.plot.usage = "[x], [y], <color>"
screen.plot.man = "draw a pixel"

screen.pset.usage = "[x], [y], <color>"
screen.pset.man = "low-level set of a pixel value"

screen.line.usage = "[x1], [y1], [x2], [y2], <color>"
screen.line.man = "draw a line"

screen.drawto.usage = "[x], [y]"
screen.drawto.man = "draw a line to coordinates"

screen.circle.usage = "[x], [y], [r], <color>"
screen.circle.man = "draw a circle"

