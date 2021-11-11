/**
 * get, set을 이용한 캡슐화 가능
 * 데이터와, 데이터를 처리하는 행위를 묶고, 외부에는 그 행위를 보여주지 않는 것.
 */

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

console.log(a); //A { _name: 'no name' }

a.name = "mark";

console.log(a); //A { _name: 'mark!!!' }
console.log(a.name); //mark!!!
console.log(a._name); //mark!!!

class B {
    _name = "no name";

    get name() {
        return this._name + "@@@";
    }
}
const b = new B();
console.log(b); //B { _name: 'no name' }
B.name = "mark";
console.log(b); //B { _name: 'no name' }
