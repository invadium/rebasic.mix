function redefineLimits() {
    const limits = lab.vm.constant['limits']
    limits.set('mode', env.context.mode)
    limits.set('width', env.context.width)
    limits.set('height', env.context.height)
    limits.set('columns', env.context.columns)
    limits.set('rows', env.context.rows)
}

function defineLimits() {
    log('Setting up the environment map')

    const limits = new lab.vm.Map()
    lab.vm.assign('limits', limits)
    lab.vm.defineConst('limits', limits)

    redefineLimits()
}

function loadSourceFile(file) {
	let input = file.target

	let reader = new FileReader()
	reader.onload = function(){
        try {
            lab.vm.loadSource(reader.result)
            //defineLimits()
        } catch (e) {
            console.log(e)
            lab.vm.command.print(e.message)
        }
	};
	reader.readAsText(input.files[0]);
}

let shots = 0
function takeScreenshot(name) {
    name = name || 'rebasic' + (++shots)
    lib.img.screenshot(name)
}

function saveFile(name, content) {
    const a = document.createElement('a')
    a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
    a.download = name
    a.click()
}
