function throttle(func, delay = 300, opt = {}) {
    const leading = opt?.leading ?? false,
        trailing = opt?.trailing ?? true
    let timer = null
    return function () {
        // 定时器还未执行则直接返回
        if (timer) return
        leading && func.apply(this, arguments)
        timer = setTimeout(() => {
            trailing && func.apply(this, arguments)
            // 将timer解引用，表明定时器已经执行
            timer = null
        }, delay)
    }
}