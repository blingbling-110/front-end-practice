const selectionSort = arr => {
    for (let i = 0; i < arr.length - 1; i++) {
        let t = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[t] > arr[j]) {
                t = j
            }
        }
        [arr[i], arr[t]] = [arr[t], arr[i]]
    }
}

const arr = [8, 9, 6, 4, 1, 3, 7, 0, 5, 2]
selectionSort(arr)
console.log(arr)

// 两次循环，时间复杂度O(n∧2)
// 没有利用额外空间，空间复杂度O(1)