const palette = [
    //'#000000', // black
    //'#dc322f', // red
]

const colors = {
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

const screen = {

    ink: function(ci) {
        const c = mapColor(ci)
        if (!c) return
        env.tune.ink = c
    },

    paper: function(ci) {
        const c = mapColor(ci)
        if (!c) return
        ctx.fillStyle = c
        ctx.fillRect(0, 0, rx(1), ry(1))
        env.tune.paper = c
    },

    border: function(ci) {
        const c = mapColor(ci)
        if (!c) return
        env.tune.border = c
    },

    plot: function(x, y, ci) {
        const c = mapColor(ci) || env.tune.ink
        if (!c) return
        ctx.fillStyle = c
        ctx.fillRect(x, y, 1, 1)
    },

    box: function(x, y, w, h, ci) {
        let c = mapColor(ci)
        if (!c) return
        ctx.fillStyle = c
        ctx.fillRect(x, y, w, h)
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

screen.background.usage = '[color]'
screen.background.man = 'set background(paper) color'

screen.paper.usage = '[color]'
screen.paper.man = 'set background(paper) color'

screen.border.usage = '[color]'
screen.border.man = 'set border color'

screen.ink.usage = '[color]'
screen.ink.man = 'set ink color'

screen.face.usage = '[color]'
screen.face.man = 'set ink color'

screen.color.usage = "<face>, <background>, <border>"
screen.color.man =   "set colors"

