const dfs = node => {
    let res = []
    if (!node) return res
    res.push(node)
    const children = node.children
    if (children && children.length) {
        for (const child of children) {
            res = [res, ...dfs(child)]
        }
    }
    return res
}

const bfs = node => {
    const res = []
    if (!node) return res
    const queue = [node]
    while (queue.length) {
        const item = queue.shift()
        res.push(item)
        let child = item.firstElementChild
        while (child) {
            queue.push(child)
            child = child.nextElementSibling
        }
    }
    return res
}

const deepCopy = (obj, visited = new WeakMap()) => {
    if (typeof obj !== 'object' || obj === null) return obj
    
    // 检查循环引用
    if (visited.has(obj)) return visited.get(obj)
    
    // 处理特殊对象类型
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (obj instanceof Set) {
        const newSet = new Set()
        visited.set(obj, newSet)
        obj.forEach(value => newSet.add(deepCopy(value, visited)))
        return newSet
    }
    if (obj instanceof Map) {
        const newMap = new Map()
        visited.set(obj, newMap)
        obj.forEach((value, key) => newMap.set(deepCopy(key, visited), deepCopy(value, visited)))
        return newMap
    }
    
    // 创建新对象或数组
    const res = Array.isArray(obj) ? [] : {}
    visited.set(obj, res)
    
    // 递归复制所有可枚举属性
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue
        res[key] = deepCopy(obj[key], visited)
    }
    return res
}

// 你能用bfs实现深拷贝吗？⬅️_⬅️
