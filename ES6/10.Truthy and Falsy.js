/**
 * 객체나 값이 비었거나 정상적인 값이 아닐 것 같을 때
 *
 * if(Person == undefined || Person == null || Person ==""){}
 * => if(!Person){}
 */

//all True
console.log(!undefined);
console.log(!null);
console.log(!0);
console.log(!"");
console.log(!NaN);
console.log(!false);

const a = 1;
const b = null;
if (!b) {
    //True
    console.log("TF");
}

/**
 * !부정 !! 이중부정
 * 객체가 True일 때 True를 반환할 수 있게 해준다.
 * !!1 => True
 */
const truthy = !!a;

console.log(truthy);
