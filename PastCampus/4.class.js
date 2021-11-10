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
const btest = new B();
btest.name = "a";
btest.age = 24;
console.log(btest);
console.log(new B());

//기본값 설정
class C {
    name = "no name";
    age = 0;

    constructor(name, age) {
        //name이 없으면 기본값으로 설장
        this.name = name || this.name;
        this.age = age;
    }
}
console.log(new C());
console.log(new C("mark", 37));

//멤버 함수
class D {
    hello1() {
        console.log("hello1");
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

//static
/**
 * 정적 메서드는 클래스의 종속적인 메서드를 의미한다
 * 즉, 클래스와 해당 메서드는 연결되어 있지만,
 * 해당 클래스의 특정 인스턴스와는 연결되어있지 않다.
 * 그래서 정적메서드는 특정 객체(클래스)에 저장된 데이터에 접근할 수 없다.
 *
 * 정적 메서드는 클래스의 인스턴스(new) 없이 호출이 가능하기에,
 * 보통 유틸리티 함수를 만드는데 사용된다.
 */
class F {
    static age = 37;
    static hello() {
        console.log(F.age);
    }
}
console.log(F); //[class C] { age: 37 }
console.log(F.age); //37
F.hello(); //37

class G {
    age = 27;
    static hello() {
        console.log(this.age);
    }

    static hello2 = () => {
        console.log(new G()); //G { age: 27 }
        console.log(G.age);
        console.log(this.age);
    };
}
console.log(G); //[class D]
console.log(G.age); //undefined
G.hello(); //undefined
G.hello2(); //undefined

//name은 클래스 이름 변경
class H {
    static name = "이 클래스의 이름을 E가 아니다";
}
//[class 이 클래스의 이름을 E가 아니다] { name: '이 클래스의 이름을 E가 아니다' }
console.log(H);
