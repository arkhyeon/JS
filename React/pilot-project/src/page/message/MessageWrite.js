import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import MessageAddress from "./MessageAddress";
import axios from "axios";

function MessageWrite() {
    const location = useLocation();
    const [showAddress, setShowAddress] = useState(false);
    const [compWriter, setCompWriter] = useState([]);
    const [ckeditorData, setCkeditorData] = useState("");
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
            month: today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1, // 현재 월
            date: today.getDate() < 10 ? "0" + today.getDate() : today.getDate(), // 현제 날짜
            hours: today.getHours() < 10 ? "0" + today.getHours() : today.getHours(), //현재 시간
            minutes: today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes(), //현재 분
        };
        let timestring = `${time.year}-${time.month}-${time.date} ${time.hours}:${time.minutes}`;
        console.log(timestring);

        for (let i = 0; i < compWriter.length; i++) {
            axios.post(process.env.REACT_APP_DB_HOST + "/Messages", {
                type: e.target.elements.msgType[0].checked ? 1 : 2,
                important: e.target.elements.importantBtn.checked ? 1 : 0,
                writer: "admin",
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
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={1}>
                        받는 사람
                    </Form.Label>
                    <Col sm={11}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                중요&nbsp;
                                <Form.Check inline type="checkbox" name="importantBtn" />
                            </InputGroup.Text>
                            <WriterWrap>
                                {compWriter.map((cw) => {
                                    return (
                                        <WriterSpan key={cw} onClick={removeCompWriter}>
                                            {cw}
                                        </WriterSpan>
                                    );
                                })}
                            </WriterWrap>
                            <FormControl
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        //input에 공백을 여러개 작성해도 한개로 처리하기에 삭제가 안 됨.
                                        let thisValue = e.target.value.replace(/(\s*)/g, "");
                                        if (thisValue) {
                                            setCompWriter(compWriter.filter((cw) => cw !== thisValue));
                                            setCompWriter((arr) => [...arr, thisValue]);
                                        }
                                        e.target.value = "";
                                    }
                                }}
                                style={{ borderLeft: 0 }}
                            />
                            <Button
                                variant="outline-primary"
                                id="button-addon1"
                                onClick={() => {
                                    setShowAddress(true);
                                }}
                            >
                                주소록
                            </Button>
                        </InputGroup>
                    </Col>
                </Form.Group>

                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={1}>
                            메일 타입
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check inline type="radio" label="일반" name="msgType" id="normal" defaultChecked />
                            <Form.Check inline type="radio" label="공지" name="msgType" id="notice" />
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
                            items: ["heading", "|", "bold", "italic", "|", "link", "|", "undo", "redo"],
                        },
                    }}
                />
                <Form.Group className="mb-3 mt-3">
                    <Col>
                        <Button type="submit">보내기</Button>
                    </Col>
                </Form.Group>
                <MessageAddress show={showAddress} setShowAddress={setShowAddress} setCompWriter={setCompWriter} />
            </Form>
        </Container>
    );
}

const Container = styled.div`
    width: 80%;
    padding: 30px;
`;

const WriterWrap = styled.div`
    background-color: white;
    border: 1px solid #ced4da;
    display: flex;
    align-items: center;
`;

const WriterSpan = styled.span`
    height: 20px;
    padding: 3px 6px;
    margin-left: 3px;
    font-size: 12px;
    text-align: center;
    line-height: 17px;
    display: block;
    background-color: #0b2444;
    border-radius: 10px;
    cursor: pointer;
    color: white;
`;
export default MessageWrite;
