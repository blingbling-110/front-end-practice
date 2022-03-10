function debounce(func, delay, imm) {
    let begin, timer, ctx, args, res
    const cb = () => {
        // 注意此处的begin为最后一次执行返回函数的时间戳
        // 因此，delta是计时器结束时距最后一次执行返回函数的时间差
        const delta = new Date().getTime() - begin
        if (delta < delay) {
            // 执行返回函数的时间间隔还不够，需要将剩余时间也耗尽
            timer = setTimeout(cb, delay - delta)
        } else {
            // 解引用避免内存泄漏
            timer = null
            if (!imm) {
                res = func.apply(ctx, args)
                // 解引用避免内存泄漏
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
                // 注意执行目标函数需要做到：
                // 1.绑定上下文
                // 2.传递入参
                // 3.返回结果
                res = func.apply(ctx, args)
                // 解引用避免内存泄漏
                ctx = args = null
            }
        }
        return res
    }
}