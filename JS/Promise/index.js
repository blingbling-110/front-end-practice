// 状态常量
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

// 自定义Promise
class MyPromise {
    // 实例的状态
    state = PENDING
    // 实例的结果
    result
    // 解决回调队列
    resolveQueue = []
    // 拒绝回调队列
    rejectQueue = []

    // 接收执行器(resolve, reject) => {}
    constructor(fn) {
        // 需要捕获错误
        try {
            fn(this.resolve, this.reject)
        } catch (reason) {
            // 发生错误则拒绝
            this.reject(reason)
        }
    }

    // 解决函数
    resolve = value => {
        if (value instanceof MyPromise) {
            // 若嵌套Promise则递归解决
            return value.then(this.resolve, this.reject)
        }
        if (this.state !== PENDING) {
            return
        }
        // 异步执行，否则回调可能还没入列Promise就已经落定了
        setTimeout(() => {
            this.state = RESOLVED
            this.result = value
            this.resolveQueue.forEach(cb => cb())
        })
    }

    // 拒绝函数
    reject = reason => {
        if (this.state !== PENDING) {
            return
        }
        setTimeout(() => {
            this.state = REJECTED
            this.result = reason
            this.rejectQueue.forEach(cb => cb())
        })
    }

    // 排期函数
    then(onResolved, onRejected) {
        // 必须返回新的Promise实例
        let newPromise
        switch (this.state) {
            case PENDING:
                newPromise = new MyPromise((resolve, reject) => {
                    this.resolveQueue.push(() => {
                        try {
                            // 解决回调和拒绝回调均为可选参数，若不是函数则透传
                            if (typeof onResolved !== 'function') {
                                resolve(this.result)
                            } else {
                                this.handleRes(onResolved(this.result), newPromise)
                            }
                        } catch (reason) {
                            reject(reason)
                        }
                    })
                    this.rejectQueue.push(() => {
                        try {
                            if (typeof onRejected !== 'function') {
                                reject(this.result)
                            } else {
                                this.handleRes(onRejected(this.result), newPromise)
                            }
                        } catch (reason) {
                            reject(reason)
                        }
                    })
                })
                break;
            case RESOLVED:
                // 异步执行排期回调
                newPromise = new MyPromise((resolve, reject) => setTimeout(() => {
                    try {
                        if (typeof onResolved !== 'function') {
                            resolve(this.result)
                        } else {
                            this.handleRes(onResolved(this.result), newPromise)
                        }
                    } catch (reason) {
                        reject(reason)
                    }
                }))
                break;
            case REJECTED:
                newPromise = new MyPromise((_, reject) => setTimeout(() => {
                    try {
                        if (typeof onRejected !== 'function') {
                            reject(this.result)
                        } else {
                            this.handleRes(onRejected(this.result), newPromise)
                        }
                    } catch (reason) {
                        reject(reason)
                    }
                }))
                break;
            default:
                break;
        }
        return newPromise
    }

    // 处理排期回调结果
    handleRes(newResult, newPromise) {
        if (newResult === newPromise) {
            // 若回调执行结果和then()需要返回的Promise实例相同，则出现循环引用
            return newPromise.reject(new TypeError('There is a reference circle'))
        }
        if (newResult instanceof MyPromise) {
            // 回调执行结果可能为Promise实例
            if (newResult.state === PENDING) {
                // 若状态为待定则继续排期，直到某个Promise实例落定
                newResult.then(value => this.handleRes(value, newPromise), newPromise.reject)
            } else {
                // 若状态为落定则将newPromise落定
                newResult.then(newPromise.resolve, newPromise.reject)
            }
            return
        }
        if (newResult !== null && (typeof newResult === 'object' || typeof newResult === 'function')) {
            // 若排期结果为对象或函数，则调用thenable接口，若未实现thenable接口则直接解决
            // 确保在result不为Promise实例但实现thenable接口时只执行一次resolve或reject（模拟Promise状态机）
            let called = false
            try {
                let then = newResult.then
                if (typeof then === 'function') {
                    // 调用thenable接口
                    then.call(newResult, value => {
                        if (called) {
                            return
                        } else {
                            called = true
                            this.handleRes(value, newPromise)
                        }
                    }, reason => {
                        if (called) {
                            return
                        } else {
                            called = true
                            newPromise.reject(reason)
                        }
                    })
                } else {
                    // 未实现thenable接口，直接解决
                    newPromise.resolve(newResult)
                }
            } catch (reason) {
                if (called) {
                    return
                } else {
                    called = true
                    newPromise.reject(reason)
                }
            }
        } else {
            // 若排期结果为基本类型，则直接解决
            newPromise.resolve(newResult)
        }
    }

