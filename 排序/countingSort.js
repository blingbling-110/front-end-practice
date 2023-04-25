const { arr } = require('./shuffle')

function countingSort(arr) {
    let max = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    const count = Array.from({ length: max + 1 }).fill(0)
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++
    }
    let i = 0
    for (let j = 0; j < count.length; j++) {
        while (count[j] > 0) {
            arr[i++] = j
            count[j]--
        }
    }
}

countingSort(arr)
console.log('排序后：', arr)

// 三次循环，前两次为n后一次为k（k是数组中最大值），时间复杂度为O(n+k)
// 空间复杂度为O(k)