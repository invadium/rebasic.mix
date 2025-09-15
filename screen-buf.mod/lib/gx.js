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
    if (screen === env.context.MAX_SCREEN - 1) {
        lib.contextUtil.generateSymbolTable(context2D, screen)
    }

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

    if (screen === env.context.MAX_SCREEN - 1) {
        syncOut(screen)
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
    $.lab.textmode.adjust()
    $.lib.util.redefineLimits()

    lib.contextUtil.redefineResolution(env.context.width, env.context.height)
    syncOutAll()
    clearAll()
    $.lab.textmode.clear()
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

function getMask(x, y, w, h, screen) {
    const W = env.context.width
    const H = env.context.height

    const x2 = clamp(x + w, 0, W)
    const y2 = clamp(y + h, 0, H)
    const x1 = clamp(x, 0, W)
    const y1 = clamp(y, 0, H)

    let pdata = lab.pdata
    if (isNum(screen)) {
        pdata = lab.renderbuffers[screen].data
    }

    const d = [w, h]
    
    let i = 2
    for (let cy = y1; cy < y2; cy++) {
        const base = (cy * W * 4)
        for (let cx = x1; cx < x2; cx++) {
            let sh = base + cx * 4
            if (pdata[sh + 3] === 255) {
                d[i++] = true
            } else {
                d[i++] = false
            }
        }
    }
    return d
}

function putMask(mask, x, y, sRGBA, screen) {
    const W = env.context.width
    const H = env.context.height
    x = x | 0
    y = y | 0
    if (x >= W || y >= H) return

    let pdata = lab.pdata
    if (isNum(screen)) {
        pdata = lab.renderbuffers[screen].data
    }

    const d = mask
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

    let sy = sy1
    for (let ty = ty1; ty < ty2; ty++) {
        const tbase = (ty * W * 4)
        const sbase = (sy * w)
        
        let sx = sx1
        for (let tx = tx1; tx < tx2; tx++) {
            const tsh = tbase + tx * 4
            const ssh = 2 + sbase + sx

            const v = d[ssh]
            if (v) {
                pdata[tsh  ] = sRGBA[0]
                pdata[tsh+1] = sRGBA[1]
                pdata[tsh+2] = sRGBA[2]
                pdata[tsh+3] = sRGBA[3]
            }

            sx++
        }
        sy++
    }
}

function drawSymbol(c, x, y, sRGBA) {
    const fontMap = env.context.fontMap
    const sym = fontMap._dir[c]
    if (!sym) return

    // TODO cache symbols
    const snap = getMask(sym[5], sym[6], sym[7], sym[8], fontMap.screen)
    putMask(snap, x, y, sRGBA)
}

function drawText(text, x, y, sRGBA) {
    const fontMap = env.context.fontMap,
          dx = fontMap.fw + 1,
          sq = text.split('')

    let bx = x, by = y
    for (let i = 0; i < sq.length; i++) {
        drawSymbol(sq[i], bx, by, sRGBA)

        bx += dx
    }
}
