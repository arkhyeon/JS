function isAnimal(text) {
    return (
        text === "개" ||
        text === "늑대" ||
        text === "거북이" ||
        text === "고양이"
    );
}
function isAnimalSmarter(text) {
    const animals = ["개", "늑대", "거북이", "고양이"];
    return animals.includes(text);
}

console.log(isAnimal("개"));
console.log(isAnimal("냉장고"));
console.log(isAnimalSmarter("개"));
console.log(isAnimalSmarter("냉장고"));

function getSound(animal) {
    if (animal === "개") return "멍멍";
    if (animal === "고양이") return "야옹";
    if (animal === "참새") return "짹짹";
    if (animal === "비둘기") return "구구";
    return "...?";
}

function getSoundSmarter(animal) {
    const sounds = {
        개: "멍멍",
        고양이: "야옹",
        참새: "쨱쨱",
        비둘기: "구구 구",
    };
    return sounds[animal] || "...?";
}

console.log(getSound("개"));
console.log(getSound("인간"));
console.log(getSoundSmarter("개"));
console.log(getSoundSmarter("인간"));
