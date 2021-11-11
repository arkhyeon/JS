/**
 * 이렇게 기존 객체를 복사하여 새로운 객체에 업데이트 작업을 하는 것을 "불변성을 지킨다" 는 것이다.

불변성을 지켜줘야만 리액트가 컴포넌트의 상태가 업데이트 됐음을 감지할 수 있고 

필요한 부분만을 리렌더링 할 수 있기 때문이다.

기존 상태를 직접 수정하는 경우 리렌더링이 되지 않는다.
 */

import React, { useState, useRef } from "react";

function InputSample() {
    const [inputs, setInputs] = useState({
        name: "",
        nickname: "",
    });
    const nameInput = useRef();
    const { name, nickname } = inputs;

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const onReset = () => {
        setInputs({
            name: "",
            nickname: "",
        });
        nameInput.current.focus();
    };

    return (
        <div>
            <input
                name="name"
                placeholder="이름"
                onChange={onChange}
                value={name}
                ref={nameInput}
            />
            <input
                name="nickname"
                placeholder="닉네임"
                onChange={onChange}
                value={nickname}
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;
