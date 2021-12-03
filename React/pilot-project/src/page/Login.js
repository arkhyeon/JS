import React, { useState } from "react";
import "../App.scss";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function Login({ getAuth }) {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [userPwd, setUserPwd] = useState("");

    const onChangeId = (e) => {
        setUserId(e.target.value);
    };
    const onChangePwd = (e) => {
        setUserPwd(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!userId && !userPwd) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }
        getAuth(userId);
        sessionStorage.setItem("user_id", userId);
        const time = new Date();
        const today = {
            year: time.getFullYear(),
            month: time.getMonth() + 1,
            date: time.getDate() > 10 ? time.getDate() : "0" + time.getDate(),
            hours: time.getHours(),
            minutes:
                time.getMinutes() > 10
                    ? time.getMinutes()
                    : "0" + time.getMinutes(),
            second:
                time.getSeconds() > 10
                    ? time.getSeconds()
                    : "0" + time.getSeconds(),
        };

        sessionStorage.setItem(
            "loginTime",
            `${today.year}-${today.month}-${today.date} ${today.hours}:${today.minutes}:${today.second}`
        );
        navigate("/");
    };

    const onKeyPressPwd = (e) => {
        if (e.charCode === 13) {
            onSubmit(e);
        }
    };

    return (
        <>
            <div className="container">
                <div className="loginWrap">
                    <h1 data-split="SQL Canvas">SQL Canvas</h1>
                    <form method="get" onSubmit={onSubmit}>
                        <input
                            className="login-input"
                            type={"text"}
                            placeholder="아이디"
                            onChange={onChangeId}
                        />
                        <input
                            className="login-input"
                            type={"password"}
                            placeholder="비밀번호"
                            onChange={onChangePwd}
                            onKeyPress={onKeyPressPwd}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="사용자 계정 저장"
                        />
                        <button className="loginBtn">로그인</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
