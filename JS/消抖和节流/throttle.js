function throttle(func, delay = 300, opt = {}) {
    let timer, ctx, args, res
    let timestamp = 0
    const cb = () => {
        // 解引用避免内存泄漏
        timer = null
        // 记录本次执行目标函数的时间戳
        timestamp = new Date().getTime()
        res = func.apply(ctx, args)
        // 解引用避免内存泄漏
        !timer && (ctx = args = null)
    }
    return function () {
        ctx = this
        args = arguments
        const now = new Date().getTime()
        if (opt.leading === false) {
            // 若不需要在节流开始时执行目标函数，则此处需要设置时间戳来使delta为0
            timestamp = now
        }
        // 若需要在节流开始执行目标函数，则delta就是距离最后一次执行目标函数的时间差
        const delta = now - timestamp
        if (delta > delay) {
            // 时间差大于节流时间也需要判断计时器，因为setTimeout的执行时间可能比设置值更晚
            if (timer) {
                clearTimeout(timer)
                // 解引用避免内存泄漏
                timer = null
            }
            // 记录本次执行目标函数的时间戳
            timestamp = now
            // 注意执行目标函数需要做到：
            // 1.绑定上下文
            // 2.传递入参
            // 3.返回结果
            res = func.apply(ctx, args)
            // 解引用避免内存泄漏
            !timer && (ctx = args = null)
        } else if (!timer && opt.trailing !== false) {
            // 若时间差小于节流时间，并且此时已经没有计时器了，同时还需要在节流结束时执行目标函数
            timer = setTimeout(cb, delay - delta)
        }
        return res
    }
}