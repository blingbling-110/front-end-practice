const shuffle = arr => {
    let i = arr.length
    if (i === 0) return
    while (--i) { // 洗牌范围逐轮缩小
        const j = Math.floor(Math.random() * i) // 从0到i随机选取并交换
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
}

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log('洗牌前：', arr)
shuffle(arr)
console.log('洗牌后：', arr)

module.exports = { shuffle, arr }