const slime = {
    name: "슬라임",
};
const cuteSlime = {
    ...slime,
    attribute: "cute",
};
const purpleCuteSlime = {
    ...cuteSlime,
    color: "purple",
};
const greenCuteSlime = {
    ...purpleCuteSlime,
    color: "green",
};

console.log(slime);
console.log(cuteSlime);
console.log(purpleCuteSlime);
console.log(greenCuteSlime);

const animals = ["개", "고양이", "참새"];
const anotherAnimals = [...animals, "늑대"];
const anotherAnimalsAndAnimals = [...animals, "늑대", ...animals];

console.log(animals);
console.log(anotherAnimals);
console.log(anotherAnimalsAndAnimals);

const dog = {
    breed: "dog",
    age: 14,
    color: "black",
};
//const { ...cat, breed}는 불가
const { breed, ...cat } = dog;
console.log(breed);
console.log(cat);

const numbers = [0, 1, 2, 3, 4, 5, 6];

const [a, b, ...rest] = numbers;

console.log(a);
console.log(b);
console.log(rest);

function sum(a, b, c, d, e, f, g) {
    let result = 0;

    if (a) result += a;
    if (b) result += b;
    if (c) result += c;
    if (d) result += d;
    if (e) result += e;
    if (f) result += f;
    if (g) result += g;

    return result;
}

function sumRestReduce(...rest) {
    return rest.reduce((acc, current) => acc + current, 0);
}

console.log(sum(1, 2, 3, 4, 5, 6, 7));
console.log(sumRestReduce(1, 2, 3, 4, 5, 6, 7, 8, 9));

function subtract(x, y) {
    return x - y;
}

const num = [1, 2];
//동일하게 나옴.
const result1 = subtract(1, 2);
console.log(result1);
const result2 = subtract(num[0], num[1]);
console.log(result2);
const result3 = subtract(...num);
console.log(result3);
