import UserList from "./UserList";
import React, { useReducer, useRef, useMemo, useCallback } from "react";
import CreateUser from "./CreateUser";

const initialState = {
    inputs: {
        username: "",
        email: "",
    },
    users: [
        {
            id: 1,
            username: "bang",
            email: "arkhyeon@naver.com",
            active: true,
        },
        {
            id: 2,
            username: "test",
            email: "test@naver.com",
            active: false,
        },
        {
            id: 3,
            username: "admin",
            email: "admin@naver.com",
            active: false,
        },
    ],
};

function reducer(state, action) {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value,
                },
            };
        case "CREATE_USER":
            return {
                inputs: initialState.inputs,
                users: state.users.concat(action.user),
            };
        case "TOGGLE_USER":
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.id
                        ? { ...user, active: !user.active }
                        : user
                ),
            };
        case "REMOVE_USER":
            return {
                ...state,
                users: state.userfilter((user) => user.id !== action.id),
            };
        default:
            throw new Error("default Error");
    }
}

function CustomHook() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);
    const { users } = state;
    const { username, email } = state.inputs;

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        dispatch({
            type: "CHANGE_INPUT",
            name,
            value,
        });
    }, []);

    const onCreate = useCallback(() => {
        dispatch({
            type: "CREATE_USER",
            user: {
                id: nextId.current,
                username,
                email,
            },
        });
        nextId.current++;
    }, [username, email]);

    const onToggle = useCallback((id) => {
        dispatch({
            type: "TOGGLE_USER",
            id,
        });
    }, []);
    return (
        <>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} />
            <div>활성 사용자 수 : 0 </div>
        </>
    );
}

export default CustomHook;
