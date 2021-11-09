class A {
    _name = "no name";

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value + "!!!";
    }
}

const a = new A();

console.log(a);

a.name = "mark";

console.log(a);
console.log(a.name);
console.log(a._name);

class B {
    _name = "no name";

    get name() {
        return this._name + "@@@";
    }
}
const b = new B();
console.log(b);
B.name = "mark";
console.log(b);

//static
class C {
    static age = 37;
    static hello() {
        console.log(C.age);
    }
}
console.log(C);
console.log(C.age);
C.hello();

class D {
    age = 27;
    static hello() {
        console.log(this.age);
    }
}
console.log(D);
console.log(D.age);
D.hello();

//name은 클래스 이름
class E {
    static name = "이 클래스의 이름을 E가 아니다";
}

console.log(E);
