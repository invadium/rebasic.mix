const context = {
    x: 0,
    y: 0,
}

function drawLine(x1, y1, x2, y2, ci) {
    const c = lib.gx.mapColor(ci) || env.context.ink
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
    
    screen: function(n) {
        lib.gx.enableScreen(n)
    },

    ink: function(ci) {
        const c = lib.gx.mapColor(ci)
        if (!c) return
        env.context.ink = c
    },

    backdrop: function(ci) {
        const c = lib.gx.mapColor(ci)
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
            const c = lib.gx.mapColor(ci)
            if (!c) return
            ctx.fillStyle = c
            ctx.fillRect(0, 0, rx(1), ry(1))
            env.context.paper = c
        }
        lib.gx.syncOut(env.context.screen)
    },

    border: function(ci) {
        const c = lib.gx.mapColor(ci)
        if (!c) return
        env.context.border = c
    },

    plot: function(x, y, ci) {
        x = Math.round(x)
        y = Math.round(y)
        if (x < 0 || x >= env.width || y < 0 || y >= env.height) return
        let c = env.context.ink
        if (ci !== undefined) {
            c = lib.gx.mapColor(ci) || '#00000000'
        }
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
        let c = env.context.ink
        if (ci !== undefined) c = lib.gx.mapColor(ci)
        if (!c) return
        const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

        let i = (y * env.width + x) * 4
        lab.pdata[i++] = RGBA[0]
        lab.pdata[i++] = RGBA[1]
        lab.pdata[i++] = RGBA[2]
        lab.pdata[i  ] = RGBA[3]
    },

    line: function(x1, y1, x2, y2, ci) {
        let c = env.context.ink
        if (ci !== undefined) c = lib.gx.mapColor(ci)
        if (!c) return
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
        let c = env.context.ink
        if (ci !== undefined) c = lib.gx.mapColor(ci)
        if (!c) return
        const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

        lib.gx.drawCircle(x, y, r, RGBA)
    },

    box: function(x, y, w, h, ci) {
        let c = env.context.ink
        if (ci !== undefined) c = lib.gx.mapColor(ci)
        if (!c) return
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

    iput: function(dim, x, y) {
        const W = env.context.width
        const H = env.context.height
        x = x | 0
        y = y | 0

        const d = dim.data
        const w = d[0]
        const h = d[1]
        const x2 = clamp(x + w, x, W)
        const y2 = clamp(y + h, y, H)
        const x1 = clamp(x, 0, W)
        const y1 = clamp(y, 0, H)

        const pdata = lab.pdata

        let i = 2
        for (let cy = y1; cy < y2; cy++) {
            const base = (cy * W * 4)
            for (let cx = x1; cx < x2; cx++) {
                let sh = base + cx * 4
                const a = d[i + 3]
                if (a === 255) {
                    // replace
                    pdata[sh  ] = d[i  ]
                    pdata[sh+1] = d[i+1]
                    pdata[sh+2] = d[i+2]
                    pdata[sh+3] = d[i+3]
                } else if (a > 0) {
                    // blend
                    const fa = a/255
                    pdata[sh  ] = (1-fa) * pdata[sh  ] + d[i  ] * fa
                    pdata[sh+1] = (1-fa) * pdata[sh+1] + d[i+1] * fa
                    pdata[sh+2] = (1-fa) * pdata[sh+2] + d[i+2] * fa
                    pdata[sh+3] = (1-fa) * pdata[sh+3] + d[i+3] * fa
                } // ignore with a === 0
                i += 4
            }
        }
    },
}

// aliases
screen.background = screen.paper
screen.face = screen.ink

//
// === help ===
//
screen.screen.usage = '[number]'
screen.screen.man = 'enable the screen #'

screen.paper.usage = '[color]'
screen.paper.tags = 'classic, draw'
screen.paper.man = 'set background(paper) color'

// TODO how to split help for similar functions? Can we close a function?
screen.background.usage = '[color]'
screen.background.tags = 'classic, draw'
screen.background.man = 'set background(paper) color'

screen.border.usage = '[color]'
screen.border.tags = 'classic, draw'
screen.border.man = 'set border color'

screen.ink.usage = '[color]'
screen.ink.tags = 'classic, draw'
screen.ink.man = 'set ink color'

screen.backdrop.usage = '[color]'
screen.backdrop.tags = "text"
screen.backdrop.man = 'set character backdrop color, 0 if transparent'

screen.fx.usage = '[type]'
screen.fx.tags = "text"
screen.fx.man = 'set character effect\n    available types:'
                + '\n    0: none'
                + '\n    1: inverse blink'
                + '\n    2: blink'
                + '\n    3: underscore with the face color'
                + '\n    4: underscore with the backdrop color'
                + '\n    5: strikethrough with the face color'
                + '\n    6: strikethrough with the backdrop color'

screen.face.usage = '[color]'
screen.face.tags = "classic, text"
screen.face.man = 'set ink color'

screen.color.usage = "<face>, <background>, <border>"
screen.color.tags = "classic, draw"
screen.color.man =   "set colors"

screen.plot.usage = "[x], [y], <color>"
screen.plot.tags = "core, classic, draw"
screen.plot.man = "draw a pixel"

screen.pset.usage = "[x], [y], <color>"
screen.pset.tags = "core, classic, draw"
screen.pset.man = "low-level set of a pixel value"

screen.line.usage = "[x1], [y1], [x2], [y2], <color>"
screen.line.tags = "draw"
screen.line.man = "draw a line"

screen.drawto.usage = "[x], [y]"
screen.drawto.tags = "draw"
screen.drawto.man = "draw a line to coordinates"

screen.circle.usage = "[x], [y], [r], <color>"
screen.circle.tags = "draw"
screen.circle.man = "draw a circle"

screen.iput.usage = '[array], [x], [y]'
screen.iput.man = 'draw image data'

