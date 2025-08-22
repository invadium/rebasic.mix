function setup() {
    const context = _$.env.context
    const w       = context.width
    const h       = context.height

    env.width  = w
    env.height = h

    lab.rendercontext = []

    lib.contextUtil.configureContext2D(ctx, w, h)
    lab.rendercontext[1] = ctx

    lib.contextUtil.createContext(0, w, h)
    for (let i = 2; i < context.MAX_SCREEN; i++) {
        lib.contextUtil.createContext(i, w, h)
    }

    _$.pin.link(lab, 'rlab')
}
