function throttle(func, delay, opt = {}) {
    let timer, ctx, args, res
    let timestamp = 0
    const cb = () => {
        timer = null
        timestamp = opt.leading === false ? 0 : new Date().getTime()
        res = func.apply(ctx, args)
        !timer && (ctx = args = null)
    }
    return function () {
        ctx = this
        args = arguments
        const now = new Date().getTime()
        if (!timestamp && opt.leading === false) {
            timestamp = now
        }
        const delta = now - timestamp
        if (delta > delay) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            timestamp = now
            res = func.apply(ctx, args)
            !timer && (ctx = args = null)
        } else if (!timer && opt.trailing !== false) {
            timer = setTimeout(cb, delay - delta)
        }
        return res
    }
}