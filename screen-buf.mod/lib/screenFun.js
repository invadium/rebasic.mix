function iget(x, y, w, h, screen) {
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
            d[i++] = pdata[sh]
            d[i++] = pdata[sh+1]
            d[i++] = pdata[sh+2]
            d[i++] = pdata[sh+3]
        }
    }
    return new lab.vm.Dim(d)
}
iget.usage = '(x, y, w, h)'
iget.man = 'copy a screen area'

