import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import styled from 'styled-components';
import WorkSchCycle from './WorkSchCycle';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko/index.js';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { NormalButton, WhiteButton } from '../../../component/button/R2wButton';
import DraggableModal from '../../../utils/DraggableModal';
import axios from 'axios';

registerLocale('ko', ko);

function WorkSchedule({ show, setShowSchedule, editSyncData, getSyncMain }) {
    const ref = useRef();
    const systemGridRef = useRef();
    const [showCycle, setShowCycle] = useState(false);
    const [formData, setFormData] = useState({
        wname: '',
        wdesc: '',
        pattern: '1',
        directRun: false,
        noneEndDt: false,
        start_d: new Date(),
        end_d: new Date(),
        emin: '00',
        ehour: '00',
        emonth: [],
        eday: [],
        ewday: [],
        ewday_no: [],
        system_list: {},
    });

    const {
        wame,
        wesc,
        pattern,
        directRun,
        noneEndDt,
        start_d,
        end_d,
        emin,
        ehour,
        eday,
        emonth,
        ewday,
        ewday_no,
    } = formData;

    useEffect(() => {
        if (editSyncData) {
            setFormData({
                ...editSyncData,
                start_d: new Date(editSyncData.start_d),
                end_d: new Date(editSyncData.end_d),
            });
        }
    }, [editSyncData]);

    const getSystemList = () => {
        systemGridRef.current.api.setRowData([]);
        axios
            .get('find/systems')
            .then((res) => {
                systemGridRef.current.api.setRowData(res);
                setSelectedSystem();
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const setSelectedSystem = () => {
        systemGridRef.current.api.forEachNode(function (node) {
            for (let i = 0; i < editSyncData.system_list.length; i++) {
                if (editSyncData.system_list[i].system_id === node.data.system_id) {
                    node.setSelected(editSyncData.system_list[i].system_id === node.data.system_id);
                }
            }
        });
    };

    const onSystemGridReady = () => {
        getSystemList();
    };

    const setCycle = ({ month, day, week, weekDay }) => {
        setFormData({
            ...formData,
            emonth: month,
            eday: day,
            ewday: week,
            ewday_no: weekDay,
        });
    };

    const manageFormData = (e) => {
        const { value, name, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const regroupFormData = (e) => {
        setCycle({ month: [], day: [], week: [], weekDay: [] });
        setFormData({
            ...formData,
            pattern: e.target.value,
            directRun: false,
            noneEndDt: false,
        });
    };

    const convertCycle = (type) => {
        let str = '';

        if (type === 'month') {
            str = emonth.join(', ') + (emonth.join(', ') && '월');
        } else if (type === 'day') {
            str = eday.includes('말일')
                ? eday.join(', ')
                : (str = eday.join(', ') + (eday.join(', ') && '일'));
        } else if (type === 'week') {
            str = ewday.join(', ') + (ewday.join(', ') && '째주');
        } else if (type === 'weekDay') {
            const week = ['일', '월', '화', '수', '목', '금', '토'];
            for (let i = 0; i < ewday_no.length; i++) {
                str += ', ' + week[ewday_no[i]];
            }
            str += ewday_no.join(', ') && '요일';
        }

        return str;
    };

    const setSaveData = () => {
        const systemList = systemGridRef.current.api.getSelectedRows().map((node) => {
            node.selected = true;
            return node;
        });

        let schByPattern = {
            start_d: moment(start_d).format('yyyy-MM-DD'),
            end_d: noneEndDt ? '9999-12-31' : moment(end_d).format('yyyy-MM-DD'),
        };

        if (pattern === '1') {
            schByPattern = {
                emin: directRun ? '' : emin,
                ehour: directRun ? '' : ehour,
                eday: directRun ? '' : moment(start_d).format('DD'),
                emonth: directRun ? '' : moment(start_d).format('MM'),
                ewday: directRun ? '' : '*',
                ewday_no: directRun ? '' : '*',
                start_d: directRun
                    ? moment().format('yyyy-MM-DD')
                    : moment(start_d).format('yyyy-MM-DD'),
                end_d: '9999-12-31',
            };
        } else if (pattern === '2') {
            schByPattern = {
                eday: '*',
                emonth: '*',
                ewday: '*',
                ewday_no: '*',
            };
        } else if (pattern === '3') {
            schByPattern = {
                eday: '*',
                emonth: '*',
                ewday: moment(start_d).day(),
                ewday_no: '*',
            };
        } else if (pattern === '4') {
            schByPattern = {
                eday: moment(start_d).format('DD'),
                emonth: '*',
                ewday: '*',
                ewday_no: '*',
            };
        } else if (pattern === '5') {
            schByPattern = {
                eday: moment(start_d).format('DD'),
                emonth:
                    moment(start_d).format('MM ') +
                    moment(start_d).add(1, 'Q').format('MM ') +
                    moment(start_d).add(2, 'Q').format('MM ') +
                    moment(start_d).add(3, 'Q').format('MM'),
                ewday: '*',
                ewday_no: '*',
            };
        } else if (pattern === '6') {
            schByPattern = {
                eday: moment(start_d).format('DD'),
                emonth: moment(start_d).format('MM'),
                ewday: '*',
                ewday_no: '*',
            };
        } else if (pattern === '7') {
            schByPattern = {
                eday: eday.length === 0 ? '*' : eday.join(' '),
                emonth: emonth.join(' '),
                ewday: ewday.length === 0 ? '*' : ewday.join(' '),
                ewday_no: ewday_no.length === 0 ? '*' : ewday_no.join(' '),
            };
        }

        return { ...formData, ...schByPattern, system_list: systemList };
    };

    const validationCheck = (data) => {
        if (data.wname === '') {
            alert('스케줄 명을 작성해 주세요.');
            return false;
        }

        if (data.system_list.length === 0) {
            alert('스케줄 명을 작성해 주세요.');
            return false;
        }

        return true;
    };

    const saveSchedule = () => {
        const saveData = setSaveData();

        validationCheck(saveData) &&
            axios
                .post(editSyncData ? '/update/works' : '/save/works', setSaveData())
                .then(() => {
                    setShowSchedule(false);
                    getSyncMain();
                    alert('테이블 동기화가 설정되었습니다.');
                })
                .catch((Error) => {
                    console.log('schedule add error : ', Error);
                });
    };

    return (
        <>
            <Modal dialogAs={DraggableModal} show={show} onHide={setShowSchedule}>
                <Modal.Header closeButton>
                    <Modal.Title>작업 스케줄 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body ref={ref}>
                    <GridContainer>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>
                                스케줄명
                            </Form.Label>
                            <Col sm={9} className="mb-3">
                                <Form.Control
                                    name="wname"
                                    onChange={manageFormData}
                                    value={formData.wname}
                                    type="text"
                                />
                            </Col>
                            <Form.Label column sm={3}>
                                스케줄설명
                            </Form.Label>
                            <Col sm={9} className="mb-3">
                                <Form.Control
                                    name="wdesc"
                                    onChange={manageFormData}
                                    value={formData.wdesc}
                                    type="text"
                                />
                            </Col>
                            <Form.Label column sm={3}>
                                작업주기
                            </Form.Label>
                            <Col sm={9} className="mb-3">
                                <Form.Select
                                    name="pattern"
                                    onChange={(e) => {
                                        regroupFormData(e);
                                    }}
                                    value={pattern}
                                >
                                    <option value="1">한번</option>
                                    <option value="2">매일</option>
                                    <option value="3">매주</option>
                                    <option value="4">매달</option>
                                    <option value="5">분기별</option>
                                    <option value="6">매년</option>
                                    <option value="7">사용자설정</option>
                                </Form.Select>
                            </Col>
                            {pattern === '7' && (
                                <>
                                    <Form.Label column sm={3}>
                                        월별
                                    </Form.Label>
                                    <Col sm={9} className="mb-3">
                                        <InputGroup>
                                            <Form.Control value={convertCycle('month')} readOnly />
                                            <Button
                                                onClick={() => {
                                                    setShowCycle(true);
                                                }}
                                                variant="outline-secondary"
                                            >
                                                설정
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                    <Form.Label column sm={3}>
                                        일별
                                    </Form.Label>
                                    <Col sm={9} className="mb-3">
                                        <Form.Control
                                            readOnly
                                            value={
                                                formData.eday.length === 0
                                                    ? convertCycle('week') + convertCycle('weekDay')
                                                    : convertCycle('day')
                                            }
                                            type="text"
                                        />
                                    </Col>
                                </>
                            )}
                            <Form.Label column sm={3}>
                                실행시작일
                            </Form.Label>
                            <Col sm={9} className="mb-3">
                                <DatePicker
                                    className="form-control"
                                    selected={start_d}
                                    locale="ko"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    dateFormat="yyyy-MM-dd"
                                    onChange={(date) => {
                                        setFormData({
                                            ...formData,
                                            start_d: date,
                                        });
                                    }}
                                    onChangeRaw={(e) => e.preventDefault()}
                                    selectsStart
                                    startDate={start_d}
                                    maxDate={end_d}
                                    disabled={directRun}
                                />
                                <TimePicker
                                    readOnly
                                    value={moment().hours(formData.ehour).minute(formData.emin)}
                                    onChange={(time) =>
                                        setFormData({
                                            ...formData,
                                            ehour: moment(time).format('HH'),
                                            emin: moment(time).format('mm'),
                                        })
                                    }
                                    showSecond={false}
                                    disabled={directRun}
                                />
                                <Form.Check
                                    name="directRun"
                                    onChange={manageFormData}
                                    checked={directRun}
                                    id="directRun"
                                    disabled={pattern !== '1'}
                                />
                                <Form.Label column sm={3} htmlFor="directRun">
                                    즉시실행
                                </Form.Label>
                            </Col>
                            <Form.Label column sm={3}>
                                실행종료일
                            </Form.Label>
                            <Col sm={9} className="mb-3">
                                <DatePicker
                                    className="form-control"
                                    locale="ko"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    dateFormat="yyyy-MM-dd"
                                    selected={end_d}
                                    onChange={(date) =>
                                        setFormData({
                                            ...formData,
                                            end_d: date,
                                        })
                                    }
                                    onChangeRaw={(e) => e.preventDefault()}
                                    selectsEnd
                                    endDate={end_d}
                                    minDate={start_d}
                                    disabled={pattern === '1' || noneEndDt}
                                />
                                <Form.Check
                                    name="noneEndDt"
                                    onChange={manageFormData}
                                    checked={noneEndDt}
                                    id="noneEndDt"
                                    disabled={pattern === '1'}
                                />
                                <Form.Label column sm={3} htmlFor="noneEndDt">
                                    종료일 없음
                                </Form.Label>
                            </Col>

                            {/* 업무명 목록 */}
                            <div className="ag-theme-alpine" style={{ height: 200, width: 1500 }}>
                                <AgGridReact
                                    ref={systemGridRef}
                                    rowMultiSelectWithClick={true}
                                    rowSelection="multiple"
                                    onGridReady={onSystemGridReady}
                                >
                                    <AgGridColumn
                                        field="system_id"
                                        headerName="system_id"
                                        hide={true}
                                    />
                                    <AgGridColumn
                                        field="system_name"
                                        headerName="업무명"
                                        flex={1}
                                        checkboxSelection={true}
                                    />
                                    <AgGridColumn field="index" headerName="index" hide={true} />
                                </AgGridReact>
                            </div>
                        </Form.Group>
                    </GridContainer>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonWrap>
                        <WhiteButton variant="secondary" onClick={() => setShowSchedule(false)}>
                            닫기
                        </WhiteButton>
                        <NormalButton variant="primary" type="submit" onClick={saveSchedule}>
                            {editSyncData ? '수정' : '확인'}
                        </NormalButton>
                    </ButtonWrap>
                </Modal.Footer>
            </Modal>

            {showCycle && (
                <WorkSchCycle
                    show={showCycle}
                    setShowCycle={setShowCycle}
                    eday={eday}
                    emonth={emonth}
                    ewday={ewday}
                    ewday_no={ewday_no}
                    setCycle={setCycle}
                    parentHeight={ref.current.clientHeight}
                />
            )}
        </>
    );
}

const GridContainer = styled.div`
    & .mb-3 {
        display: flex;
        gap: 5px;
        align-items: center;
        & input[type='checkbox'] {
            margin-top: 0.15rem;
        }
    }
    & input:not(input[type='radio']),
    & select {
        line-height: 1.313;
    }
    & * {
        font-size: 14px !important;
    }
`;

const ButtonWrap = styled.div`
    & button {
        height: 33px;
        margin-left: 10px;
    }
`;

export default WorkSchedule;
