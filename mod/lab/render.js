const Z = 1

function draw() {
    // TODO draw from the screen 0
    background(env.context.border)

    // all screens MUST be in the same MODE!!!

    // === calculate viewport scale and placement ===

    // determine current framebuffer dimensions and aspect rate
    const fbWidth  = env.context.width,
          fbHeight = env.context.height,
          fbAspect = fbWidth/fbHeight

    // calculate minimal edge
    const base = env.height < env.width? env.height : env.width
    const edge = base * env.tune.edge

    // calculate proper viewport scale
    let scale = 1

    if (env.tune.discreteScale) {
        const pureHScale = floor((ctx.width  - 2 * edge) / fbWidth),
              pureVScale = floor((ctx.height - 2 * edge) / fbHeight)
        if (pureHScale < pureVScale) {
            scale = max(pureHScale, 1)
        } else {
            scale = max(pureVScale, 1)
        }
    } else {
        const potentialWidth  = ctx.width  - 2 * edge
        const potentialHeight = ctx.height - 2 * edge

        // determine the best scale factor
        const hscale = potentialWidth/fbWidth
        const vscale = potentialHeight/fbHeight
        scale = hscale < vscale? hscale : vscale
    }
    scale *= env.tune.scale

    const vpWidth  = fbWidth * scale,
          vpHeight = fbHeight * scale

    const vpx = floor((ctx.width - vpWidth) / 2),
          vpy = floor((ctx.height - vpHeight) / 2)
          
    // === cache the calculated settings ===
    this.x = vpx
    this.y = vpy
    this.w = vpWidth
    this.h = vpHeight
    this.scale = scale

    // === render all enabled renderbuffers ===

    blocky() // we want screen to be pixelated
    //smooth() - this one looks UUUGLY!
    
    for (let i = 0; i < pin.rlab.rendercontext.length; i++) {
        if ( i === env.context.screen || (env.context.screenMask & (1 << i)) ) {
            const nextCtx = pin.rlab.rendercontext[i]
            lib.gx.syncRenderbuffer(i)
            image(nextCtx.canvas, vpx, vpy , vpWidth, vpHeight)
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
