const palette = [

    // === block 0 === 
    null,       // 00 -transparent
    // solarized
    '#e9362b', // red
    '#cb4b16', // orange
    '#b58900', // yellow
    '#859900', // green
    '#2aa198', // cyan
    '#268bd2', // blue
    '#6c71c4', // violet
    '#d33682', // magenta
    '#444444',

    // =====================
    '#808080',
    // solarized base
    '#002b36',    // base 03
    '#073642',    // base 02
    '#586e75',    // base 01
    '#657b83',    // base 00
    '#839496',    // base 0
    '#93a1a1',    // base 1
    '#eee8d5',    // base 2 - pale mocca
    '#fdf6e3',    // base 3
    '#666666',

    // === block ===
    '#000000',
    // selenized light background
    '#cc1729', // red
    '#bc5819', // orange
    '#a78300', // yellow
    '#428b00', // green
    '#00978a', // cyan
    '#006dce', // blue
    '#825dc0', // violet
    '#c44392', // magenta

    '#444444',

    // === block ===
    '#202020',
    // selenized light
    '#d2212d', // red
    '#c25d1e', // orange
    '#ad8900', // yellow
    '#489100', // green
    '#009c8f', // cyan
    '#0072d4', // blue
    '#8762c6', // violet
    '#ca4898', // magenta
    '#666666',

    // === block ===
    '#707070',
    // selenized light base
    '#fbf3db', // bg-0
    '#ece3cc', // bg-1
    '#d5cdb6', // bg-2
    '#909995', // dim-0
    '#53676d', // fg-0
    '#3a4d53', // fg-1
    '#444444', //
    '#666666', //
    '#444444', //

    // =====================
    '#606060',
    // selenized dark
    '#ed4a46', // red
    '#e67f43', // orange
    '#dbb32d', // yellow
    '#70b433', // green
    '#3fc5b7', // cyan
    '#368aeb', // blue
    '#a580e2', // violet
    '#eb6eb7', // magenta
    '#666666', //

    // === block ===
    '#303030',
    // selenized dark background
    '#ff5e56', // red
    '#fa9153', // orange
    '#efc541', // yellow
    '#83c746', // green
    '#56d8c9', // cyan
    '#4f9cfe', // blue
    '#b891f5', // violet
    '#ff81ca', // magenta
    '#444444', //

    // === block ===
    // selenized black base
    '#666666', // gray

    '#181818', // bg-0
    '#252525', // bg-1
    '#3b3b3b', // bg-2
    '#777777', // dim-0
    '#b9b9b9', // fg-0
    '#dedede', // fg-1

    '#666666', //
    '#444444', //
    '#666666', //

    // selenized dark base
    '#777777',
    '#103c48', // bg-0
    '#184956', // bg-1
    '#2d5b69', // bg-2
    '#72898f', // dim-0
    '#adbcbc', // fg-0
    '#cad8d9', // fg-1
    '#444444', //
    '#666666', //
    '#444444', //


    // nord - frost and aurora
    '#2e3440', // deep night
    '#bf616a', // red
    '#d08770', // orange
    '#ebcb8b', // yellow
    '#a3be8c', // green
    '#88c0d0', // cyan
    '#81a1c1', // blue
    '#5e81ac', // almost violet
    '#b48ead', // magenta
    '#eceff4', // light snow

    // nord - polar night
    '#3b4252', // night
    '#434c5e', // light night
    '#4c566a', // dusk
    // nord - snow storm
    '#d8dee9', // heavy snow
    '#e5e9f0', // snow
    '#8fbcbb', // teal

    '#222222',
    '#444444',
    '#222222',
    '#444444',

    // =========================
    // sweetie 16
    '#1a1c2c', // black
    '#b13e53', // red
    '#ef7d57', // orange
    '#ffcd75', // yellow
    '#38b764', // green
    '#257179', // teal
    '#41a6f6', // sky blue
    '#3b5dc9', // sea blue
    '#29366f', // dark blue
    '#666666',

    // =========================
    // sweetie 16
    '#000000',
    '#5d275d', // dark red
    '#a7f070', // salad green
    '#73eff7', // cyan
    '#f4f4f4', // whitish
    '#94b0c2', // light gray
    '#566c86', // metal gray
    '#333c57', // dark gray 
    '#000000',
    '#000000',

    // =========================
    // bubblegum
    '#16171a', // black
    '#7f0622', // dark red
    '#ffd100', // yellow
    '#bfff3c', // light green
    '#10d275', // green
    '#007899', // teal
    '#68aed4', // cyan
    '#430067', // purple
    '#ff2674', // pink
    '#ff80a4', // light pink
]

