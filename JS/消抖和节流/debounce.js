function debounce(func, delay = 300, imm = false) {
    let timer = null
    return function () {
        // 定时器还未执行则清除
        timer && clearTimeout(timer)
        if (!timer && imm) {
            func.apply(this, arguments)
        }
        timer = setTimeout(() => {
            !imm && func.apply(this, arguments)
            // 将timer解引用，表明定时器已经执行
            timer = null
        }, delay)
    }
}