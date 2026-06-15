// test3-edgecases.js — constructs a buggy minifier could break: regex,
// try/catch/finally, JSON round-trips, operator precedence, optional chaining.
(function () {
  try {
    // Regex with capture groups, flags and escapes
    const re = /(\d{4})-(\d{2})-(\d{2})/;
    const m = "2026-06-15".match(re);

    // String methods
    const padded = "7".padStart(3, "0");
    const trimmed = "  hi  ".trim();
    const replaced = "a-b-c".replace(/-/g, "_");

    // try / catch / finally
    let finallyRan = false;
    let caught = "";
    try {
      throw new Error("boom");
    } catch (e) {
      caught = e.message;
    } finally {
      finallyRan = true;
    }

    // JSON round-trip
    const obj = { n: 1, s: "x", arr: [true, null, 2] };
    const round = JSON.parse(JSON.stringify(obj));

    // Operator precedence & bitwise (must survive minification untouched)
    const precedence = 2 + 3 * 4 - 1;     // 13
    const bitwise = (5 & 3) | (8 >> 1);   // 1 | 4 = 5
    const float = 0.1 + 0.2;              // 0.30000000000000004

    // Short-circuit, nullish coalescing, optional chaining
    const nullish = null ?? "fallback";
    const optional = obj?.missing?.deep ?? "safe";

    // Comma operator & labelled loop
    let product = 1;
    outer: for (let i = 1; i < 5; i++) {
      for (let j = 1; j < 5; j++) {
        product *= 2;
        if (i * j >= 6) break outer;
      }
    }

    window.__result = {
      match: m ? [m[1], m[2], m[3]] : null,  // ["2026", "06", "15"]
      padded,                                // "007"
      trimmed,                               // "hi"
      replaced,                              // "a_b_c"
      caught,                                // "boom"
      finallyRan,                            // true
      round,                                 // deep-equal copy of obj
      precedence,                            // 13
      bitwise,                               // 5
      float,                                 // 0.30000000000000004
      nullish,                               // "fallback"
      optional,                              // "safe"
      product,                               // 8
    };
  } catch (e) {
    window.__error = String(e);
  }
})();
