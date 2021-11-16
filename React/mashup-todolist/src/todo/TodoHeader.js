import React, { useMemo } from "react";
import { useTodoState } from "../TodoContext";
import "./TodoHeadBlock.scss";

function countActiveItems(items) {
    console.log("활성 사용자 수를 세는중...");
    return items.filter((item) => item.done).length;
}

function TodoHeader() {
    const state = useTodoState();
    const count = useMemo(() => countActiveItems(state), [state]);

    const Today = new Date();
    const week = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <div className="TodoHeadBlock">
            <h1>
                {Today.getFullYear()}년 {Today.getMonth()}월 {Today.getDate()}일
            </h1>
            <div className="day">{week[Today.getDay()]}요일</div>
            <div className="tasks-left">할 일 {count}개 남음</div>
        </div>
    );
}

export default TodoHeader;
