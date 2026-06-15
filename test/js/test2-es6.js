// test2-es6.js — modern ECMAScript syntax: arrow functions, destructuring,
// template literals, spread, classes, Map/Set, default parameters.
(function () {
  try {
    const square = (x) => x * x;

    const { a, b = 10 } = { a: 1 };
    const [first, ...rest] = [1, 2, 3, 4];

    const name = "minifyJS";
    const greeting = `Hello, ${name}! ${square(4)}`;

    const merged = { ...{ x: 1 }, ...{ y: 2 } };

    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      get magnitude() {
        return Math.hypot(this.x, this.y);
      }
      toArray() {
        return [this.x, this.y];
      }
    }
    const p = new Point(3, 4);

    const set = new Set([1, 1, 2, 3, 3]);
    const map = new Map([["k", "v"]]);

    const doubled = [1, 2, 3].map((n) => n * 2).filter((n) => n > 2);

    window.__result = {
      square: square(5),          // 25
      a,                          // 1
      defaultDestructure: b,      // 10
      first,                      // 1
      rest,                       // [2, 3, 4]
      greeting,                   // "Hello, minifyJS! 16"
      merged,                     // { x: 1, y: 2 }
      magnitude: p.magnitude,     // 5
      point: p.toArray(),         // [3, 4]
      setSize: set.size,          // 3
      mapValue: map.get("k"),     // "v"
      doubled,                    // [4, 6]
    };
  } catch (e) {
    window.__error = String(e);
  }
})();
