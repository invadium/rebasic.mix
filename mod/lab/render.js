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

    lib.gx.sync() // sync current screen buffer with the framebuffer
    blocky()
    //smooth() - this one looks UUUGLY!
    const framebuffer = this.framebuffer
    image(framebuffer, x, y, sw, sh) // render the framebuffer

    // run post-vsync if needed
    if (lab.vm.resumeOnTimeout && lab.vm.vsync) {
        lab.vm.vsync = false
        lab.vm.interrupted = false
        lab.vm.resumeOnTimeout = false
        lab.vm.resume()
    }
}
