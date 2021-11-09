function person(name) {
    this.eyes = 2;
    this.nose = 1;
    this.name = name;
}

const a = new person("kim");

const b = new person("park");

console.log(a, b);

function person1(name) {
    this.name = name;
}
person1.prototype.eyes = 2;
person1.prototype.nose = 1;

const c = new person1("kim");
const d = new person1("park");

console.log(c, d);

//prototype은 모든 객체가 공유하고 있어서 한 번만 만들어지지만,
//this에 넣은 것은 객체 하나를 만들 때마다 메소드도 하나씩 만들어지기 때문에 불필요한 메모리 낭비가 발생한다.
