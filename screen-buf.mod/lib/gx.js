function sync() {
    ctx.putImageData(lab.framebuffer, 0, 0)
}

function put(x, y, RGBA) {
    x = Math.round(x)
    y = Math.round(y)
    if (x < 0 || x >= env.width || y < 0 || y >= env.height) return
    let i = (y * env.width + x) * 4
    lab.pdata[i++] = RGBA[0]
    lab.pdata[i++] = RGBA[1]
    lab.pdata[i++] = RGBA[2]
    lab.pdata[i  ] = RGBA[3]
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