    // promises-aplus-tests
    static deferred() {
        const res = {}
        res.promise = new MyPromise((resolve, reject) => {
            res.resolve = resolve
            res.reject = reject
        })
        return res
    }

    // 语法糖
    catch = onRejected => this.then(null, onRejected)

    finally = onFinally => this.then(onFinally, onFinally)

    // 静态方法
    static resolve = value => {
        if (value instanceof MyPromise) {
            return value
        } else {
            return new MyPromise(resolve => resolve(value))
        }
    }

    static reject = reason => new MyPromise((_, reject) => reject(reason))

    static all = promiseList => new MyPromise((resolve, reject) => {
        // 判断入参是否可迭代
        if (promiseList === undefined ||
            promiseList === null ||
            typeof promiseList[Symbol.iterator] !== 'function') {
            throw new TypeError(`${promiseList} is not iterable`)
        }
        const len = promiseList.length
        if (len === 0) {
            // 若入参为空的可迭代对象则返回空数组
            resolve([])
        }
        const res = []
        let count = 0;
        // 给列表中每个promise排期，注意需要用Promise.resolve包裹
        [].forEach.call(promiseList, (promise, index) => MyPromise.resolve(promise).then(value => {
            res[index] = value
            if (++count === len) {
                // 等到所有promise实例解决之后才解决
                resolve(res)
            }
        }, reject)) // 只要有一个promise实例拒绝则立即拒绝
    })

    static race = promiseList => new MyPromise((resolve, reject) => {
        if (promiseList === undefined ||
            promiseList === null ||
            typeof promiseList[Symbol.iterator] !== 'function') {
            throw new TypeError(`${promiseList} is not iterable`)
        }
        if (promiseList.length === 0) {
            return
        }
        // 只要有promise实例落定就落定
        [].forEach.call(promiseList, promise => MyPromise.resolve(promise).then(resolve, reject))
    })

    static allSettled = promiseList => new MyPromise(resolve => {
        if (promiseList === undefined ||
            promiseList === null ||
            typeof promiseList[Symbol.iterator] !== 'function') {
            throw new TypeError(`${promiseList} is not iterable`)
        }
        const len = promiseList.length
        if (len === 0) {
            resolve([])
        }
        const res = []
        let count = 0;
        [].forEach.call(promiseList, (promise, index) => MyPromise.resolve(promise).then(value => {
            res[index] = { status: 'fulfilled', value }
            if (++count === len) {
                resolve(res)
            }
        }, reason => {
            // 拒绝也纳入最终的结果
            res[index] = { status: 'rejected', reason }
            if (++count === len) {
                // 始终等到所有promise实例落定之后解决
                resolve(res)
            }
        }))
    })

    static any = promiseList => new MyPromise((resolve, reject) => {
        if (promiseList === undefined ||
            promiseList === null ||
            typeof promiseList[Symbol.iterator] !== 'function') {
            throw new TypeError(`${promiseList} is not iterable`)
        }
        const len = promiseList.length
        if (len === 0) {
            // 若入参为空的可迭代对象则拒绝
            reject(new AggregateError([], 'All promises were rejected'))
        }
        const res = []
        let count = 0;
        // 只要有一个promise实例解决则立即解决
        [].forEach.call(promiseList, (promise, index) => MyPromise.resolve(promise).then(resolve, reason => {
            res[index] = reason
            if (++count === len) {
                // 等到所有promise实例拒绝之后才拒绝
                reject(new AggregateError(res, 'All promises were rejected'))
            }
        }))
    })
}

module.exports = MyPromise