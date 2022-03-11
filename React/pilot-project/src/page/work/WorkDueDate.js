import React, { useEffect, useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko/index.js';
import styled from 'styled-components';
import moment from 'moment';
import { NormalButton, WhiteButton } from '../../component/button/R2wButton';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import DraggableModal from '../../utils/DraggableModal';

registerLocale('ko', ko);

function WorkDueDate({ show, setShowDueDate, open }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [refDate, setRefDate] = useState(new Date());
    const [ckeditorData, setCkeditorData] = useState('');

    useEffect(() => {
        if (open) {
            getStartDate();
        }
    }, [open]);

    const getStartDate = () => {
        axios
            .get(process.env.REACT_APP_DB_HOST + '/IsOpen')
            .then((res) => {
                setStartDate(new Date(res.data.startDate));
                setRefDate(new Date(res.data.refDate));
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const sendNotice = () => {
        //TODO : 보낼대상 전체? 선택?
        const noiceText = open
            ? `[마감 공지] ${moment(startDate).format('yyyy-MM-DD')}~${moment(
                  endDate,
              ).format('yyyy-MM-DD')} (기준일 : ${moment(refDate).format(
                  'yyyy-MM-DD',
              )}) 업무가 마감되었습니다.\n`
            : `[개시 공지] ${moment(startDate).format('yyyy-MM-DD')}~${moment(
                  endDate,
              ).format('yyyy-MM-DD')} (기준일 : ${moment(refDate).format(
                  'yyyy-MM-DD',
              )}) 업무가 개시되었습니다.\n`;

        axios.patch(process.env.REACT_APP_DB_HOST + '/IsOpen', {
            startDate: moment(startDate).format('yyyy-MM-DD'),
            endDate: moment(endDate).format('yyyy-MM-DD'),
            refDate: moment(refDate).format('yyyy-MM-DD'),
            open: !open,
        });

        axios
            .post(process.env.REACT_APP_DB_HOST + '/Messages', {
                type: 2,
                writer: 'admin',
                date: moment().format('yyyy-MM-DD HH:mm'),
                contents: noiceText + ckeditorData,
                receiver: 'user',
                read: 1,
            })
            .then(() => {
                setShowDueDate(false);
                alert(noiceText);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    return (
        <Modal dialogAs={DraggableModal} show={show} onHide={setShowDueDate}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {open ? '마감 공지' : '개시 공지'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body spellCheck="false">
                <GridContainer>
                    <Row>
                        <Form.Label column sm={2}>
                            개시일
                        </Form.Label>
                        <Col sm={10}>
                            <DatePicker
                                className="form-control"
                                selected={startDate}
                                dateFormat="yyyy-MM-dd"
                                disabled={true}
                            />
                        </Col>

                        <Form.Label column sm={2}>
                            마감일
                        </Form.Label>
                        <Col sm={10}>
                            <DatePicker
                                className="form-control"
                                locale="ko"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                dateFormat="yyyy-MM-dd"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                onChangeRaw={(e) => e.preventDefault()}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                disabled={open}
                            />
                        </Col>
                        <Form.Label column sm={2}>
                            기준일
                        </Form.Label>
                        <Col sm={10}>
                            <DatePicker
                                className="form-control"
                                locale="ko"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                dateFormat="yyyy-MM-dd"
                                selected={refDate}
                                onChange={(date) => setRefDate(date)}
                                onChangeRaw={(e) => e.preventDefault()}
                                disabled={open}
                            />
                        </Col>
                    </Row>
                    <CKEditor
                        editor={ClassicEditor}
                        onChange={(event, editor) => {
                            setCkeditorData(editor.getData());
                        }}
                        config={{
                            toolbar: {
                                items: [
                                    'heading',
                                    '|',
                                    'bold',
                                    'italic',
                                    '|',
                                    'link',
                                    '|',
                                    'undo',
                                    'redo',
                                ],
                            },
                        }}
                    />
                    <Prefix>
                        {open
                            ? '*prefix(ex) : [마감 공지] 개시일~마감일 마감되었습니다.'
                            : '*prefix(ex) : [개시 공지] 개시일~마감일 개시되었습니다.'}
                    </Prefix>
                </GridContainer>
            </Modal.Body>
            <Modal.Footer>
                <ButtonWrap>
                    <WhiteButton onClick={() => setShowDueDate(false)}>
                        닫기
                    </WhiteButton>
                    <NormalButton
                        onClick={() => {
                            sendNotice();
                        }}
                    >
                        확인
                    </NormalButton>
                </ButtonWrap>
            </Modal.Footer>
        </Modal>
    );
}

const GridContainer = styled.div`
    height: 600px;
    & * {
        font-size: 14px;
    }
    & .form-control {
        margin-bottom: 15px;
    }

    & .ck-editor__editable {
        min-height: 385px;
        max-height: 385px;
    }
`;

const ButtonWrap = styled.div`
    & button {
        height: 33px;
        margin-left: 15px;
    }
`;

const Prefix = styled.p`
    font-size: 0.8rem;
    color: #218838;
    margin: 3px 0px;
`;

export default WorkDueDate;
