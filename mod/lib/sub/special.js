const mmap = {
    dataList:  true,
    immediate: true,

    doParse: function(vm, token) {
        console.dir(token)

        if (!isArray(token.opt) || token.opt.length !== 2) {
            throw new Error('mmap definition requires two comma-separated values for mapping')
        }
        vm.definePatternMapping(token.opt[0].val, token.opt[1].val)
        console.dir(vm.mmap)
    }
}

const mask = {
    masked:    true,
    immediate: true,

    state: 0,

    doParse: function(vm, token) {
        if (!token || !isArray(token.opt) || token.opt.length < 1) throw new Error('pattern mask is expected')
        
        const maskLine = token.opt[0].val.substring(1).toLowerCase()
        const mask = maskLine.split('')

        if (mask[0] === '-') {
            // pattern start of finish
            switch(this.state) {
                case 0:
                    const trimLine = maskLine.trim()
                    this.pattern = {
                        name:   this.lastName,
                        width:  trimLine.length,
                        height: 0,
                        rawData: [],
                    }
                    this.state = 1
                    break
                case 1:
                    // save the pattern
                    this.pattern.rawData.unshift(this.pattern.height)
                    this.pattern.rawData.unshift(this.pattern.width)

                    log('=== PATTERN ===')
                    console.dir(this.pattern)
                    vm.assign(this.pattern.name, new vm.Dim(this.pattern.rawData))

                    this.state = 0
                    break
            }
        } else {
            switch(this.state) {
                case 0:
                    this.lastName = maskLine.trim()
                    break
                case 1:
                    //this.pattern.rawData.push(maskLine)
                    const raw = this.pattern.rawData
                    for (let x = 0; x < this.pattern.width; x++) {
                        const pattern = mask[x]
                        if (!pattern) {
                            raw.push(0); raw.push(0); raw.push(0); raw.push(0)
                        } else {
                            const target = vm.mapPattern(pattern)
                            if (!target) {
                                raw.push(0); raw.push(0); raw.push(0); raw.push(0)
                            } else {
                                // map the target to iRGB colors
                                const c = mod['screen-buf'].lib.gx.mapColor(target) || '#ff80ffff'
                                const RGBA = lib.color.color2RGBA(c)
                                raw.push(RGBA[0]);
                                raw.push(RGBA[1]);
                                raw.push(RGBA[2]);
                                raw.push(RGBA[3]);
                            }
                        }
                    }
                    this.pattern.height ++
                    break
            }
        }

    }
}
