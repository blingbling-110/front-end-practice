// 顺序取决于性能，因为定时器的最小调度为1ms。若在1ms内进入tick就会先执行setImmediate；否则会先执行timer
setTimeout(()=>console.log('timer'))
setImmediate(()=>console.log('immediate'))