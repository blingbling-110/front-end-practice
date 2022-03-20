/*
https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
*/

const fs = require('fs')

// readFile属于I/O操作，其回调在poll阶段执行，一定会先进入check阶段，然后进入timer阶段
fs.readFile(__filename, () => {
    setTimeout(() => console.log('timer0'))
    setImmediate(() => console.log('immediate'))
})

// 微任务会在各个阶段完成后立即执行，而nextTick会在当前tick结束、下一个tick开始前执行
setTimeout(() => {
    console.log('timer1')
    Promise.resolve().then(() => console.log('promise'))
})
process.nextTick(() => console.log('nextTick'))