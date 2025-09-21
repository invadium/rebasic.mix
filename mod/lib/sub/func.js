const func = {

    inkey$: function() {
        const k = env.currentKey
        env.currentKey = ''
        return k
    },

    key$: function() {
        return env.currentKey
    },
}

func.inkey$.usage = ''
func.inkey$.man = 'read a value of a currently pressed key'
func.inkey$.tags = 'core'

func.get = func.inkey$
func.get.usage = ''
func.get.man = 'read a value of a currently pressed key, an alias to inkey$'

func.key$.usage = ''
func.key$.man = 'peek a value of a currently pressed key\n'
                + "  this function doesn't clean up\n"
                + '  the key buffer like inkey$()'

