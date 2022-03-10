function debounce(func, delay, imm) {
    let begin, timer, ctx, args, res
    const cb = () => {
        const delta = new Date().getTime() - begin
        if (delta < delay) {
            timer = setTimeout(cb, delay - delta)
        } else {
            timer = null
            if (!imm) {
                res = func.apply(ctx, args)
                !timer && (ctx = args = null)
            }
        }
    }
    return function () {
        ctx = this
        args = arguments
        begin = new Date().getTime()
        if (!timer) {
            timer = setTimeout(cb, delay)
            if (imm) {
                res = func.apply(ctx, args)
                ctx = args = null
            }
        }
        return res
    }
}