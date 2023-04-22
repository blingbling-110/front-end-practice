const { arr } = require('./shuffle')

function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start >= end) {
        return arr
    }
    const i = partition(arr, start, end)
    quickSort(arr, start, i - 1)
    quickSort(arr, i + 1, end)
}

function partition(arr, start, end) {
    let i = start // i表示最终要返回的分区索引
    for (let j = start + 1; j <= end; j++) { // 逐个比较
        if (arr[j] < arr[start]) {
            i++ // 若j位小于起始位，则与i+1位交换
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    [arr[start], arr[i]] = [arr[i], arr[start]] // 最后将起始位与分区位交换以保证i之前的数均小于i位
    return i
}

quickSort(arr)
console.log('排序后：', arr)

// 每次递归（start<end）会做一次分区和两次子递归
// 每次分区时会比较end-start次
// 总比较次数为n+(n-1)+(n-3)+...+(n-(1+2+4+...(n+1)/2))=2^(i-1)*i累加（i取1,2,3,...,log2(n+1)）再减去(n+1)/2
// 以上次数小于n*log2(n+1) - (n+1)/2，时间复杂度O(nlogn)
// 产生递归调用，空间复杂度O(logn)