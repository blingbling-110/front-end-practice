import { func0, func1 } from './module0.mjs'
import func from './module1.mjs'

func0()
func1()
func()

// ESM加载CJS
// TODO Uncaught SyntaxError: The requested module '../CJS/index.js' does not provide an export named 'default'
// import cjs from '../CJS/index.js'
// console.log(cjs)