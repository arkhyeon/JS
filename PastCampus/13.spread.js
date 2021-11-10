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
