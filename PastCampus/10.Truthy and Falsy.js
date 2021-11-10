//Truthy and Falsy
console.log(!undefined);
console.log(!null);
console.log(!0);
console.log(!"");
console.log(!NaN);
console.log(!false);

const a = 1;
const b = null;
if (!b) {
    console.log("TF");
}

const truthy = !!a;

console.log(truthy);
