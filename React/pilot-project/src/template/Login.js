import React, { useEffect, useRef, useState } from "react";
import "../scss/login.scss";
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie, removeCookie } from "../utils/Cookie";

function Login({ getAuth, getUserAuth }) {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [isRemember, setIsRemember] = useState(false);

    const inputUserId = useRef();
    const inputUserPwd = useRef();

    useEffect(() => {
        if (getCookie("userId")) {
            setUserId(getCookie("userId"));
            setIsRemember(true);
            inputUserPwd.current.focus();
        } else {
            inputUserId.current.focus();
        }
    }, []);

    const onChangeId = (e) => {
        setUserId(e.target.value);
    };
    const onChangePwd = (e) => {
        setUserPwd(e.target.value);
    };
    const handleOnChange = (e) => {
        setIsRemember(e.target.checked);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!(userId && userPwd)) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        if (isRemember) {
            setCookie("userId", userId);
        } else {
            removeCookie("userId");
        }

        getAuth(userId);
        sessionStorage.setItem("user_id", userId);
        getUserAuth(userId === "admin" ? 0 : 1);
        sessionStorage.setItem("userAuth", userId === "admin" ? 0 : 1);

        navigate("/");
    };

    return (
        <>
            <div className="loginWrap">
                <main className="form-signin">
                    <form method="get" onSubmit={onSubmit}>
                        <h3 className="login-logo">
                            <b>SQLCanvas Trans</b> <span className="h4">Pilot</span>
                        </h3>
                        <input value={userId} type={"text"} onChange={onChangeId} ref={inputUserId} className="form-control" placeholder="ID" />
                        <input type={"password"} onChange={onChangePwd} ref={inputUserPwd} className="form-control" placeholder="Password" />
                        <div className="my-3 mx-auto text-center">
                            <label>
                                <input type="checkbox" checked={isRemember} color="primary" onChange={handleOnChange} />
                                <span className="text-muted-w">사용자 계정 저장</span>
                            </label>
                        </div>
                        <button className="w-100 btn btn-lg btn-graygreen" type="submit">
                            Login
                        </button>
                    </form>
                    <div className="mt-3 mb-3 copyright text-center">Copyright(c)R2ware, All rights reserved. SQLCanvas Trans Pilot</div>
                </main>
            </div>
        </>
    );
}

export default Login;
