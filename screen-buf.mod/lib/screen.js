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
    
    screen: function(n, action) {
        if (action) {
            if (action === 'enable') lib.gx.enableScreen(n)
            else if (action === 'disable') lib.gx.disableScreen(n)
        } else {
            lib.gx.activateScreen(n)
        }
    },

    mode: function(mode) {
        lib.gx.setMode(mode)
    },

    xstore: function() {
        const c = env.context

        // extract the state from the drawing context
        const st = {
            screen:      c.screen,
            screenOpt:   [],
            screenMask:  c.mask,
            border:      c.border,
            paper:       c.paper,
            ink:         c.ink,
            back:        c.back,
            fx:          c.fx,
            x:           c.x,
            y:           c.y,
            leftMargin:  c.leftMargin,
            rightMargin: c.rightMargin,
        }

        c.screenOpt.forEach(opt => {
            st.screenOpt.push({
                paper: opt.paper,
            })
        })

        // preserve current state in the buffer
        c.buffer.push(st)
    },

    xrestore: function() {
        const c = env.context
        if (c.buffer.length === 0) throw new Error(`empty buffer - can't restore drawing context`)

        const st = c.buffer.pop()

        // restore drawing context
        c.screen      = st.screen
        c.screenOpt   = []
        c.screenMask  = st.mask
        c.border      = st.border
        c.paper       = st.paper
        c.ink         = st.ink
        c.back        = st.back
        c.fx          = st.fx
        c.x           = st.x
        c.y           = st.y
        c.leftMargin  = st.leftMargin
        c.rightMargin = st.rightMargin

        st.screenOpt.forEach(opt => {
            c.screenOpt.push({
                paper: opt.paper,
            })
        })
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
        if (ci === undefined) {
            lib.gx.clear(env.context.paper)
        } else {
            env.context.paper = lib.gx.mapColor(ci)
            lib.gx.flood( env.context.paper )
        }
    },

    border: function(ci) {
        const c = lib.gx.mapColor(ci)
        if (!c) return
        env.context.border = c
    },

    plot: function(x, y, ci) {
        x = Math.round(x)
        y = Math.round(y)
        if (x < 0 || x >= env.context.width || y < 0 || y >= env.context.height) return
        let c = env.context.ink
        if (ci !== undefined) {
            c = lib.gx.mapColor(ci) || '#00000000'
        }
        const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

        let i = (y * env.context.width + x) * 4
        lab.pdata[i++] = RGBA[0]
        lab.pdata[i++] = RGBA[1]
        lab.pdata[i++] = RGBA[2]
        lab.pdata[i  ] = RGBA[3]

        // cache coordinates in the graphical context
        env.context.x = x
        env.context.y = y
    },

    pset: function(x, y, ci) {
        let c = env.context.ink
        if (ci !== undefined) c = lib.gx.mapColor(ci)
        if (!c) return
        const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

        let i = (y * env.context.width + x) * 4
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
        drawLine(env.context.x, env.context.y, x, y)
        env.context.x = x
        env.context.y = y
    },

    circle: function(x, y, r, ci) {
        let c = env.context.ink
        if (ci !== undefined) c = lib.gx.mapColor(ci)
        if (!c) return
        const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

        lib.gx.drawCircle(x, y, r, RGBA)

        env.context.x = x
        env.context.y = y
    },

    box: function(x, y, w, h, ci) {
        let c = env.context.ink
        if (ci !== undefined) c = lib.gx.mapColor(ci)
        if (!c) return
        const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

        lib.gx.drawBox(x, y, w, h, RGBA)

        env.context.x = x
        env.context.y = y
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
        if (x >= W || y >= H) return

        const d = dim.data
        const w = d[0]
        const h = d[1]

        let sx1 = 0, tx1 = x,
            sx2 = w, tx2 = x + w
        if (tx2 < 0) return
        if (tx1 < 0) {
            sx1 = abs(tx1)
            tx1 = 0
        }
        if (tx2 >= W) {
            sx2 -= (tx2 - W)
            tx2 = W - 1
        }

        let sy1 = 0, ty1 = y,
            sy2 = h, ty2 = y + h
        if (ty2 < 0) return
        if (ty1 < 0) {
            sy1 = abs(ty1)
            ty1 = 0
        }
        if (ty2 >= H) {
            sy2 -= (ty2 - H)
            ty2 = H - 1
        }


        const pdata = lab.pdata

        let sy = sy1
        for (let ty = ty1; ty < ty2; ty++) {
            const tbase = (ty * W * 4)
            const sbase = (sy * w * 4)
            
            let sx = sx1
            for (let tx = tx1; tx < tx2; tx++) {
                const tsh = tbase + tx * 4
                const ssh = 2 + sbase + sx * 4

                const a = d[ssh + 3]
                if (a === 255) {
                    // replace
                    pdata[tsh  ] = d[ssh  ]
                    pdata[tsh+1] = d[ssh+1]
                    pdata[tsh+2] = d[ssh+2]
                    pdata[tsh+3] = d[ssh+3]
                } else if (a > 0) {
                    // blend
                    const fa = a/255
                    pdata[tsh  ] = (1-fa) * pdata[tsh  ] + d[ssh  ] * fa
                    pdata[tsh+1] = (1-fa) * pdata[tsh+1] + d[ssh+1] * fa
                    pdata[tsh+2] = (1-fa) * pdata[tsh+2] + d[ssh+2] * fa
                    pdata[tsh+3] = (1-fa) * pdata[tsh+3] + d[ssh+3] * fa
                } // ignore with a === 0
                sx++
            }
            sy++
        }
    },
}

// aliases
screen.background = screen.paper
screen.face = screen.ink

//
// === help ===
//
screen.screen.usage = '[number], (state)'
screen.screen.man = 'activate the screen #\n'
                + '    (state) - can be "enable" or "disable"\n'
                + '    provide to enable/disable a screen\n'
                + '    without activating it'

screen.mode.usage = '[number]'
screen.mode.man = 'change the screen mode\n'
        + '    to one of available graphics modes [1..6]'

screen.xstore.usage = ''
screen.xstore.man = 'store drawing context'

screen.xrestore.usage = ''
screen.xrestore.man = 'restore drawing context'

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

