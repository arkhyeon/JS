const todos = [
    {
        id: 1,
        text: "JS 입문",
        done: true,
    },
    {
        id: 2,
        text: "함수 배우기",
        done: true,
    },
    {
        id: 3,
        text: "객체 배열",
        done: true,
    },
    {
        id: 4,
        text: "내장함수",
        done: false,
    },
];

const taskNotDone = todos.filter((todo) => todo.done);
console.log(taskNotDone);
