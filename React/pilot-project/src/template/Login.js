import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie, getCookie, removeCookie } from '../utils/Cookie';
import styled from 'styled-components';
import { Button, Col, Form, Row } from 'react-bootstrap';

function Login({ getAuth, getUserAuth }) {
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

    const onSubmit = (e) => {
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

        getAuth(userId);
        sessionStorage.setItem('user_id', userId);
        getUserAuth(userId === 'admin' ? 0 : 1);
        sessionStorage.setItem('userAuth', userId === 'admin' ? 0 : 1);

        navigate('/');
    };

    return (
        <Container>
            <LoginWrap>
                <Row>
                    <Col sm={5} className="loginTitle">
                        <h2>
                            <b>SQLCanvas Trans Post</b>
                        </h2>
                    </Col>
                    <Col sm={6}>
                        <Form method="get" onSubmit={onSubmit}>
                            <Form.Control value={userId} ref={inputUserId} onChange={onChangeId} type="text" placeholder="User ID" />
                            <Form.Control ref={inputUserPwd} onChange={onChangePwd} type="password" placeholder="Password" />
                            <Form.Check checked={isRemember} color="primary" onChange={handleOnChange} label="사용자 계정 저장" />
                            <Button type="submit" size="lg">
                                Login
                            </Button>
                            <Copyright className="mt-3 mb-3 copyright text-center">Copyright(c)R2ware, All rights reserved. SQLCanvas Trans Pilot</Copyright>
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
    background-image: linear-gradient(to right top, #052437, #1a3547, #2d4858, #405a69, #546e7a);
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
