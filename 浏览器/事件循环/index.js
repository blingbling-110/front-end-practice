/*
https://html.spec.whatwg.org/multipage/webappapis.html#event-loops
宏任务（Tasks，也称为Task Queue）：规范中没有Macrotasks这一词汇，通常所说的宏任务是指事件循环任务队列中常规的任务
微任务（Microtasks，也称为 Job Queue）：在当前执行栈为空后被立即调度执行的任务
常见的微任务有Promise, MutationObserver, queueMicrotask, process.nextTick（在node中）
*/

// 本轮tick的微任务总是先于下一次tick的宏任务
setTimeout(() => {
    console.log('timer0')
    Promise.resolve().then(() => console.log('promise0'))
})
setTimeout(() => {
    console.log('timer1')
    Promise.resolve().then(() => console.log('promise1'))
})

// 微任务不区分事件类型，按入列顺序执行；宏任务的执行顺序不一定确定（例如RAF）
setTimeout(() => {
    console.log('\n------------------ Task queue & Job queue ------------------\n')

    fetch('https://httpbin.org/post', { method: 'POST' })
        .then(res => res.json())
        .then(console.log)

    requestIdleCallback(() => console.log('requestIdleCallback'))

    requestAnimationFrame(() => console.log('requestAnimationFrame'))

    const interval = setInterval(() => {
        console.log('setInterval')
        clearInterval(interval)
    })

    setTimeout(() => console.log('setTimeout'))

    Promise.resolve().then(() => console.log('promise2')).then(() => console.log('promise3'))

    const node = document.createTextNode('0')
    new MutationObserver(() => console.log('MutationObserver')).observe(node, { characterData: true })
    node.data = '1'

    queueMicrotask(() => console.log('queueMicrotask'))
})