/**
 * 앞이 F면 앞 앞이 T면 뒤
 * let c = c === true ? a || b;
 * return c;
 * => return a || b;
 */
console.log(true && "hello");
console.log(false && "hello");
console.log("hello" && "bye");

/**
 * 1 || 2 = 앞이 F면 뒤 앞이 T면 앞
 * F || F = 2
 * F || T = 2
 * T || F = 1
 * T || T = 1
 *
 */
console.log("" || 0);
console.log(0 || "");
console.log(0 || undefined);
console.log(4 || 23);
