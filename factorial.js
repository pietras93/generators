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

// Usage:
let [...a] = factorial(1) // -> [ 1 ]
let [...b] = factorial(6) // -> [ 1, 2, 6, 24, 120, 720 ]

// Errors:
let [...c] = factorial(-2) // -> [ Error: n is negative ... ]
let [...d] = factorial('s') // -> [ Error: n is not a number ... ]