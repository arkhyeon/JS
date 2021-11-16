import React, { useMemo } from "react";
import { useTodoState } from "../TodoContext";
import "./TodoHeadBlock.scss";

function TodoHeader() {
    const state = useTodoState();
    const count = useMemo(
        () => state.filter((item) => item.done).length,
        [state]
    );

    const today = new Date();

    const dateString = today.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const dayName = today.toLocaleString("ko-KR", { weekday: "long" });

    return (
        <div className="TodoHeadBlock">
            <h1>{dateString}</h1>
            <div className="day">{dayName}</div>
            <div className="tasks-left">할 일 {count}개 남음</div>
        </div>
    );
}

export default TodoHeader;
