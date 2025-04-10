function trimTail(buf) {
    if (buf && buf.length > 0 && buf[buf.length - 1] === '') {
        buf.pop()
        trimTail(buf)
    }
}

function register(brief) {
    if (!brief) return
    if (!lib.brief) lib.touch('brief')
    console.dir(brief)

    trimTail(brief.buf)
    brief.body = brief.buf.join('\n')
    lib.brief.attach(brief)
}

function brief(src, name, path) {
    if (!mod.rebasic) {
        defer(() => {
            brief(src, name, path)
        })
    } else {
        const ls = mod.rebasic.lib.util.brief.parse(src)
        ls.forEach(b => register(b))
    }
}
