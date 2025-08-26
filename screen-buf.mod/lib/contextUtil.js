function configureContext2D(ctx, w, h) {
    ctx.width = w
    ctx.height = h
    ctx.canvas.width = w
    ctx.canvas.height = h
    ctx.canvas.style.width = '' + w + 'px'
    ctx.canvas.style.height = '' + h + 'px'
}

function createContext(id, w, h) {
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
