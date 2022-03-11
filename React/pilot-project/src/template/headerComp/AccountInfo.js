import React from 'react';
import { Button, Form, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AccountInfo = ({ toggleAccount, setToggleAccount, getAuth }) => {
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        e.target.formBasic.value = 'Hello';
    };

    const onHandleLogout = () => {
        getAuth(null);
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('userAuth');
        navigate('/');
    };

    return (
        <Offcanvas
            show={toggleAccount}
            onHide={setToggleAccount}
            placement="end"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>계정 설정</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <hr />
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>로그인 ID</Form.Label>
                        <Form.Control type="text" placeholder="로그인 ID" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword1">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control type="password" placeholder="비밀번호" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                        <Form.Label>신규 비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="신규비밀번호"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        비밀번호 변경
                    </Button>
                </Form>
                <hr />
                <Button onClick={() => onHandleLogout()} variant="primary">
                    로그아웃
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default AccountInfo;
