/**
 * Promise 방식
 */
function p(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
            // reject(new Error("Ban"));
        }, ms);
    });
}

p(1000).then((ms) => {
    console.log(`Promise 방식 ${ms}이후에 실행`);
});

/**
 * async 방식
 * - 객체 반환하는 비동기 함수를 정의함
 * - await 사용할 경우 async 함수 내에서 사용할 것.
 */

/**
 * resolve
 */
(async function main() {
    const ms = await p(1000);
    console.log(`async await${ms}이후에 실행`);
})();

/**
 * reject => try catch
 */
(async function main() {
    try {
        const ms = await p(1000);
        console.log(`async await${ms}이후에 실행`);
    } catch (error) {
        console.log(error);
    }
})();

/**
 * return async resolve
 */
async function asyncP() {
    return "mark";
}

(async function main() {
    try {
        const name = await asyncP();
        console.log(name);
    } catch (error) {
        console.log(error);
    }
})();

/**
 * return async resolve + await
 */
async function asyncP() {
    const ms = await p(1000);
    return "mark" + ms;
}

(async function main() {
    try {
        const name = await asyncP();
        console.log(name); //mark1000
    } catch (error) {
        console.log(error);
    }
})();

/**
 * finally
 */
async function asyncP() {
    const ms = await p(1000);
    return "mark" + ms;
}

(async function main() {
    try {
        const name = await asyncP();
        console.log(name);
    } catch (error) {
        console.log(error);
    } finally {
        console.log("end");
    }
})();

/**
 * 연속된 Promise
 * 연속된 async await
 */

p(1000)
    .then(() => p(1000))
    .then(() => p(1000))
    .then(() => {
        console.log("Promise 3000ms 후에 실행");
    });

(async function main() {
    await p(1000);
    await p(1000);
    await p(1000);
    console.log("async 3000ms 후 실행");
})();

/**
 * Promise all / race
 */

(async function main() {
    const result = await Promise.all([p(1000), p(2000), p(3000)]);
    //마지막
    console.log(result);
})();

(async function main() {
    const result = await Promise.race([p(1000), p(2000), p(3000)]);
    //제일 빠른거
    console.log(result);
})();
