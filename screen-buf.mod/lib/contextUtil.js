function configureContext2D(ctx, w, h) {
    ctx.width = w
    ctx.height = h
    ctx.canvas.width = w
    ctx.canvas.height = h
    ctx.canvas.style.width = '' + w + 'px'
    ctx.canvas.style.height = '' + h + 'px'
}

function drawSymbol(c2d, fmap, id, x, y) {
    const sym = fmap[id],
          img = fmap.img,
          sx  = sym[1],
          sy  = sym[2],
          sw  = sym[3],
          sh  = sym[4]

    c2d.drawImage(img, sx, sy, sw, sh, x, y, sw, sh)
}

function generateSymbolTable(c2d) {
    c2d.clearRect(0, 0, c2d.width, c2d.height)

    /*
    c2d.fillStyle = '#ffffffff'
    c2d.beginPath()
    c2d.rect(0, 0, 20, 20)
    c2d.fill()

    c2d.fillStyle = '#a0a0a0ff'
    c2d.lineWidth = 1

    c2d.beginPath()
    c2d.moveTo(0, 0)
    c2d.lineTo(100, 100)
    c2d.stroke()

    c2d.beginPath()
    c2d.moveTo(20, 0)
    c2d.lineTo(120, 100)
    c2d.stroke()
    */

    /*
    const size  = 8,
          shift = 2, 
          monow = 5,  // monowidth
          monoh = 10, // monoheight
          fdx   = -.5,
          fdy   = 1,
          fsx   = .5,
          fsy   = .5

    c2d.save()
    c2d.translate(.5, .5)

    //c2d.globalCompositeOperation = "xor";
    c2d.textRendering = "geometricPrecision";
    //c2d.textRendering = "optimizeSpeed";
    c2d.textBaseline = 'top'
    c2d.textAlign = 'left'
    c2d.font = '12px monogram'
    c2d.fillStyle = '#ff0000ff'
    c2d.fillText('TEST TEXT HERE', 10, 10)

    c2d.restore()
    */

    // render bitmap font
    const fontMap = $.res.bfnt.monogramMap
    c2d.imageSmoothingEnabled = false

    let bx = 0, by = 0
    const dx = fontMap.fw + 1,
          dy = fontMap.fh + 1,
          width = c2d.width,
          height = c2d.height

    for (let i = 0; i < fontMap.length; i++) {
        drawSymbol(c2d, fontMap, i, bx, by)

        bx += dx
        if (bx + dx >= width) {
            bx = 0
            by += dy
        }
    }
}

function createContext(id, w, h, special) {
    const canvas = document.createElement('canvas')
    canvas.id     = 'screen' + id
    const context2D = canvas.getContext('2d', {
        willReadFrequently: true,
    })
    configureContext2D(context2D, w, h)
    lab.rendercontext[id] = context2D
}

function redefineResolution(w, h) {
    lab.rendercontext.forEach(context2D => {
        configureContext2D(context2D, w, h)
    })
}
