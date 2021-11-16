import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodoState } from "../TodoContext";

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

function TodoList() {
    const items = useTodoState();

    return (
        <TodoListBlock>
            <TodoItem items={items} key={items.id} />
        </TodoListBlock>
    );
}

export default TodoList;
