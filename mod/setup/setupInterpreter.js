function setupVM() {
    const vm = mod.rebasic.arch.vm()
    vm.lexFromSource = mod.rebasic.arch.lex
    vm.parse = mod.rebasic.arch.parser

    vm.opt.errToConsole = true
    if (env.config && env.config.debug) vm.opt.debug = true
            
    const core = mod.rebasic.lib.core
    for (let n in core) vm.defineCmd(n, core[n])

    const func = mod.rebasic.lib.func
    for (let n in func) vm.defineFun(n, func[n])

    const io = lib.sub.io
    for (let n in io) vm.defineCmd(n, io[n])

    const sys = lib.sub.sys
    for (let n in sys) vm.defineCmd(n, sys[n])

    const ifunc = lib.sub.func
    for (let n in ifunc) vm.defineFun(n, ifunc[n])

    const rmath = mod.rebasic.lib.rmath
    for (let n in rmath.fn) vm.defineFun(n, rmath.fn[n])
    for (let n in rmath.scope) vm.defineConst(n, rmath.scope[n])

    const str = mod.rebasic.lib.str
    for (let n in str) vm.defineFun(n, str[n])

    // graphics
    const screen = mod['screen-buf'].lib.screen
    for (let n in screen) vm.defineCmd(n, screen[n])

    // === define event handlers ===
    vm.onNewLine = function(n) {
        lab.ioCtrl.onNewLine(n)
    }

    vm.onRun = function() {
        env.currentKey = ''
        lab.ioCtrl.disable()
        lab.textmode.saveState()
        // TODO store the text mode settings
    }

    vm.onInput = function(captured) {
        if (captured) lab.ioCtrl.disable()
    }

    vm.onStop = function() {
        if (lab.vm.loop) lab.ioCtrl.enable()
        lab.textmode.restoreState()
        // TODO restore the text mode settings
    }

    // specific hooks to handle stdin/out
    vm.command.open() // open IO with environment-specific procedure

    return vm
}

function repl() {
    const vm = setupVM()
    lab.attach(vm, 'vm')
    vm.repl()
}

function setupInterpreter() {
    const buf = mod['screen-buf']
    lab.render.vram = buf.ctx.canvas
    buf.env.link(env.tune)
    buf.env.link(env.context)

    repl()
    buf.lib.screen.paper()

    if (window.location.hash) {
        trap('hash', window.location.hash)
    }
}
setupInterpreter.Z = 11
