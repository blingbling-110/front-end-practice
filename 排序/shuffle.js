const shuffle = arr => {
    let i = arr.length
    if (i === 0) return
    while (--i) {
        const j = Math.floor(Math.random() * i)
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
}

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
shuffle(arr)
console.log(arr)