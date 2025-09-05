const Z = 1

function draw() {
    // TODO draw from the screen 0
    background(env.context.border)

    // === calculate viewport scale and placement ===

    // all screens MUST be in the same MODE!!!

    // determine current framebuffer mode and aspect rate
    const fbWidth  = env.context.width,
          fbHeight = env.context.height,
          fbAspect = fbWidth/fbHeight

    // calculate viewport
    const pureHScale = floor(ctx.width / fbWidth),
          pureVScale = floor(ctx.height / fbHeight)
    let scale = 1
    if (pureHScale < pureVScale) {
        scale = pureHScale
    } else {
        scale = pureVScale
    }

    const vpWidth  = fbWidth * scale,
          vpHeight = fbHeight * scale

    const vpx = floor((ctx.width - vpWidth) / 2),
          vpy = floor((ctx.height - vpHeight) / 2)
          
    // buffer settings
    this.x = vpx
    this.y = vpy
    this.w = vpWidth
    this.h = vpHeight
    this.scale = scale

    /*
    // calculate the edge
    const base = env.height < env.width? env.height : env.width
    env.tune.edge = base * .05

    // calculate viewport
    const w = env.width  - 2*env.tune.edge
    const h = env.height - 2*env.tune.edge

    // determine the best scale factor
    const hscale = w/fbWidth
    const vscale = h/fbHeight
    const scale = hscale < vscale? hscale : vscale

    // calculate actual screen dimension and position
    const sw = fbWidth  * scale * env.tune.scale
    const sh = fbHeight * scale * env.tune.scale
    const x  = (env.width  - sw)/2
    const y  = (env.height - sh)/2

    // buffer settings
    this.x = x
    this.y = y
    this.w = sw
    this.h = sh
    this.scale = scale
    */

    blocky()
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
