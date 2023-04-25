const { arr, shuffle } = require('./shuffle')
const insertionSort = require('./insertionSort')

function bucketSort(arr, bucketSize) {
    let min = max = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i]
        }
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    const size = bucketSize ?? 5
    const length = Math.floor((max - min) / size) + 1
    const buckets = Array.from({ length })
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = []
    }
    for (let i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - min) / size)].push(arr[i])
    }
    arr.length = 0
    for (let i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i])
        for (let j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j])
        }
    }
}

shuffle(arr)
console.log('桶排序前：', arr)
bucketSort(arr)
console.log('桶排序后：', arr)

// 找最值进行了2n次比较，入桶循环做了n次处理，每个桶进行了插入排序
// 若有k个桶，总次数约为2n+n+k*(n/k)^2=3n+n^2/k，时间复杂度为O(n^2/k)
// 空间复杂度为O(n+k)