import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import MessageAddress from './MessageAddress';
import axios from 'axios';
import { NormalButton, WhiteButton } from '../../component/button/R2wButton';
import { MdSend } from 'react-icons/md';
import { GrayRadioButton } from '../../component/radio/R2wRadioButton';

function MessageWrite() {
    const location = useLocation();
    const [showAddress, setShowAddress] = useState(false);
    const [compWriter, setCompWriter] = useState([]);
    const [ckeditorData, setCkeditorData] = useState('');
    useEffect(() => {
        // setWriter(location.state ? location.state.writer : "");
        setCompWriter((arr) => (location.state ? [...arr, location.state.writer] : []));
    }, [location.state]);

    const removeCompWriter = (e) => {
        setCompWriter(compWriter.filter((cw) => cw !== e.target.innerText));
    };

    const sendMessage = (e) => {
        e.preventDefault();
        let today = new Date(); // today 객체에 Date()의 결과를 넣어줬다
        let time = {
            year: today.getFullYear(), //현재 년도
            month: today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1, // 현재 월
            date: today.getDate() < 10 ? '0' + today.getDate() : today.getDate(), // 현제 날짜
            hours: today.getHours() < 10 ? '0' + today.getHours() : today.getHours(), //현재 시간
            minutes: today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes(), //현재 분
        };
        let timestring = `${time.year}-${time.month}-${time.date} ${time.hours}:${time.minutes}`;

        for (let i = 0; i < compWriter.length; i++) {
            axios.post(process.env.REACT_APP_DB_HOST + '/Messages', {
                type: e.target.elements.msgType[0].checked ? 1 : 2,
                writer: 'admin',
                date: timestring,
                contents: ckeditorData,
                receiver: compWriter[i],
                read: 1,
            });
        }
    };

    return (
        <Container>
            <Form onSubmit={sendMessage}>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={1}>
                        받는 사람
                    </Form.Label>
                    <Col sm={11}>
                        <InputGroup>
                            <WriterWrap style={{ border: compWriter.length !== 0 ? '1px solid #ced4da' : '' }}>
                                {compWriter.map((cw) => {
                                    return (
                                        <WriterSpan key={cw} onClick={removeCompWriter}>
                                            {cw}
                                        </WriterSpan>
                                    );
                                })}
                            </WriterWrap>
                            <FormControl
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        //input에 공백을 여러개 작성해도 한개로 처리하기에 삭제가 안 됨.
                                        let thisValue = e.target.value.replace(/(\s*)/g, '');
                                        if (thisValue) {
                                            setCompWriter(compWriter.filter((cw) => cw !== thisValue));
                                            setCompWriter((arr) => [...arr, thisValue]);
                                        }
                                        e.target.value = '';
                                    }
                                }}
                                style={{
                                    borderLeft: compWriter.length !== 0 ? 'none' : '1px solid #ced4da',
                                    borderRadius: compWriter.length !== 0 ? '0' : '5px 0px 0px 5px',
                                }}
                            />
                            <NormalButton
                                id="button-addon1"
                                onClick={() => {
                                    setShowAddress(true);
                                }}
                            >
                                주소록
                            </NormalButton>
                        </InputGroup>
                    </Col>
                </Form.Group>
                <hr />
                <fieldset>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={1}>
                            메일 타입
                        </Form.Label>
                        <Col sm={9}>
                            <GrayRadioButton id={'normal'} label={'일반'} name={'msgType'} checked={true} />
                            <GrayRadioButton id={'notice'} label={'공지'} name={'msgType'} />
                        </Col>
                        <Col sm={2}>
                            <WhiteButton type="submit">
                                보내기
                                <MdSend />
                            </WhiteButton>
                        </Col>
                    </Form.Group>
                </fieldset>
                <CKEditor
                    editor={ClassicEditor}
                    data={ckeditorData}
                    onChange={(event, editor) => {
                        setCkeditorData(editor.getData());
                    }}
                    config={{
                        toolbar: {
                            items: ['heading', '|', 'bold', 'italic', '|', 'link', '|', 'undo', 'redo'],
                        },
                    }}
                />
                <MessageAddress show={showAddress} setShowAddress={setShowAddress} setCompWriter={setCompWriter} />
            </Form>
        </Container>
    );
}

const Container = styled.div`
    width: 80%;

    & .form-control {
        line-height: 1.188;
    }

    & hr {
        margin: 15px 0px;
    }

    & .ck-editor__editable {
        min-height: 580px;
        max-height: 580px;
    }

    & .col-form-label {
        font-size: 0.875rem;
    }

    & fieldset {
        margin-bottom: 15px;
        & .col-sm-9 {
            display: flex;
            align-items: center;
            font-size: 0.9rem;
        }
        & button {
            height: 36px;
            float: right;
            & svg {
                font-size: 16px;
            }
        }
    }
`;

const WriterWrap = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    border-radius: 5px;
`;

const WriterSpan = styled.span`
    height: 24px;
    padding: 0px 5px;
    margin-left: 5px;
    font-size: 0.875rem;
    text-align: center;
    line-height: 24px;
    display: block;
    background-color: ${({ theme }) => theme.colors.normal_3};
    color: ${({ theme }) => theme.colors.light_1};
    border-radius: 3px;
    cursor: pointer;
    color: white;
`;
export default MessageWrite;
