import React, { useEffect } from "react";
import { useUserDispatch, useUsersState, getUser } from "./UsersContext";

function User({ id }) {
    const state = useUsersState();
    const dispatch = useUserDispatch();

    const { loading, data: user, error } = state.user;

    useEffect(() => {
        getUser(dispatch, id);
    }, [dispatch, id]);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러 발생..</div>;
    if (!user) return null;
    return (
        <div>
            <h2>{user.username}</h2>
            <p>
                <b>Email : </b>
                {user.email}
            </p>
        </div>
    );
}

export default User;
