const func = {

    inkey$: function() {
        const k = env.currentKey
        env.currentKey = ''
        return k
    },

}

func.inkey$.usage = ''
func.inkey$.man = 'read a value of a currently pressed key'

