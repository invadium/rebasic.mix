function defineLimits() {
    log('Setting up the environment map')

    const vm = lab.vm
    const limits = new vm.Map()
    vm.assign('limits', limits)
    limits.set('width', env.context.width)
    limits.set('height', env.context.height)
    limits.set('columns', env.context.columns)
    limits.set('rows', env.context.rows)
    vm.defineConst('limits', limits)
}

function loadSourceFile(file) {
	let input = file.target

	let reader = new FileReader()
	reader.onload = function(){
        lab.vm.loadSource(reader.result)
        //defineLimits()
	};
	reader.readAsText(input.files[0]);
}

let shots = 0
function takeScreenshot(name) {
    name = name || 'rebasic' + (++shots)
    lib.img.screenshot(name)
}
