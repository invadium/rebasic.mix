let romTaglines

function parseTagline(text) {
    if (!text) return
    const lines = text.split('\n')
    if (lines.length < 1) return

    let tagComment = false
    let line = lines[0].trim().toLowerCase()
    if (line) {
        const lineNum = parseInt(line)
        if (isNumber(lineNum) && !isNaN(lineNum)) {
            const codeAt = line.indexOf(' ')
            line = line.substring(codeAt).trim()
        }
        if (line.startsWith('rem')) {
            line = line.substring(3).trim()
            tagComment = true
        } else if (line.startsWith("'") || line.startsWith("`")) {
            line = line.substring(1).trim()
            tagComment = true
        }
        
        if (tagComment) return line
    }

    return
}

function compileTaglines(dir) {
    if (!romTaglines) romTaglines = {}

    Object.keys(dir).forEach(key => {
        const text = dir[key]
        const tagline = parseTagline(text)
        if (tagline) romTaglines[key] = tagline
    })
}

const io = {

    open: function() {},
    
    print: function(line) {
        let semi = false
        let comma = false

        for (let i = 0; i < arguments.length; i++) {
            let val = arguments[i]
            if (val === undefined) val = ''

            if (typeof val === 'object') {
                if (val.semi) {
                    semi = true
                } else if (val.comma) {
                    comma = true
                } else if (val.toPrint) {
                    if (i > 0 && !semi) lab.textmode.outc(' ')
                    lab.textmode.printout(val.toPrint())
                    semi = false
                    comma = false
                }
            } else {
                if (i > 0 && comma) lab.textmode.outc(' ')
                lab.textmode.printout('' + val)
                semi = false
                comma = false
            }
        }
        if (comma) lab.textmode.outc(' ')
        if (!semi && !comma) lab.textmode.outc('\n')
    },

    input: function() {
        // print out
        for (let i = 0; i < arguments.length; i++) {
            const v = arguments[i]

            if (typeof v === 'object' && v.id) {
                this.inputTarget = v
            } else {
                lab.textmode.printout('' + v + ' ')
                //process.stdout.write('' + v + ' ')
            }
        }
        lab.ioCtrl.enable()
        this.waitForInput()
    },

    cls: function() {
        lab.textmode.clear()
        this.command.paper()
    },

    clt: function() {
        lab.textmode.clear()
    },

    clg: function() {
        this.command.paper()
    },

    screenshot: function(name) {
        lib.util.takeScreenshot(name)
    },

    htab: function(x) {
        lab.textmode.htab(x)
    },

    vtab: function(y) {
        lab.textmode.vtab(y)
    },

    locate: function(x, y, c) {
        lab.textmode.locate(x, y, c)
    },

    rom: function() {
        if (!romTaglines) {
            compileTaglines(lib.rom._dir)
        }

        const vm = this
        vm.command.print('=== ROM EXAMPLES ===')
        vm.command.print('TO LOAD USE:')
        vm.command.print('> LOAD "<NAME>"')
        vm.command.print('--------------------')
        Object.keys(lib.rom._dir).forEach(key => {
            const text = lib.rom._dir[key]
            const tagline = romTaglines[key]

            const sufix = tagline? ' - ' + tagline : ''
            env.context.leftMargin = 3
            vm.command.print(' * ' + key + sufix, { semi: true })

            // restore the left margin and shift to the next line
            env.context.leftMargin = 0
            vm.command.print('', { semi: false })
        })
        vm.command.print('')
    },

    close: function() {},
}

io.print.usage = '(val1),(val2);(val3);...'
io.print.man = 'print out\n'
       + '    the list of values,\n'
       + '    a space is used when separated by [,],\n'
       + '    nothing is used when separated by [;],\n'
       + '    skip the new line when ended by [;],\n'
       + '    [print] with no arguments prints a new line'


io.cls.man = 'clear the screen'
io.home = io.cls

io.clt.man = 'clear the text buffer'

io.clg.man = 'clear the framebuffer (graphics)'

io.screenshot.usage = '<filename>'
io.screenshot.manual = 'take a screenshot'

io.rom.man = 'list examples from rom'

io.htab.man = 'set horizontal cursor position'
io.vtab.man = 'set vertical cursor position'

io.locate.usage = '[x], [y], <cursor-mode>'
io.locate.man = 'set the cursor position and mode'

io.close.service = true // hide from help
