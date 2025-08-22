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
    const context2d = canvas.getContext('2d')
    configureContext2D(context2d, w, h)
    lab.rendercontext[id] = context2d
}
