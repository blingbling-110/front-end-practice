console.log(`
typeof undefined: ${typeof undefined}
typeof null: ${typeof null}
typeof false: ${typeof false}
typeof 0: ${typeof 0}
typeof 0n: ${typeof 0n}
typeof '': ${typeof ''}
typeof Symbol(): ${typeof Symbol()}
typeof {}: ${typeof {}}
typeof console.log: ${typeof console.log}
typeof NaN: ${typeof NaN}
NaN === NaN: ${NaN === NaN}
Object.is(NaN, NaN): ${Object.is(NaN, NaN)}
Number.isNaN(NaN): ${Number.isNaN(NaN)}
[] == ![]: ${[] == ![]}
`)