import React, { useRef, useState, useEffect } from 'react';
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
import Axios from 'axios';
import { NormalButton, WhiteButton } from '../../../component/button/R2wButton';

registerLocale('ko', ko);

function WorkSchedule({ show, setShowSchedule, editSyncData, getSyncMain }) {
    const ref = useRef();
    const systemGridRef = useRef();
    const [showCycle, setShowCycle] = useState(false);
    const [formData, setFormData] = useState({
        schName: '',
        schDesc: '',
        schPattern: '1',
        directRun: false,
        noneEndDt: false,
        startDate: new Date(),
        startTime: moment().format('HH:mm'),
        endDate: new Date(),
        cycle: {
            month: [],
            day: [],
            week: [],
            weekDay: [],
        },
        systemList: {},
    });

    useEffect(() => {
        if (editSyncData) {
            setFormData({
                ...editSyncData,
                startDate: new Date(editSyncData.startDate),
                endDate: new Date(editSyncData.endDate),
            });
        }
    }, [editSyncData]);

    const getDefaultSystem = () => {
        Axios.get(process.env.REACT_APP_DB_HOST + '/SystemList/')
            .then((res) => {
                systemGridRef.current.api.setRowData(res.data);
                if (editSyncData) {
                    setSelectedSystem(editSyncData);
                }
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const setSelectedSystem = (editSyncData) => {
        systemGridRef.current.api.forEachNode(function (node) {
            for (let i = 0; i < editSyncData.systemList.length; i++) {
                if (editSyncData.systemList[i].id === node.data.id) {
                    node.setSelected(editSyncData.systemList[i].id === node.data.id);
                }
            }
        });
    };

    const onSystemGridReady = () => {
        getDefaultSystem();
    };

    const setCycle = ({ month, day, week, weekDay }) => {
        setFormData({
            ...formData,
            cycle: {
                month: month,
                day: day,
                week: week,
                weekDay: weekDay,
            },
        });
    };

    const { schName, schDesc, schPattern, directRun, noneEndDt, startDate, startTime, endDate, cycle } = formData;

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
            schPattern: e.target.value,
            directRun: false,
            noneEndDt: false,
        });
    };

    const convertCycle = (type) => {
        let str = '';

        switch (type) {
            case 'month':
                str = cycle[type].join(', ') + (cycle[type].join(', ') && '월');
                break;
            case 'day':
                str = cycle[type].join(', ') + (cycle[type].join(', ') && '일');
                break;
            case 'week':
                str = cycle[type].join(', ') + (cycle[type].join(', ') && '째주');
                break;
            case 'weekDay':
                const week = ['일', '월', '화', '수', '목', '금', '토'];
                for (let i = 0; i < cycle[type].length; i++) {
                    str += ', ' + week[cycle[type][i]];
                }
                str += cycle[type].join(', ') && '요일';
                break;
            default:
                break;
        }

        return str;
    };

    const setSaveData = () => {
        const systemList = systemGridRef.current.api.getSelectedRows().map((node) => {
            node.selected = true;
            return node;
        });

        return { ...formData, systemList: systemList, startDate: moment(startDate).format('yyyy-MM-DD'), endDate: moment(endDate).format('yyyy-MM-DD') };
    };

    const saveSchedule = () => {
        if (formData['schName'] === '') {
            alert('스케줄 명을 작성해 주세요.');
            return;
        }

        Axios.post(process.env.REACT_APP_DB_HOST + '/SyncMain', setSaveData())
            .then(() => {
                getSyncMain();
            })
            .catch((Error) => {
                console.log('schedule add error : ', Error);
            });
    };

    const editSchedule = () => {
        if (formData['schName'] === '') {
            alert('스케줄 명을 작성해 주세요.');
            return;
        }

        Axios.patch(process.env.REACT_APP_DB_HOST + '/SyncMain/' + editSyncData.id, setSaveData())
            .then(() => {
                getSyncMain();
            })
            .catch((Error) => {
                console.log('schedule update error : ', Error);
            });
    };

    return (
        <>
            <Modal show={show} onHide={setShowSchedule} centered>
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
                                <Form.Control name="schName" onChange={manageFormData} value={schName} type="text" />
                            </Col>
                            <Form.Label column sm={3}>
                                스케줄설명
                            </Form.Label>
                            <Col sm={9} className="mb-3">
                                <Form.Control name="schDesc" onChange={manageFormData} value={schDesc} type="text" />
                            </Col>
                            <Form.Label column sm={3}>
                                작업주기
                            </Form.Label>
                            <Col sm={9} className="mb-3">
                                <Form.Select
                                    name="schPattern"
                                    onChange={(e) => {
                                        regroupFormData(e);
                                    }}
                                    value={schPattern}
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
                            {schPattern === '7' && (
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
                                            value={cycle['day'].length === 0 ? convertCycle('week') + convertCycle('weekDay') : convertCycle('day')}
                                            readOnly
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
                                    selected={startDate}
                                    locale="ko"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    dateFormat="yyyy-MM-dd"
                                    onChange={(date) => {
                                        setFormData({
                                            ...formData,
                                            startDate: date,
                                        });
                                    }}
                                    onChangeRaw={(e) => e.preventDefault()}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    disabled={directRun}
                                />
                                <TimePicker
                                    readOnly
                                    //defaultValue={moment()}
                                    // ehdtnn
                                    value={moment().hours(formData.startTime.substr(0, 2)).minute(formData.startTime.substr(3, 2))}
                                    //onChange={(time) => setStartTime(time.format('HH:mm'))}
                                    onChange={(time) => setFormData({ ...formData, startTime: moment(time).format('HH:mm') })}
                                    showSecond={false}
                                    disabled={directRun}
                                />
                                <Form.Check name="directRun" onChange={manageFormData} checked={directRun} id="directRun" disabled={schPattern !== '1'} />
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
                                    selected={endDate}
                                    onChange={(date) =>
                                        setFormData({
                                            ...formData,
                                            endDate: date,
                                        })
                                    }
                                    onChangeRaw={(e) => e.preventDefault()}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    disabled={schPattern === '1' || noneEndDt}
                                />
                                <Form.Check name="noneEndDt" onChange={manageFormData} checked={noneEndDt} id="noneEndDt" disabled={schPattern === '1'} />
                                <Form.Label column sm={3} htmlFor="noneEndDt">
                                    종료일 없음
                                </Form.Label>
                            </Col>

                            {/* 업무명 목록 */}
                            <div className="ag-theme-alpine" style={{ height: 200, width: 1500 }}>
                                <AgGridReact
                                    ref={systemGridRef}
                                    //rowData={mainRowData}
                                    rowMultiSelectWithClick={true}
                                    rowSelection="multiple"
                                    onGridReady={onSystemGridReady}
                                    //onCellClicked={onMainCellClicked}
                                >
                                    <AgGridColumn field="id" headerName="id" hide={true} />
                                    <AgGridColumn field="system_name" headerName="업무명" width={450} checkboxSelection={true} />
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
                        <NormalButton
                            variant="primary"
                            type="submit"
                            onClick={() => {
                                editSyncData ? editSchedule() : saveSchedule();
                                setShowSchedule(false);
                                getSyncMain();
                            }}
                        >
                            {editSyncData ? '수정' : '확인'}
                        </NormalButton>
                    </ButtonWrap>
                </Modal.Footer>
            </Modal>

            {showCycle && (
                <WorkSchCycle show={showCycle} setShowCycle={setShowCycle} cycle={cycle} setCycle={setCycle} parentHeight={ref.current.clientHeight} />
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
