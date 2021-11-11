const c = {
    name: "mark",
    hello1() {
        console.log("1", this);
    },
    hello2: function () {
        console.log("2", this);
    },
    hello3: () => {
        //this에 접근 못함.
        console.log("3", this);
    },
};

console.log(c);
c.hello1();
c.hello2();
c.hello3();
