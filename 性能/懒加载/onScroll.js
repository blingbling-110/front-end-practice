function onScroll() {
    const viewHeight = window.innerHeight
    document.querySelectorAll('img[data-src]').forEach(img => {
        const dataSrc = img.dataset.src
        if (!dataSrc) {
            // 已经加载
            return
        }
        if (img.getBoundingClientRect().y < viewHeight) {
            img.src = dataSrc
            img.removeAttribute('data-src')
        }
    })
}

window.onload = () => {
    onScroll()
    window.addEventListener('scroll', throttle(onScroll, 150))
}