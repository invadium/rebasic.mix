const system = {

    profile: function profile(name, save) {
        const vm = this

        if (save) {
            if (save !== "save") throw new Error('"save" string flag is expected')
            lib.profile.saveProfile(name)
        } else if (name) {
            lib.profile.loadProfile(name)
        } else {
            // show the current profile
            vm.command.print('=== current ===')
            vm.command.print(`  + ${env.profile.name}`)

            // list the predefined profiles
            vm.command.print('=== predefined ===')
            Object.keys(lib.profiles._dir).forEach(key => {
                if (key === env.profile.name) {
                    vm.command.print(`  + ${key}`)
                } else {
                    vm.command.print(`  - ${key}`)
                }
            })

            // list the custom profiles
            if (env.profile && env.profile.customList.length > 0) {
                vm.command.print('=== custom ===')
                env.profile.customList.forEach(profile => {
                    vm.command.print(`  - ${profile}`)
                })
            }
        }
    },

    load: function load(name) {
        if (name) {
            name = name.toLowerCase()

            // "latest" - a special name
            if (name === 'latest') {
                this.loadSource(env.profile.sources['latest'])
                return
            }

            // look up in ROM
            const src = lib.rom[name]
            if (src) {
                this.loadSource(src)
            } else {
                this.command.print(`can't find [${name}]`)
            }

        } else {
            let input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'text/bas')
            input.setAttribute('onchange', "$.lib.util.loadSourceFile(event)")
            input.click()
        }
    },

    save: function save(name) {
        name = name || 'source.bas'
        name = name.toLowerCase()
        if (name.indexOf('.') < 0) name += '.bas'

        const source = lab.vm.source()
        lib.util.saveFile(name, source)
    },

    savelog: function textshot(name) {
        name = name || 'rebasic.log'
        name = name.toLowerCase()
        if (name.indexOf('.') < 0) name += '.log'

        // compile the log
        const lines = lab.textmode.getLines()
        while (lines.length > 0 && lines[lines.length - 1].trim().length === 0) {
            lines.pop() // drop trailing empty lines
        }
        if (lines.length > 0 && lines[lines.length - 1].toLowerCase().trim().startsWith('savelog')) {
            lines.pop() // drop the "savelog" command
        }
        const content = lines.join('\n')

        lib.util.saveFile(name, content)
    },

    help: function help(name) {
        const vm = this

        function normalizeArg(target) {
            // normalize possible ReBasic id object
            if (!target) return ''

            if ((typeof target === 'object') && isStr(target.id)) {
                return target.id
            } else if (isStr(target)) {
                return target
            }
            return ''
        }

        function printDotted(ls) {
            for (let i = 0; i < ls.length; i++) {
                const name = ls[i]
                const prefix = i > 0? ' * ' : '* '
                let line = prefix + name
                if (lab.textmode.shiftsRemaining() <= line.length) {
                    vm.command.print("")
                    line = '* ' + name
                }
                vm.command.print(line, { semi: true })
            }
        }

        function helpForFn(target, fn) {
            let def = target
            if (fn.usage) def += ' ' + fn.usage
            if (fn.man) def += ' - ' + fn.man
            vm.command.print(def)
        }

        function helpFor(target) {
            target = normalizeArg(target)

            if (target === 'tags') {
                vm.command.print(vm.listTags())
                return
            } else if (target.startsWith('#')) {
                const targets = vm.getByTag(target.substring(1))
                targets.forEach(next => helpForFn(next.name, next))
                return
            }

            const fn = vm.command[target] || vm.fun[target]
            if (fn) {
                helpForFn(target, fn)
            } else {
                const page = lib.page._dir[target]
                if (page) {
                    vm.command.print(page.body)
                } else {
                    if (vm.tags.indexOf(target) >= 0) {
                        const targets = vm.getByTag(target)
                        targets.forEach(next => helpForFn(next.name, next))
                    } else {
                        vm.command.print(target + ' - unknown command/page/tag')
                    }
                }
            }
        }

        function basicHelp(all) {
            vm.command.print('* [help <name>] - info on any command or page.')
            if (!all) {
                vm.command.print('* [help intro] - read the introduction.')
                vm.command.print('* [help start] - to learn how to start.')
                vm.command.print('* [help pages] - list other available pages.')
                vm.command.print('* [help all] - list every command and page.')
                vm.command.print('* Use <PageUp> and <PageDown> to scroll output.')
            }
            vm.command.print('')

            if (all) {
                vm.command.print('=== available pages ===')

                const pages = Object.keys(lib.page._dir).sort()
                printDotted(pages)
                vm.command.print('')
                vm.command.print('')

                vm.command.print('=== all commands and functions ===')
            } else {
                vm.command.print('=== major commands and functions ===')
            }

            const ls = []
            Object.keys(vm.command).forEach((cmd, i) => {
                if (cmd.startsWith('_')) return
                const obj = vm.command[cmd]
                if (typeof obj !== 'function' || obj.service) return
                if (!all && (!obj.tags || !obj.tags.includes('core'))) return
                ls.push(cmd)
                //vm.command.print(prefix + cmd, { semi: true })
            })
            Object.keys(vm.fun).forEach((fn, i) => {
                if (fn.startsWith('_')) return
                const obj = vm.fun[fn]
                if (typeof obj !== 'function' || obj.service) return
                if (!all && (!obj.tags || !obj.tags.includes('core'))) return
                ls.push(fn + '()')
                //vm.command.print(fn + '() ', { semi: true })
            })

            ls.sort()
            printDotted(ls)
            vm.command.print('')
        }

        if (name) {
            name = normalizeArg(name)

            if (name === 'all') {
                return basicHelp(true)
            } else if (name === 'pages') {
                const pages = Object.keys(lib.page._dir).sort()
                printDotted(pages)
                vm.command.print('')
                return
            }

            helpFor(name)
            if (arguments.length > 1) {
                for (let i = 1; i < arguments.length; i++) {
                    helpFor(arguments[i])
                }
            }

        } else {
            basicHelp(false)
        }
    }
}

system.savelog.usage = '(name)'
system.savelog.man = 'save screen text log in a file'

system.profile.usage = '(name), (save)'
system.profile.man = 'manage profiles\n'
                + '    * list all profiles when no name is specified\n'
                + '    * load the profile when the name is specified\n'
                + '    * save the profile if the name is followed by "save"'
system.profile.tags = 'core'

module.exports = system
