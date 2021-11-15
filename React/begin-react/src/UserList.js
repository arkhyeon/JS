import React, { useEffect, useContext } from "react";
import { UserDispatch } from "./Reducer";
const User = React.memo(function User({ user }) {
    const { username, email, id, active } = user;
    const dispatch = useContext(UserDispatch);

    //특정 값이 update된 이후 나타남.
    //부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링 됨.
    useEffect(() => {
        // console.log(user);
        //뒷정리 함수 업데이트되기 직전에 호출 됨.
        return () => {
            // console.log(user);
        };
    }, [user]);

    return (
        <div>
            <b
                style={{ color: active ? "green" : "black", cursor: "pointer" }}
                onClick={() => dispatch({ type: "TOGGLE_USER", id })}
            >
                {username}
            </b>
            &nbsp;
            <span>({email})</span>
            <button onClick={() => dispatch({ type: "REMOVE_USER", id })}>
                삭제
            </button>
        </div>
    );
});

function UserList({ users }) {
    return (
        <div>
            {users.map((user) => (
                //key: 누구랑 연결되어 있는지(효율적 렌더링)
                <User user={user} key={user.id} />
            ))}
        </div>
    );
}

export default React.memo(
    UserList,
    (prevProps, nextProps) => nextProps.users === prevProps.users
);
