function configureCanvas(canvas, ctx, w, h) {
    ctx.width = w
    ctx.height = h
    canvas.width = w
    canvas.height = h
    canvas.style.width = '' + w + 'px'
    canvas.style.height = '' + h + 'px'
}

function createContext(id, w, h) {
    const canvas = document.createElement('canvas')
    canvas.id     = 'screen' + id
    const context2d = canvas.getContext('2d')
    configureCanvas(canvas, context2d, w, h)
    lab.rendercontext[id] = context2d
}

function setup() {
    const context = _$.env.context
    const w       = context.width
    const h       = context.height

    env.width  = w
    env.height = h

    lab.rendercontext = []

    configureCanvas(ctx.canvas, ctx, w, h)
    lab.rendercontext[1] = ctx

    createContext(0, w, h)
    for (let i = 2; i < context.MAX_SCREEN; i++) {
        createContext(i, w, h)
    }

    _$.pin.link(lab, 'rlab')
}
