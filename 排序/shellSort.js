const { arr } = require('./shuffle')

function shellSort(arr) {
    const n = arr.length
    let gap = 1
    while (gap < n / 3) { // 计算能三等分数组的gap
        gap = 3 * gap + 1
    }
    for (; gap > 0; gap = (gap - 1) / 3) { // 逐轮排序直到gap为1
        for (let i = gap; i < n; i++) { // i代表被排序数的索引
            const v = arr[i]
            let j // j代表用于比较的数的索引
            for (j = i - gap; j >= 0; j -= gap) {
                // 类似于插入排序，若j位大于i位则依次往后挪，否则将i位赋给j+1位
                if (arr[j] > v) {
                    arr[j + gap] = arr[j]
                    if (j < gap) {
                        arr[j] = v
                        break
                    }
                } else {
                    arr[j + gap] = v
                    break
                }
            }
        }
    }
}

shellSort(arr)
console.log('排序后：', arr)

// 第一层循环，共n/gap个数，最多比较n/gap-1次
// 第二层循环，需要跑n-gap次第一层循环，即(n/gap-1)(n-gap)
// 第三层循环，共log3n次
// 综上，总比较次数为(3^i-1)(n-n/3^i)累加（i取1,2,3,...,log3n）=1.5n^2-2nlog3n-n-0.5，时间复杂度O(n^2)
// 没有利用额外空间，空间复杂度O(1)