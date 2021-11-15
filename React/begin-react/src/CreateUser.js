import React, { useContext, useRef, useCallback } from "react";
import { UserDispatch } from "./Reducer";
import useInputs from "./hooks/useInput";

function CreateUser() {
    const dispatch = useContext(UserDispatch);
    const [form, onChange, reset] = useInputs({ username: "", email: "" });
    const { username, email } = form;
    const nextId = useRef(4);
    const nameInput = useRef();

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
        reset();
        nameInput.current.focus();
    }, [dispatch, username, email, reset]);

    return (
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}
                ref={nameInput}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default React.memo(CreateUser);
