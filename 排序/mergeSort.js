const { arr } = require('./shuffle')

function mergeSort(arr) {
    if (arr.length < 2) return arr
    const i = Math.floor(arr.length / 2)
    return merge(mergeSort(arr.slice(0, i)), mergeSort(arr.slice(i))) // 分
}

function merge(left, right) { // 治
    const arr = []
    let i = 0, j = 0, k = 0
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k++] = left[i++]
        } else {
            arr[k++] = right[j++]
        }
    }
    while (i < left.length) {
        arr[k++] = left[i++]
    }
    while (j < right.length) {
        arr[k++] = right[j++]
    }
    return arr
}

console.log('排序后：', mergeSort(arr))

// “治”这一步骤分别需要2、2^2、2^3、...、n次比较
// 而“分”这一步骤则对应分别需要执行2^(log2n-1)、2^(log2n-2)、...、1次
// 综上，总比较次数为n*log2n，时间复杂度O(nlogn)
// 额外利用了原数组大小的空间存储归并数组，空间复杂度O(n)