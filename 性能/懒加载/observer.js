const ob = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) {
        return
    }
    const img = entry.target
    const dataSrc = img.dataset.src
    if (dataSrc) {
        img.src = dataSrc
        img.removeAttribute('data-src')
    }
}))
document.querySelectorAll('img[data-src]').forEach(img => ob.observe(img))