const colors = {
    'clear':    null,           // 00 - transparent

    // solar
    'yellow':   '#b58900',      // solar - yellow
    'orange':   '#cb4b16',      // solar - orange
    'red':      '#e9362b',      // solar - red
    'magenta':  '#d33682',      // solar - magenta
    'violet':    '#6c71c4',     // solar - violet
    'blue':      '#268bd2',     // solar - blue
    'teal':      '#2aa198',     // solar - cyan
    'green':    '#859900',      // solar - green

    'base03':     '#002b36',    // solar - base 03
    'base02':     '#073642',    // solar - base 02
    'base01':     '#586e75',    // solar - base 01
    'base00':     '#657b83',    // solar - base 00
    'base0':      '#839496',    // solar - base 0
    'base1':      '#93a1a1',    // solar - base 1
    'base2':      '#eee8d5',    // base 2 - pale mocca
    'base3':      '#fdf6e3',    // base 3

    'ocean':     '#257179',     // darker teal
    'grass':    '#38b764',      // green
    'salad':    '#a7f070',      // salad
    'purple':   '#5d275d',
    'dark blue': '#29366f',     // dark blue
    'some blue': '#3b5dc9',     // blue
    'sky':       '#41a6f6',     // sky
    'not-cyan':  '#73eff7',     // cyan

    'metal':         '#94b0c2', // metal
    'dark-metal':    '#566c86', // dark metal
    'gray-blue':     '#333c57', // grayish blue
    'bluisn-black':  '#1a1c2c', // bluish black
    'black':         '#252527',
    'pale-yellow':   '#d1cf94', // pale yellow paper
    'brown':         '#d98148',
    'dark-orange':   '#ef7d57', // orange
    'dark-red':      '#b13e53', // red
    'bright-yellow': '#ffcd75', // yellow

    'gray':          '#808080',

    // nostalgOS retro palette
    'nos-red':      '#dc6250',
    'nos-pink':     '#deada5',
    'nos-mocha':    '#dad4c9',
    'nos-sun':      '#ffd183',
    'nos-yellow':   '#eeb24a',
    'nos-green':    '#55927f',
    'nos-teal':     '#21525a',
    'nos-gray':     '#272a32',
    'nos-blue':     '#2152a5',
    'nos-sky':      '#5a8bde',
    'nos-purple':   '#b89ce9',
    'nos-grape':    '#844790',
}

const context = {
    x: 0,
    y: 0,
}

//Object.values(colors).forEach(c => palette.push(c))

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
    
    screen: function(n) {
        lib.gx.enableScreen(n)
    },

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
        lib.gx.syncOut(env.context.screen)
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
        let c = env.context.ink
        if (ci !== undefined) {
            c = mapColor(ci) || '#00000000'
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
        if (ci !== undefined) c = mapColor(ci)
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
        if (ci !== undefined) c = mapColor(ci)
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
        if (ci !== undefined) c = mapColor(ci)
        if (!c) return
        const RGBA = color.color2RGBA(c) // TODO optimize to have in the color table

        lib.gx.drawCircle(x, y, r, RGBA)
    },

    box: function(x, y, w, h, ci) {
        let c = env.context.ink
        if (ci !== undefined) c = mapColor(ci)
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
                pdata[sh]   = d[i++]
                pdata[sh+1] = d[i++]
                pdata[sh+2] = d[i++]
                pdata[sh+3] = d[i++]
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

