const insertionSort = arr => {
    for (let i = 1; i < arr.length; i++) {
        const value = arr[i]
        for (let j = i - 1; j >= 0; j--) {
            if (arr[j] > value) {
                arr[j + 1] = arr[j]
                if (j === 0) {
                    arr[0] = value
                    break
                }
            } else {
                arr[j + 1] = value
                break
            }
        }
    }
}

const arr = [8, 9, 6, 4, 1, 3, 7, 0, 5, 2]
insertionSort(arr)
console.log(arr)

// 两层循环，时间复杂度O(n^2)
// 没有利用额外空间，空间复杂度O(!)