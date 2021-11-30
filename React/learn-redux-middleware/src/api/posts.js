const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

//{ id, title, body }
const posts = [
    {
        id: 1,
        title: "Redux Middleware",
        body: "리덕스 미들웨어를 직접 만들어보기",
    },
    {
        id: 2,
        title: "Redux Thunk",
        body: "redux thunk play",
    },
    {
        id: 3,
        title: "Redux saga",
        body: "redux saga play",
    },
];

export const getPosts = async () => {
    await sleep(500);
    return posts;
};

export const getPostById = async (id) => {
    await sleep(500);
    return posts.find((post) => post.id === id);
};
