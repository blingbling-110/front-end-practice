const bubbleSort = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
}

const arr = [8, 9, 6, 4, 1, 3, 7, 0, 5, 2]
bubbleSort(arr)
console.log(arr)

// 两层循环，时间复杂度O(n∧2)
// 没有利用额外空间，空间复杂度O(1)