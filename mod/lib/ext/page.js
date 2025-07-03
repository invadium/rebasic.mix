// .page format parser

function register(manPage) {
    if (!manPage) return
    if (!lib.page) lib.touch('page')

    manPage.body = manPage.buf.join('\n')
    lib.page.attach(manPage)
}

function page(src, name, path) {
    const lines = src.split('\n')

    const manPage = {
        name:  name,
        title: '',
        buf:   [],
    }

    lines.forEach(line => {
        const tline = line.trim()
        if (tline.startsWith('#')) return // comment line

        if (tline.startsWith('>> ')) {
            // got the page definition
            const header = tline.substring(3).trim()
            const parts = header.split('-')
            if (parts.length === 2) {
                manPage.name = parts[0].trim()
                manPage.title = parts[1].trim()
            } else {
                log.err('expect page title definition: [' + line + ']')
            }
        } else {
            manPage.buf.push(line)
        }
    })
    
    register(manPage)
}
