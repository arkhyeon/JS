import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function MessageDetail() {
    const msgData = useLocation().state;
    const navigate = useNavigate();

    const reply = () => {
        navigate("/Message/MessageWrite", { state: msgData });
    };

    return (
        <Container>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={1}>
                        받는 사람
                    </Form.Label>
                    <Col sm={11}>
                        <InputGroup className="mb-3">
                            {msgData.important === 1 ? "중요" : ""}
                            {msgData.writer}
                        </InputGroup>
                    </Col>
                </Form.Group>

                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={1}>
                            메일 타입
                        </Form.Label>
                        {msgData.type === 1 ? "일반" : msgData.type === 2 ? "공지" : "서버"}
                    </Form.Group>
                </fieldset>
                <CKEditor editor={ClassicEditor} data={msgData.contents} disabled config={{ toolbar: [] }} />
                <Form.Group className="mb-3 mt-3">
                    <Col>
                        <Button onClick={reply}>답장</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    width: 80%;
    padding: 30px;
`;

export default MessageDetail;
