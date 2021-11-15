import { useState, useCallback, useReducer } from "react";

function reducer(state, action) {
    //Change
    //Reset
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                [action.name]: action.value,
            };
        case "RESET":
            return Object.keys(state).reduce((acc, current) => {
                acc[current] = "";
                return acc;
            }, {});
        default:
            return state;
    }
}
//useReducer
function useInputs(initialForm) {
    const [form, dispatch] = useReducer(reducer, initialForm);

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        dispatch({
            type: "CHANGE",
            name: name,
            value: value,
        });
    }, []);

    const reset = useCallback(() => dispatch({ type: "RESET" }), []);

    return [form, onChange, reset];
}

//useState
// function useInputs(initialForm) {
//     const [form, setForm] = useState(initialForm);
//     // change
//     const onChange = useCallback((e) => {
//         const { name, value } = e.target;
//         setForm((form) => ({ ...form, [name]: value }));
//     }, []);
//     const reset = useCallback(() => setForm(initialForm), [initialForm]);
//     return [form, onChange, reset];
// }

export default useInputs;
