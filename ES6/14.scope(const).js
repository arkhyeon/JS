/**
 * const와 let block scope로 선언 됨
 * var function scope로 선언 됨
 */

const val = "global";

function scope() {
    const val = "function";
    if (true) {
        const val = "block";
        console.log("block scope : ");
        console.log(val); //block
    }
    console.log("function scope : ");
    console.log(val); //function
}
scope();
console.log("global scope : ");
console.log(val); //global

var val1 = "global";

function scope1() {
    var val1 = "function";
    if (true) {
        var val1 = "block";
        console.log("block scope : ");
        console.log(val1); //block
    }
    console.log("function scope : ");
    console.log(val1); //block
}
scope1();
console.log("global scope : ");
console.log(val1); // global
