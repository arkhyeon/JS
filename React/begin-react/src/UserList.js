import React, { useEffect } from "react";

const User = React.memo(function User({ user, onRemove, onToggle }) {
    const { username, email, id, active } = user;

    //특정 값이 update된 이후 나타남.
    //부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링 됨.
    useEffect(() => {
        console.log(user);
        //뒷정리 함수 업데이트되기 직전에 호출 됨.
        return () => {
            console.log(user);
        };
    }, [user]);

    return (
        <div>
            <b
                style={{ color: active ? "green" : "black", cursor: "pointer" }}
                onClick={() => onToggle(id)}
            >
                {username}
            </b>
            &nbsp;
            <span>({email})</span>
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    );
});

function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
            {users.map((user) => (
                //key: 누구랑 연결되어 있는지(효율적 렌더링)
                <User
                    user={user}
                    key={user.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}

export default React.memo(
    UserList,
    (prevProps, nextProps) => nextProps.users === prevProps.users
);
