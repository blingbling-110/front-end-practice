const { arr } = require('./shuffle')

function heapSort(arr) {
    let n = arr.length

    // 堆调整
    const heapify = i => {
        const left = 2 * i + 1,
            right = 2 * i + 2
        let largest = i

        if (left < n && arr[left] > arr[largest]) {
            largest = left
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]]
            heapify(largest) // 继续调整被换下来的节点
        }
    }

    // 建立大顶堆
    for (let i = Math.floor(n / 2); i >= 0; i--) {
        heapify(i)
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]
        n--
        heapify(0) // 之前建立了大顶堆，因此只需调整顶节点就能继续维持大顶堆
    }
}

heapSort(arr)
console.log('排序后：', arr)

// 树高k=log2(n+1)
// 建堆时，最多比较次数为2*(2^(k-1-1)+2^(k-2-1)*2 +2^(k-3-1)*3+...+2^(1-1)*(k-1))=2(n-k)
// 重建时，循环n-1次，最多比较次数为2*(n-1)*(k-1)
// 总比较次数为2(n-k)+2*(n-1)*(k-1)=2nlog2(n+1)-4log2(n+1)+2，时间复杂度O(nlogn)
// 空间复杂度O(1)