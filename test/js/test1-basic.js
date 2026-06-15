// test1-basic.js — core language features: arithmetic, control flow, closures.
// Each test file computes a deterministic result and assigns it to
// window.__result (or window.__error on failure). The test runner loads the
// original and the minified version side by side and asserts the results match.
(function () {
  try {
    function add(a, b) { return a + b; }
    function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); }

    function makeCounter() {
      let count = 0;
      return function () { return ++count; };
    }

    const counter = makeCounter();
    counter();
    counter();

    let sum = 0;
    for (let i = 1; i <= 10; i++) sum += i;

    const evens = [];
    for (const n of [1, 2, 3, 4, 5, 6]) {
      if (n % 2 === 0) evens.push(n);
    }

    const labelFor = (score) => {
      switch (true) {
        case score >= 90: return "A";
        case score >= 80: return "B";
        default: return "C";
      }
    };

    window.__result = {
      add: add(2, 3),                 // 5
      factorial: factorial(5),        // 120
      counter: counter(),             // 3 (closure preserved state)
      sum,                            // 55
      evens,                          // [2, 4, 6]
      ternary: 5 > 3 ? "yes" : "no",  // "yes"
      grade: labelFor(85),            // "B"
    };
  } catch (e) {
    window.__error = String(e);
  }
})();
