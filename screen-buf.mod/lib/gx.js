const CLEAR_iRGBA = [0, 0, 0, 0]

const palette = require('/mod/screen-buf/lib/palette')
const colors = require('/mod/screen-buf/lib/colors')

//while(palette.length < 256) palette.push('#444444')
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

function sync() {
    //ctx.putImageData(lab.renderbuffers[env.context.screen], 0, 0)
    lab.rendercontext[env.context.screen].putImageData(lab.renderbuffers[env.context.screen], 0, 0)
}

function syncRenderbuffer(screen) {
    lab.rendercontext[screen].putImageData(lab.renderbuffers[screen], 0, 0)
}

// copy current framebuffer data to a renderbuffer
function syncOut(screen) {
    if (screen === undefined) screen = env.context.screen

    const context2D = lab.rendercontext[screen]
    lab.renderbuffers[screen] = context2D.getImageData(0, 0, context2D.width, context2D.height)
    if (env.context.screen === screen) {
        lab.pdata = lab.renderbuffers[screen].data
    }
}

function syncOutAll() {
    for (let screen = 0; screen < env.context.MAX_SCREEN; screen++) {
        lib.gx.syncOut(screen)
    }
}

function createRenderbuffers() {
    lab.renderbuffers = []
    syncOutAll()
}

function floodScreen(screen, sRGBA) {
    const iRGBA = sRGBA? color.color2RGBA(sRGBA) : CLEAR_iRGBA
    const pdata = lab.renderbuffers[screen].data
    const dataLength = pdata.length
    let i = 0
    while(i < dataLength) {
        pdata[i++] = iRGBA[0]
        pdata[i++] = iRGBA[1]
        pdata[i++] = iRGBA[2]
        pdata[i++] = iRGBA[3]
    }
}

function clearScreen(screen, ci) {
    const sRGBA = lib.gx.mapColor(ci)
    if (sRGBA) {
        floodScreen(screen, sRGBA)
    } else {
        floodScreen(screen)
    }
}

function clearAll(ci) {
    for (let screen = 0; screen < env.context.MAX_SCREEN; screen++) {
        clearScreen(screen, ci)
    }
}

function activateScreen(screen) {
    if (!isNum(screen)) throw new Error('Screen number is expected!')

    env.context.screen = screen
    lab.pdata = lab.renderbuffers[screen].data
}

function enableScreen(screen) {
    env.context.screenMask = env.context.screenMask | (1 << screen)
    //console.log('screen mask: ' + (env.context.screenMask >>> 0).toString(2))
}

function disableScreen(screen) {
    env.context.screenMask = env.context.screenMask & (~(1 << screen))
    //console.log('screen mask: ' + (env.context.screenMask >>> 0).toString(2))
}

function setMode(mode) {
    if (!isNum(mode)) throw new Error(`mode number expected`)

    const modeDef = env.tune.mode[mode]
    if (!modeDef) throw new Error(`unknown mode [${mode}]`)

    env.context.mode = mode
    env.context.width = modeDef.width
    env.context.height = modeDef.height
    $.lib.util.redefineLimits()

    lib.contextUtil.redefineResolution(env.context.width, env.context.height)
    syncOutAll()
    clearAll()
}

function put(x, y, RGBA) {
    x = Math.round(x)
    y = Math.round(y)
    if (x < 0 || x >= env.context.width || y < 0 || y >= env.context.height) return
    let i = (y * env.context.width + x) * 4
    lab.pdata[i++] = RGBA[0]
    lab.pdata[i++] = RGBA[1]
    lab.pdata[i++] = RGBA[2]
    lab.pdata[i  ] = RGBA[3]
}

function flood(color) {
    floodScreen(env.context.screen, color)
}

function clear(ci) {
    clearScreen(env.context.screen, ci)
}

function drawBox(x, y, w, h, RGBA) {
    x = Math.round(x)
    y = Math.round(y)
    w = Math.round(w)
    h = Math.round(h)
    for (let iy = 0; iy < h; iy++) {
        for (let ix = 0; ix < w; ix++) {
            put(x + ix, y + iy, RGBA)
        }
    }
}

function drawCirclePoints(x, y, xc, yc, RGBA) {
    put(xc + x, yc + y, RGBA)
    put(xc + y, yc + x, RGBA)
    put(xc + y, yc - x, RGBA)
    put(xc + x, yc - y, RGBA)
    put(xc - x, yc - y, RGBA)
    put(xc - y, yc - x, RGBA)
    put(xc - y, yc + x, RGBA)
    put(xc - x, yc + y, RGBA)
}

function drawCircle(xc, yc, r, RGBA) {
    let x = 0,
        y = r,
        d = 1 - r,
        delta1 = 3,
        delta2 = -2*r + 5
    drawCirclePoints(x, y, xc, yc, RGBA)
    while(y > x) {
        if (d < 0) {
            d += delta1
            delta1 += 2
            delta2 += 2
            x++
        } else {
            d += delta2
            delta1 += 2
            delta2 += 4
            x++
            y--
        }
        drawCirclePoints(x, y, xc, yc, RGBA)
    }
}
