function shellSort(arr) {
    const len = arr.length
    let gap = 1
    while (gap < len / 3) {
        gap = 3 * gap + 1
    }
    for (gap; gap > 0; gap = (gap - 1) / 3) {
        for (let i = gap; i < len; i++) {
            const target = arr[i]
            let j
            for (j = i - gap; j >= 0 && arr[j] > target; j -= gap) {
                arr[j + gap] = arr[j]
            }
            arr[j + gap] = target
        }
    }
}

const arr = [8, 9, 6, 4, 1, 3, 7, 0, 5, 2]
shellSort(arr)
console.log(arr)

// 三层循环：
// 第一层循环，共3个数，最多比较2次
// 第二层循环，共n/3组，需要跑n/3次第一层循环，即2*n/3=1.5n
// 第三层循环，共log3n次（详见第4、5行的while循环），即1.5n*log3n
// 综上，时间复杂度O(nlogn)
// 没有利用额外空间，空间复杂度O(1)