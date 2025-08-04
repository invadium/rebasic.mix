function setup() {
    const context    = _$.env.context
    const W          = context.width
    const H          = context.height

    const canvas = ctx.canvas

    ctx.width = W
    ctx.height = H
    canvas.width = W
    canvas.height = H
    canvas.style.width = '' + W + 'px'
    canvas.style.height = '' + H + 'px'
    env.width = W
    env.height = H
}
