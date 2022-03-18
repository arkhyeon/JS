import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { WhiteButton } from "../../component/button/R2wButton";

function MessageDetail() {
    const msgData = useLocation().state;
    const navigate = useNavigate();

    const reply = () => {
        navigate('/Message/MessageWrite', { state: msgData });
    };

    const deleteMsg = () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }
        axios
            .delete(process.env.REACT_APP_DB_HOST + '/Messages/' + msgData.id)
            .then(() => {
                navigate('/Message/MessageReceive');
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    return (
        <Container>
            <Form>
                <Col>
                    <WhiteButton onClick={reply}>답장</WhiteButton>
                    <WhiteButton onClick={deleteMsg}>삭제</WhiteButton>
                </Col>
                <Form.Group as={Row} className="msgInfo">
                    <Form.Label sm={1}>
                        받는 사람 : &nbsp;
                        <Form.Label> {msgData.writer}</Form.Label>
                    </Form.Label>
                    <Form.Label sm={1}>
                        메일 타입 : &nbsp;
                        <Form.Label>
                            {' '}
                            {msgData.type === 1
                                ? '일반'
                                : msgData.type === 2
                                ? '공지'
                                : '서버'}
                        </Form.Label>
                    </Form.Label>
                </Form.Group>
                <CKEditor
                    editor={ClassicEditor}
                    data={msgData.contents}
                    disabled
                    config={{ toolbar: [] }}
                />
            </Form>
        </Container>
    );
}

const Container = styled.div`
    width: 80%;

    & button {
        height: 33px;
        margin-right: 7px;
    }

    & .ck-editor__editable {
        min-height: 580px;
        max-height: 580px;
        padding-left: 0px;
        border: none;
    }

    & .ck.ck-reset_all {
        display: none;
    }

    & .msgInfo {
        border-top: 1px solid ${({ theme }) => theme.colors.gray_2};
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray_2};
        padding: 10px 0 0;
        margin: 15px 0px 0px 0px;
    }
    & .form-label {
        font-size: 0.875rem;
        font-weight: bold;
        padding-right: 0px;
        &:first-child {
            margin-bottom: 5px;
        }
        & .form-label {
            font-weight: 400;
        }
    }
`;

export default MessageDetail;
