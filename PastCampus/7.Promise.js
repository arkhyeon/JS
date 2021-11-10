/**
 * new Promise() => Pending
 * or => resolve => then
 * or => reject => catch [Error]
 * => finally
 */

/**
 * Resolve Then
 */
const p = new Promise((resolve, reject) => {
    /**pending 대기상태 */
    setTimeout(() => {
        resolve(); //이행된 상태
    }, 1000);

    // reject(); //거부 상태
});

p.then(() => {
    /** 콜백작성 */
    console.log("1000ms 후에 시작");
});

/**
 * Reject Catch
 */
function p() {
    return new Promise((resolve, reject) => {
        /**pending 대기상태 */
        setTimeout(() => {
            reject(); //거부 상태
        }, 1000);
    });
}

p()
    .then(() => {
        console.log("1000ms 후 실행");
    })
    .catch(() => {
        //실행
        console.log("1000ms rejected");
    });

/**
 * Resolve MSG
 */
function p() {
    return new Promise((resolve, reject) => {
        /**pending 대기상태 */
        setTimeout(() => {
            resolve("hello"); //거부 상태
        }, 1000);
    });
}

p()
    .then((msg) => {
        console.log("1000ms 후 실행", msg);
    })
    .catch(() => {
        console.log("1000ms rejected");
    });

/**
 * Reject Reason MSG
 */
function p() {
    return new Promise((resolve, reject) => {
        /**pending 대기상태 */
        setTimeout(() => {
            reject("error"); //거부 상태
        }, 1000);
    });
}

p()
    .then((msg) => {
        console.log("1000ms 후 실행", msg);
    })
    .catch((reason) => {
        console.log("1000ms rejected", reason);
    });

/**
 * Reject Error
 */
function p() {
    return new Promise((resolve, reject) => {
        /**pending 대기상태 */
        setTimeout(() => {
            reject(new Error("Ban")); //거부 상태
        }, 1000);
    });
}

p()
    .then((msg) => {
        console.log("1000ms 후 실행", msg);
    })
    .catch((error) => {
        console.log("1000ms rejected", error);
    });

/**
 * Finally
 */
function p() {
    return new Promise((resolve, reject) => {
        /**pending 대기상태 */
        setTimeout(() => {
            reject(new Error("Ban")); //거부 상태
        }, 1000);
    });
}

p()
    .then((msg) => {
        console.log("1000ms 후 실행", msg);
    })
    .catch((error) => {
        console.log("1000ms rejected", error);
    })
    .finally(() => {
        console.log("end");
    });

/**
 * CallBack Function
 */
function p() {
    return new Promise((resolve, reject) => {
        /**pending 대기상태 */
        setTimeout(() => {
            resolve(); //거부 상태
        }, 1000);
    });
}

p()
    .then(() => {
        return p();
    })
    .then(() => p())
    .then(() => p())
    .then(p)
    .then(() => {
        console.log("4000ms 후 실행");
    });

Promise.resolve(
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("foo");
        }, 1000);
    })
).then((data) => {
    console.log("프로미스 객체인 경우, resolve된 결과 받아 then이 실행", data);
});

Promise.resolve("bar").then((data) => {
    console.log(data);
});

Promise.reject(new Error("reason"))
    .then((error) => {})
    .catch((error) => {
        console.log(error);
    });

/**
 * Promise All
 */

function p(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    });
}

Promise.all([p(1000), p(2000), p(3000)]).then((msg) => {
    console.log("모두 실행된 이후 ", msg);
});

/**
 * Promise race([프로미스 객체들])
 */

function p(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    });
}

Promise.race([p(1000), p(2000), p(3000)]).then((msg) => {
    console.log("가장 빠른게 실행된 이후 ", msg);
});

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

async function getUser1() {
    await delay(3000);
    return "cjaesung";
}

async function getUser2() {
    await delay(3000);
    return "cjaesung";
}

async function testFn() {
    const user1Promise = getUser1();
    const user2Promise = getUser2();
    const user1 = await user1Promise;
    const user2 = await user2Promise;

    console.log("testFn is finish");
}

testFn();

console.log("finish.");
