//멤버변수
class A {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

console.log(new A("Mark", 37));

class B {
    name;
    age;
}

console.log(new B());

class C {
    name = "no name";
    age = 0;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

console.log(new C("mark", 37));

//멤버 함수

class D {
    hello1() {
        console.log("hellog1");
    }

    hello2 = () => {
        console.log("hello2", this);
    };
}

new D().hello1();
new D().hello2();

class E {
    name = "mark";

    hello() {
        console.log("hello", this.name);
    }
}

new E().hello();
