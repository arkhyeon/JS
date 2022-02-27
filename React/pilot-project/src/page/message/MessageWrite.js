import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import MessageAddress from './MessageAddress';
import axios from 'axios';
import { NormalButton, WhiteButton } from '../../component/button/R2wButton';
import { FaAddressBook } from 'react-icons/fa';
import { GrayRadioButton } from '../../component/radio/R2wRadioButton';

function MessageWrite() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showAddress, setShowAddress] = useState(false);
    const [showCCAddress, setShowCCAddress] = useState(false);
    const [compWriter, setCompWriter] = useState([]);
    const [carbonCopy, setCarbonCopy] = useState([]);
    const [ckeditorData, setCkeditorData] = useState('');
    const [userList, setUserList] = useState([]);
    const [groupList, setGroupList] = useState([]);

    useEffect(() => {
        getAddress();
        setCompWriter((arr) => (location.state ? [...arr, location.state.writer] : []));
    }, [location.state]);

    const getAddress = () => {
        axios
            .get(process.env.REACT_APP_DB_HOST + '/Users')
            .then((res) => {
                setUserList(res.data);
                setGroupList(res.data.filter((arr, index, callback) => index === callback.findIndex((t) => t.group === arr.group)));
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const sendMessage = (e) => {
        e.preventDefault();

        if (!ckeditorData) {
            alert('내용을 작성해주세요.');
            return;
        }

        let today = new Date(); // today 객체에 Date()의 결과를 넣어줬다
        let time = {
            year: today.getFullYear(), //현재 년도
            month: today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1, // 현재 월
            date: today.getDate() < 10 ? '0' + today.getDate() : today.getDate(), // 현제 날짜
            hours: today.getHours() < 10 ? '0' + today.getHours() : today.getHours(), //현재 시간
            minutes: today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes(), //현재 분
        };
        let timestring = `${time.year}-${time.month}-${time.date} ${time.hours}:${time.minutes}`;
        //TODO : 참조구분 N개로 돌리면 메일이 여러개 생기는 문제
        // - 작성자도 여러명으로 넣어버리면 어떨까
        for (let i = 0; i < compWriter.length; i++) {
            axios
                .post(process.env.REACT_APP_DB_HOST + '/Messages', {
                    type: e.target.elements.msgType[0].checked ? 1 : 2,
                    writer: 'admin',
                    date: timestring,
                    contents: ckeditorData,
                    receiver: compWriter[i],
                    read: 1,
                })
                .catch((error) => {
                    console.log(error);
                    return;
                });
        }
        alert('메시지를 전송했습니다.');
        navigate('/Message/MessageReceive');
    };

    const createReceiverBox = (e, setReceiverBox, receiverBox) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            //input에 공백을 여러개 작성해도 한개로 처리하기에 삭제가 안 됨.
            let thisValue = e.target.value.replace(/(\s*)/g, '');
            if (thisValue) {
                setReceiverBox(receiverBox.filter((rb) => rb !== thisValue));
                setReceiverBox((originArr) => [...originArr, thisValue]);
            }
            e.target.value = '';
        }
    };

    const createDataList = () => {
        return (
            <>
                {userList.map((ul) => {
                    return <option className="ad" key={ul.name} value={ul.name} />;
                })}
                {groupList.map((gl) => {
                    return <option key={gl.group} value={gl.group} />;
                })}
            </>
        );
    };

    return (
        <Container>
            <Form onSubmit={sendMessage} spellcheck="false">
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={1}>
                        받는 사람
                    </Form.Label>
                    <Col sm={11}>
                        <InputGroup>
                            <WriterWrap style={{ border: compWriter.length !== 0 ? '1px solid #ced4da' : '' }}>
                                {compWriter.map((cw) => {
                                    return (
                                        <WriterSpan key={cw} onClick={(e) => setCompWriter(compWriter.filter((cw) => cw !== e.target.innerText))}>
                                            {cw}
                                        </WriterSpan>
                                    );
                                })}
                            </WriterWrap>
                            <FormControl
                                list="writerGroup"
                                autocomplete="off"
                                onKeyPress={(e) => {
                                    createReceiverBox(e, setCompWriter, compWriter);
                                }}
                                style={{
                                    borderLeft: compWriter.length !== 0 ? 'none' : '1px solid #ced4da',
                                    borderRadius: compWriter.length !== 0 ? '0' : '5px 0px 0px 5px',
                                }}
                            />
                            <datalist id="writerGroup">{createDataList()}</datalist>
                            <NormalButton
                                id="button-addon1"
                                type="button"
                                onClick={() => {
                                    setShowAddress(true);
                                }}
                            >
                                <FaAddressBook />
                            </NormalButton>
                        </InputGroup>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={1}>
                        참조
                    </Form.Label>
                    <Col sm={11}>
                        <InputGroup>
                            <WriterWrap style={{ border: carbonCopy.length !== 0 ? '1px solid #ced4da' : '' }}>
                                {carbonCopy.map((cc) => {
                                    return (
                                        <WriterSpan key={cc} onClick={(e) => setCarbonCopy(carbonCopy.filter((cc) => cc !== e.target.innerText))}>
                                            {cc}
                                        </WriterSpan>
                                    );
                                })}
                            </WriterWrap>
                            <FormControl
                                list="ccGroup"
                                autocomplete="off"
                                onKeyPress={(e) => {
                                    createReceiverBox(e, setCarbonCopy, carbonCopy);
                                }}
                                style={{
                                    borderLeft: carbonCopy.length !== 0 ? 'none' : '1px solid #ced4da',
                                    borderRadius: carbonCopy.length !== 0 ? '0' : '5px 0px 0px 5px',
                                }}
                            />
                            <datalist id="ccGroup">{createDataList()}</datalist>
                            <NormalButton
                                id="button-addon1"
                                type="button"
                                onClick={() => {
                                    setShowCCAddress(true);
                                }}
                            >
                                <FaAddressBook />
                            </NormalButton>
                        </InputGroup>
                    </Col>
                </Form.Group>
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
                            <WhiteButton type="submit">보내기</WhiteButton>
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
                <MessageAddress show={showAddress} setShowAddress={setShowAddress} setAddress={setCompWriter} userList={userList} />
                <MessageAddress show={showCCAddress} setShowAddress={setShowCCAddress} setAddress={setCarbonCopy} userList={userList} />
            </Form>
        </Container>
    );
}

const Container = styled.div`
    & .form-control {
        line-height: 1.188;
    }

    & .ck-editor__editable {
        min-height: 617px;
        max-height: 617px;
    }

    & .col-form-label {
        font-size: 0.875rem;
    }
    & .row {
        margin-bottom: 15px;
        max-width: 1250px;
    }
    & .ck {
        max-width: 1250px;
    }
    & fieldset {
        & .col-sm-9 {
            display: flex;
            align-items: center;
            font-size: 0.9rem;
        }
        & button {
            height: 36px;
            float: right;
        }
    }

    input::-webkit-calendar-picker-indicator {
        opacity: 0;
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
