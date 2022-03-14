/*
function* foo() {
    const bar = 1 + 2
    yield 2
    yield 3
}
Babeled:
*/
function foo() {
  var bar;
  return myGenerator(function foo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          bar = 1 + 2;
          _context.next = 3;
          return 2;

        case 3:
          _context.next = 5;
          return 3;

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

/*
可以发现通过 yield 将代码分割成几块
每次执行 next 函数就执行一块代码
并且表明下次需要执行哪块代码
下面简单实现自定义Generator:
*/
function myGenerator(cb) {
    const ctx = {
        next: 0,
        done: false,
        stop: () => {
            !done && (this.done = true)
        }
    }
    return {
        next: () => {
            const value = cb(ctx)
            return {
                value,
                done: ctx.done
            }
        }
    }
}

const g = foo()
console.log(g.next())
console.log(g.next())
console.log(g.next())