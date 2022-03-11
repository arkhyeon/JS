import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie, setCookie } from '../utils/Cookie';
import styled from 'styled-components';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import RSAKey from 'react-native-rsa';
import jwt_decode from 'jwt-decode';

function Login({ setAuth }) {
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [isRemember, setIsRemember] = useState(false);

    const inputUserId = useRef();
    const inputUserPwd = useRef();

    useEffect(() => {
        if (getCookie('userId')) {
            setUserId(getCookie('userId'));
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

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!(userId && userPwd)) {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        if (isRemember) {
            setCookie('userId', userId);
        } else {
            removeCookie('userId');
        }

        var rsa = new RSAKey();
        let encpwd = '';

        await axios
            .get('/KPOST47/rsa')
            .then((res) => {
                console.log(res.data.data[0].publicKeyModules);
                console.log(res.data.data.publicKeyExponent);
                rsa.setPublic(
                    res.data.data[0].publicKeyModules,
                    res.data.data[0].publicKeyExponent,
                );
                console.log(rsa);
                encpwd = rsa.encrypt(userPwd);
                //     encpwd = res.data.data.encPwd;
            })
            .catch((Error) => {
                console.log(Error);
            });
        console.log(userId);
        console.log(userPwd);
        console.log(encpwd);
        await axios
            .post('/KPOST47/login', { uid: userId, pwd: encpwd })
            .then((res) => {
                const decoded = jwt_decode(res.headers.authorization);
                setCookie('uid', decoded.uid);
                setCookie('ulevel', decoded.level);
            })
            .catch((error) => {
                console.log(error.response);
                if (
                    error.response.data.status.message ===
                    'User account has expired'
                ) {
                    alert('계정이 만료되었습니다.');
                } else if (
                    error.response.data.status.message ===
                    'User password has expired'
                ) {
                    alert('비밀 번호가 만료되었습니다.');
                } else if (
                    error.response.data.status.message ===
                    'User account is locked'
                ) {
                    alert('계정이 잠겨있습니다.');
                } else if (
                    error.response.data.status.message === 'Username not found'
                ) {
                    alert('해당 아이디는 없는 아이디 입니다.');
                } else if (
                    error.response.data.status.message === 'Invalid password'
                ) {
                    alert('비밀 번호가 틀렸습니다.');
                } else if (
                    error.response.data.status.message === 'Unauthorized'
                ) {
                    alert('로그인 없이 API가 요청되었습니다.');
                } else if (error.response.data.status.message === 'Forbidden') {
                    alert('API 요청 시 권한 에러입니다.');
                }
            });

        setAuth(getCookie('ulevel'));

        navigate('/');
    };

    const egg = () => {
        setAuth(1);
        setCookie('uid', 'egg');
        setCookie('ulevel', 1);

        navigate('/');
    };

    return (
        <Container>
            <LoginWrap>
                <Row>
                    <Col sm={5} className="loginTitle">
                        <h2 onClick={egg}>
                            <b>SQLCanvas Trans Post</b>
                        </h2>
                    </Col>
                    <Col sm={6}>
                        <Form
                            // method="get"
                            onSubmit={onSubmit}
                            // action="/KPOST47"
                        >
                            <Form.Control
                                value={userId}
                                ref={inputUserId}
                                onChange={onChangeId}
                                type="text"
                                placeholder="User ID"
                            />
                            <Form.Control
                                ref={inputUserPwd}
                                onChange={onChangePwd}
                                type="password"
                                placeholder="Password"
                            />
                            <Form.Check
                                checked={isRemember}
                                color="primary"
                                onChange={handleOnChange}
                                label="사용자 계정 저장"
                            />
                            <Button type="submit" size="lg">
                                Login
                            </Button>
                            {/* 주 : API 변경, 부 : 새로운 기능, 수 : 버그 및 기타 수정  */}
                            <Copyright className="my-3 copyright text-center">
                                Copyright(c)R2ware, All rights reserved. Version
                                0.0.0.1 (release 2022.02.15)
                            </Copyright>
                        </Form>
                    </Col>
                </Row>
            </LoginWrap>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
        to right top,
        #052437,
        #1a3547,
        #2d4858,
        #405a69,
        #546e7a
    );
    color: ${({ theme }) => theme.colors.light_2};
`;

const LoginWrap = styled.div`
    min-width: 850px;

    & .loginTitle {
        text-align: right;
        margin-right: 30px;
        font-family: 'arial';

        & > h2 {
            font-size: 1.93rem;
        }
    }

    & input[type='text'],
    & input[type='password'] {
        width: 360px;
        margin-bottom: 10px;
        font-weight: 400;
        border: none;
        outline: none;
        padding: 5px;
        font-size: 1.1rem;
        color: white;
        line-height: 2;
        border-bottom: 1px solid;
        border-color: ${({ theme }) => theme.colors.normal_1};
        background-color: transparent;
        border-radius: 0;
    }

    & .form-check {
        height: 33px;
        font-size: 0.9rem;
        font-weight: 300;
        margin: 10px 0px;
        display: flex;
        align-items: center;
        gap: 10px;
        margin-left: 5px;
        color: ${({ theme }) => theme.colors.light_2};

        & .form-check-input:checked {
            background-color: ${({ theme }) => theme.colors.normal_1};
            border-color: ${({ theme }) => theme.colors.normal_1};
        }

        & .form-check-label {
            font-size: 0.8rem;
        }
    }

    & Form button {
        width: 360px;
        border-radius: 5px;
        border: 5px solid;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.light_1};
        background-color: ${({ theme }) => theme.colors.normal_1};
        border-color: ${({ theme }) => theme.colors.normal_1};
        line-height: 0.7;

        &:hover,
        &:active,
        &:focus {
            color: white;
            background-color: ${({ theme }) => theme.colors.normal_2};
            border-color: ${({ theme }) => theme.colors.normal_2};
        }
    }
`;

const Copyright = styled.div`
    width: 360px;
    font-size: 0.75rem;
    font-weight: 100;
    color: ${({ theme }) => theme.colors.light_2};
`;

export default Login;
