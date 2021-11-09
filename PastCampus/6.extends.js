/**
 * 상속 및 오버라이딩
 */
class Parent {
    name = "Bang";
    hello() {
        console.log("hello", this.name);
    }
}

class Child extends Parent {
    age = 37;

    hello() {
        console.log("hello", this.name, this.age);
    }
}

const p = new Parent();
const c = new Child();
console.log(p, c);

c.hello();
c.name = "Anna";
c.hello();

/**
 * SUPER
 */
class Parent {
    name = "Bang";

    constructor(name) {
        this.name = name;
    }

    hello() {
        console.log("hello", this.name);
    }
}

class Child extends Parent {
    age = 37;

    constructor(name, age) {
        super(name);
        this.age = age;
    }

    hello() {
        console.log("hello", this.name, this.age);
    }
}

const p = new Parent("PArk");
const c = new Child("Ark", 27);
console.log(p, c);

c.hello();
c.name = "Anna";
c.hello();

/**
 * Static 상속
 */

class Parent {
    static age = 37;
}

class Child extends Parent {}

console.log(Parent.age, Child.age);
