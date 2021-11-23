import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const axios = require("axios");
const LoginHead = styled.div`
    width: 100%;
    background: url("http://192.168.10.26:8080/Trans4.7/image/login/login_bg.png");
    background-size: contain;
    text-align: center;
`;
const LoginMain = styled.div`
    width: 950px;
    height: 600px;
    background: url("http://192.168.10.26:8080/Trans4.7/image/login/login_img.png");
    margin: 30px auto;
`;
const LoginWrap = styled.div`
    width: 250px;
    height: 160px;
    margin: 0 auto;
`;
const LoginIdInput = styled.input`
    width: 250px;
    height: 35px;
    margin-top: 210px;
    font-size: 14px;
`;
const LoginPwdInput = styled.input`
    width: 250px;
    height: 35px;
    margin-top: 10px;
    font-size: 14px;
`;
const LoginBtn = styled.button`
    width: 253px;
    height: 40px;
    background: url(http://192.168.10.26:8080/Trans4.7/image/login/login_bg.png);
    border: none;
    background-size: cover;
    color: white;
    border-radius: 5px;
    margin-top: 10px;
    background-repeat: no-repeat;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
`;
const LoginSaveId = styled.input`
    margin-top: 10px;
    margin-right: 5px;
    position: relative;
    top: 1px;
    cursor: pointer;
`;
const LoginSaveIdLabel = styled.label`
    cursor: pointer;
`;

// function a(id, pwd) {
//     axios
//         .get("Trans4.7/app_info/test_sample.jsp?id=" + id + "&pwd=" + pwd)
//         .then(function (response) {
//             alert(response.data.trim() + "성공");
//             console.log(response.data.trim());
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

function Login({ history }) {
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

        loginCheck(userId, userPwd);
    };

    const onKeyPressPwd = (e) => {
        if (e.charCode === 13) {
            onSubmit(e);
        }
    };

    async function loginCheck(id, pwd) {
        try {
            const res = await axios.get(
                process.env.REACT_APP_DB_HOST +
                    "/Trans4.7/app_info/test_sample.jsp?id=" +
                    id +
                    "&pwd=" +
                    pwd,
                {
                    crossDomain: true,
                }
            );
            console.log(res);
            if (res.data === 1) {
                alert("로그인 성공");
                navigate("/main");
            } else {
                alert("Login Check : " + res.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <LoginHead>
                <img
                    src="http://192.168.10.26:8080/Trans4.7/image/login/login_01.png"
                    alt=""
                />
            </LoginHead>
            <LoginMain>
                <LoginWrap>
                    <form method="get" onSubmit={onSubmit}>
                        <LoginIdInput
                            className="login-input"
                            type={"text"}
                            placeholder="아이디"
                            userId={userId}
                            onChange={onChangeId}
                        />
                        <LoginPwdInput
                            className="login-input"
                            type={"password"}
                            placeholder="비밀번호"
                            userPwd={userPwd}
                            onChange={onChangePwd}
                            onKeyPress={onKeyPressPwd}
                        />
                        <LoginBtn>로그인</LoginBtn>
                        <LoginSaveId id="login-save-id" type={"checkbox"} />
                        <LoginSaveIdLabel htmlFor="login-save-id">
                            사용자 계정 저장
                        </LoginSaveIdLabel>
                    </form>
                </LoginWrap>
            </LoginMain>
        </>
    );
}

export default Login;
