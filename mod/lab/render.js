const Z = 1

function draw() {
    // TODO draw from the screen 0
    background(env.context.border)

    // all screens MUST be in the same MODE!!!
    // determine the current mode and scale
    const width  = env.context.width,
          height = env.context.height,
          aspect = width/height

    // calculate the edge
    const base = env.height < env.width? env.height : env.width
    env.tune.edge = base * .05

    // calculate viewport
    const w = env.width  - 2*env.tune.edge
    const h = env.height - 2*env.tune.edge

    // determine the best scale factor
    const hscale = w/width
    const vscale = h/height
    const scale = hscale < vscale? hscale : vscale

    // calculate actual screen dimension and position
    const sw = width  * scale * env.tune.scale
    const sh = height * scale * env.tune.scale
    const x  = (env.width  - sw)/2
    const y  = (env.height - sh)/2

    // buffer settings
    this.x = x
    this.y = y
    this.w = sw
    this.h = sh
    this.scale = scale

    blocky()
    //smooth() - this one looks UUUGLY!
    
    for (let i = 0; i < pin.rlab.rendercontext.length; i++) {
        if ( i === env.context.screen || (env.context.screenMask & (1 << i)) ) {
            const nextCtx = pin.rlab.rendercontext[i]
            lib.gx.syncRenderbuffer(i)
            image(nextCtx.canvas, x, y , sw, sh)
        }
    }

    // run post-vsync if needed
    if (lab.vm.resumeOnTimeout && lab.vm.vsync) {
        lab.vm.vsync = false
        lab.vm.interrupted = false
        lab.vm.resumeOnTimeout = false
        lab.vm.resume()
    }
}
