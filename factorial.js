/**
 * When iterated returns arrays of factorials of integers from 1 to n
 * @param number n - value to stop at
 */
function* factorial(n) {
  
  n = parseInt(n)
  
  if (isNaN(n)) {
    yield new Error('n is not a number')
    return
  }

  if (n < 0) {
    yield new Error('n is negative')
    return
  }

  if (n === 0) {
    n = 1
  }

  let x = 1
  let m = 0

  while(m < n) {
    x = x * ++m
    yield x
  }
}

/**
 * Wrapper for factorial iterator. It shells out error from array in case n is in wrong format
 */
const Factorial = (n) => {
  
  let [...result] = factorial(n)

  if (typeof result[0] !== 'number') {
    return result[0]
  }

  return result
}

// Usage:
let a = Factorial(1) // -> [ 1 ]
let b = Factorial(6) // -> [ 1, 2, 6, 24, 120, 720 ]

// Errors:
let c = Factorial(-2) // -> Error: n is negative ...
let d = Factorial('s') // -> Error: n is not a number ...