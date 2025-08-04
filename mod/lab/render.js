const Z = 1

function draw() {
    background(env.context.border)

    const base = env.height < env.width? env.height : env.width
    env.tune.edge = base * .05

    const vram = this.vram
    const aspect = vram.width/vram.height

    // calculate target area
    const w = env.width - 2*env.tune.edge
    const h = env.height - 2*env.tune.edge

    // determine best scale
    const hscale = w/vram.width
    const vscale = h/vram.height
    const scale = hscale < vscale? hscale : vscale

    // calculate actual screen dimention and position
    const sw = vram.width * scale * env.tune.scale
    const sh = vram.height * scale * env.tune.scale
    const x = (env.width - sw)/2
    const y = (env.height - sh)/2

    mod['screen-buf'].lib.gx.sync() // sync pixel data with the framebuffer
    blocky()
    //smooth()
    image(vram, x, y, sw, sh)       // render the framebuffer

    this.x = x
    this.y = y
    this.w = sw
    this.h = sh
    this.scale = scale

    // run post-vsync if needed
    if (lab.vm.resumeOnTimeout && lab.vm.vsync) {
        lab.vm.vsync = false
        lab.vm.interrupted = false
        lab.vm.resumeOnTimeout = false
        lab.vm.resume()
    }
}
