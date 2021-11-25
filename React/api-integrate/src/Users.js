import React, { useState } from "react";
import User from "./User";
import { getUsers, useUserDispatch, useUsersState } from "./UsersContext";

function Users() {
    const [userId, setUserId] = useState(null);
    const state = useUsersState();
    const dispatch = useUserDispatch();

    const { loading, data: users, error } = state.users;
    const fetchData = () => {
        getUsers(dispatch);
    };
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>Error</div>;
    if (!users) return <button onClick={fetchData}>불러오기</button>;

    return (
        <>
            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => setUserId(user.id)}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchData}>다시 불러오기</button>
            {userId && <User id={userId} />}
        </>
    );
}

export default Users;
