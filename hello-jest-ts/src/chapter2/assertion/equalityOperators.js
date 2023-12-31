// == を利用した比較では暗黙的な型変換が発生する
console.log('2' == 2); // true
console.log(true == 1); // true

// === を利用した比較では暗黙的な型変換が発生しない
console.log('2' === 2); // false
console.log(true === 1); // false

// Object.isは暗黙的な型変換が発生せず、NaNと0を特別扱いしない
// ==
console.log(NaN == NaN); // false
console.log(+0 == -0); // true

// ===
console.log(NaN === NaN); // false
console.log(+0 === -0); // true

// Object.is
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0)); // false
