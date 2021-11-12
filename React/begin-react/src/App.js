import Counter from "./Counter";
import InputSample from "./inputSample";
import UserList from "./UserList";
import React, { useState, useRef, useMemo, useCallback } from "react";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
    console.log("활성 사용자 수를 세는중...");
    return users.filter((user) => user.active).length;
}

function App() {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
    });
    const { username, email } = inputs;
    const onChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setInputs({
                ...inputs,
                [name]: value,
            });
        },
        [inputs]
    );
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

    const onCreate = useCallback(() => {
        const user = {
            id: nextId.current,
            username,
            email,
            //...inputs 동일
        };
        // setUsers([...users, user]);
        setUsers((users) => users.concat(user));
        setInputs({
            username: "",
            email: "",
        });
        nextId.current++;
    }, [email, username]);

    const onRemove = useCallback((id) => {
        setUsers((users) => users.filter((user) => user.id !== id));
    });

    const onToggle = useCallback((id) => {
        setUsers((users) =>
            users.map((user) =>
                user.id === id ? { ...user, active: !user.active } : user
            )
        );
    });

    //모든 변화에 함수를 호출하기에 useMemo를 사용하여 users에 변화가 있을 때만 호출
    /**
     * 첫번째 인수에는 함수, 두번째 인수에는 배열을 넣어주면 된다.
        두번째 인수에 넣어준 배열의 값이 바뀔때만 함수가 실행된다.
        그렇지 않다면 이전의 값을 재사용한다.
     */
    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
            <div>활성 사용자 수 : {count} </div>
            <Counter />
            <InputSample />
        </>
    );
}

export default App;
