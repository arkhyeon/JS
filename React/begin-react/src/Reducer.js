import UserList from "./UserList";
import produce from "immer";
import React, {
    useReducer,
    useRef,
    useMemo,
    useCallback,
    createContext,
} from "react";
import CreateUser from "./CreateUser";
import useInputs from "./hooks/useInput";
function countActiveUsers(users) {
    console.log("활성 사용자 수를 세는중...");
    return users.filter((user) => user.active).length;
}

const initialState = {
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

//간단할 것 같으면 userState, 아니면 useReducer
function reducer(state, action) {
    switch (action.type) {
        case "CREATE_USER":
            //immer
            return produce(state, (draft) => {
                draft.users.push(action.user);
            });
        //Common
        // return {
        //     inputs: initialState.inputs,
        //     users: state.users.concat(action.user),
        // };
        case "TOGGLE_USER":
            //immer
            return produce(state, (draft) => {
                const user = draft.users.find((user) => user.id === action.id);
                user.active = !user.active;
            });
        //Common
        // return {
        //     ...state,
        //     users: state.users.map((user) =>
        //         user.id === action.id
        //             ? { ...user, active: !user.active }
        //             : user
        //     ),
        // };
        case "REMOVE_USER":
            //immer
            return produce(state, (draft) => {
                const index = draft.users.findIndex(
                    (user) => user.id === action.id
                );
                draft.users.splice(index, 1);
            });
        //Common
        // return {
        //     ...state,
        //     users: state.users.filter((user) => user.id !== action.id),
        // };
        default:
            throw new Error("default Error");
    }
}

export const UserDispatch = createContext(null);

function Reducer() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { users } = state;

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <UserDispatch.Provider value={dispatch}>
            <CreateUser />
            <UserList users={users} />
            <div>활성 사용자 수 : {count} </div>
        </UserDispatch.Provider>
    );
}

export default Reducer;
