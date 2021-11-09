const exam = () => {
    console.log("function");
};

exam();

const hello = (name) => {
    console.log("hello", name);
};

const hello2 = (name) => {
    return `hello2 ${name}`;
};

hello("bang");
hello("Joo");

const sum = new Function("a", "b", "c", "d", "return a+b+c+d");

console.log(sum(1, 2, 3, 4));

global.a = 0;

{
    const a = 1;
    const test = new Function("return a");

    console.log(test());
}

{
    const a = 2;
    const test = function () {
        return a;
    };

    console.log(test());
}

const hello3 = (name) => `hello3 ${name}`;

console.log(hello3("a"));

function Person(name, age) {
    this.name = name;
    this.age = age;
}

const p = new Person("mark", 35);

const e = new Person("Ana", 26);

console.log(`${p.name} a ${e.age}`);

function plus(base) {
    return function (num) {
        return base + num;
    };
}

const plus5 = plus(5);
console.log(plus5(10));

function hello4(c) {
    console.log("hello");
    c();
}

hello4(function () {
    console.log("callback");
});
