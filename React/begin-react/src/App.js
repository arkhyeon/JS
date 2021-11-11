import Hello from "./Hello";
import Wrapper from "./Wrapper";
import Counter from "./Counter";
import InputSample from "./inputSample";
import UserList from "./UserList";
import React, { useState, useRef } from "react";
import CreateUser from "./CreateUser";

function App() {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
    });
    const { username, email } = inputs;
    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };
    const [users, setUsers] = useState([
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
    ]);
    const nextId = useRef(4);

    const onCreate = () => {
        const user = {
            id: nextId.current,
            username,
            email,
            //...inputs 동일
        };
        // setUsers([...users, user]);
        setUsers(users.concat(user));
        setInputs({
            username: "",
            email: "",
        });
        nextId.current++;
    };

    const onRemove = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const onToggle = (id) => {
        setUsers(
            users.map((user) =>
                user.id === id ? { ...user, active: !user.active } : user
            )
        );
    };

    return (
        <>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
            <Counter />
            <InputSample />
        </>
    );
}

export default App;
