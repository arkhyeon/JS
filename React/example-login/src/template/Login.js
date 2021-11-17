import React from "react";
import styled, { css } from "styled-components";

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
const LoginIdInput = styled.input``;
const LoginPwdInput = styled.input``;
const LoginBtn = styled.input``;
const LoginSaveId = styled.input``;
const LoginSaveIdLabel = styled.label``;

function Login() {
    return (
        <>
            <LoginHead>
                <img src="http://192.168.10.26:8080/Trans4.7/image/login/login_01.png" />
            </LoginHead>
            <LoginMain>
                <LoginWrap>
                    <LoginIdInput className="login-input" type={"text"} />
                    <LoginPwdInput className="login-input" type={"text"} />
                    <LoginBtn type={"button"} />
                    <LoginSaveId type={"checkbox"} />
                    <LoginSaveIdLabel />
                </LoginWrap>
            </LoginMain>
        </>
    );
}

export default Login;
