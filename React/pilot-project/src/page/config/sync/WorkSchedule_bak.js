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

registerLocale('ko', ko);

function WorkSchedule({ show, setShowSchedule, add, editMode, editWorkId, edit }) {
    const ref = useRef();

    //const [startDate, setStartDate] = useState(new Date());
    //const [startTime, setStartTime] = useState(moment().format('HH:mm'));
    //const [endDate, setEndDate] = useState(new Date());
    const [showCycle, setShowCycle] = useState(false);
    const [cycle, setCycle] = useState({
        month: [],
        day: [],
        week: [],
        weekDay: [],
    });
    const [systemGridApi, setSystemGridApi] = useState();
    const systemGridRef = useRef();

    useEffect(() => {
        if (editMode) {
            getTest();
        }
        //console.log(moment(endDate).format('yyyy-MM-DD'));
    }, [editWorkId]);

    const getTest = () => {
        Axios.get(process.env.REACT_APP_DB_HOST + '/ScheduleInfo/' + editWorkId)
            .then((res) => {
                console.log('res', res);
                let formData = {
                    schName: res.data.schName,
                    schDesc: res.data.schDesc,
                    schPattern: res.data.schPattern,
                    directRun: res.data.directRun,
                    noneEndDt: res.data.noneEndDt,
                    startDate: new Date(res.data.startDate),
                    startTime: res.data.startTime,
                    //endDate: res.data.endDate,
                };

                console.log('getTest', formData);
                console.log('res.startDate', formData.startDate);
                console.log('res.startTime', formData.startTime);

                setFormData(formData);
                //setStartDate(formData.startDate);
                // systemGridRef.current.api.setRowData(res.data.systemList);
                // systemGridRef.current.api.forEachNode(function (node) {
                //     node.setSelected(node.data.selected);
                // });
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const onSystemGridReady = (params) => {
        setSystemGridApi(params.api);
        //console.log('onGridReady', params);
    };

    const [formData, setFormData] = useState({
        schName: '',
        schDesc: '',
        schPattern: '1',
        directRun: false,
        noneEndDt: false,
        startDate: new Date(),
        startTime: moment().format('HH:mm'),
        endDate: new Date(),
    });

    const { schName, schDesc, schPattern, directRun, noneEndDt, startDate, startTime, endDate } =
        formData;

    const manageFormData = (e) => {
        const { value, name, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const setStartDate = (date) => {
        console.log('startDate', date);
        setFormData({
            ...formData,
            startDate: date,
        });
    };

    const setEndDate = (date) => {
        setFormData({
            ...formData,
            endDate: date,
        });
    };

    const setStartTime = (time) => {
        setFormData({
            ...formData,
            startTime: time.format('HH:mm'),
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
                str = cycle[type].join(', ') + (cycle[type].join(', ') && '???');
                break;
            case 'day':
                str = cycle[type].join(', ') + (cycle[type].join(', ') && '???');
                break;
            case 'week':
                str = cycle[type].join(', ') + (cycle[type].join(', ') && '??????');
                break;
            case 'weekDay':
                const week = ['???', '???', '???', '???', '???', '???', '???'];
                for (let i = 0; i < cycle[type].length; i++) {
                    str += ', ' + week[cycle[type][i]];
                }
                str += cycle[type].join(', ') && '??????';
                break;
            default:
                break;
        }
        return str;
    };

    const saveSchedule = () => {
        if (formData['schName'] === '') {
            alert('????????? ?????? ????????? ?????????.');
            return;
        }

        console.log('startDate', moment(startDate).format('YYYY-MM-DD'));
        console.log('startTime', startTime);
        // console.log('endDate', moment(endDate).format('YYYY-MM-DD'));
        // console.log('cycle', cycle);
        // console.log('formData', formData);

        console.log('formData.schPattern', formData.schPattern);

        add(
            formData.schName,
            formData.schDesc,
            formData.schPattern,
            startDate,
            endDate,
            '',
            '',
            '',
            '',
            systemGridApi,
        );
        setShowSchedule(false);
    };

    const editSchedule = () => {
        console.log('editSchedule');
        setShowSchedule(false);
    };

    const gridOptions = {
        // callback tells the grid to use the 'id' attribute for IDs, IDs should always be strings
        getRowNodeId: (data) => data.system_id,

        // other grid options ...
    };

    return (
        <>
            <Modal show={show} onHide={setShowSchedule} centered>
                <Modal.Header closeButton>
                    <Modal.Title>?????? ????????? ??????</Modal.Title>
                </Modal.Header>
                <Modal.Body ref={ref}>
                    <GridContainer>
                        <Form
                            onSubmit={(e) => {
                                const data = e.target; // form ?????? ?????? ????????? ?????? ?????? ?????????

                                console.log(data); // input ????????? name ????????? ??????
                                e.preventDefault();
                            }}
                        >
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    ????????????
                                </Form.Label>
                                <Col sm={9} className="mb-3">
                                    <Form.Control
                                        name="schName"
                                        onChange={manageFormData}
                                        value={schName}
                                        type="text"
                                    />
                                </Col>
                                <Form.Label column sm={3}>
                                    ???????????????
                                </Form.Label>
                                <Col sm={9} className="mb-3">
                                    <Form.Control
                                        name="schDesc"
                                        onChange={manageFormData}
                                        value={schDesc}
                                        type="text"
                                    />
                                </Col>
                                <Form.Label column sm={3}>
                                    ????????????
                                </Form.Label>
                                <Col sm={9} className="mb-3">
                                    <Form.Select
                                        name="schPattern"
                                        onChange={(e) => {
                                            manageFormData(e);
                                            regroupFormData(e);
                                        }}
                                        value={schPattern}
                                    >
                                        <option value="1">??????</option>
                                        <option value="2">??????</option>
                                        <option value="3">??????</option>
                                        <option value="4">??????</option>
                                        <option value="5">?????????</option>
                                        <option value="6">??????</option>
                                        <option value="7">???????????????</option>
                                    </Form.Select>
                                </Col>
                                {schPattern === '7' && (
                                    <>
                                        <Form.Label column sm={3}>
                                            ??????
                                        </Form.Label>
                                        <Col sm={9} className="mb-3">
                                            <InputGroup>
                                                <Form.Control
                                                    value={convertCycle('month')}
                                                    readOnly
                                                />
                                                <Button
                                                    onClick={() => {
                                                        setShowCycle(true);
                                                    }}
                                                    variant="outline-secondary"
                                                >
                                                    ??????
                                                </Button>
                                            </InputGroup>
                                        </Col>
                                        <Form.Label column sm={3}>
                                            ??????
                                        </Form.Label>
                                        <Col sm={9} className="mb-3">
                                            <Form.Control
                                                value={
                                                    cycle['day'].length === 0
                                                        ? convertCycle('week') +
                                                          convertCycle('weekDay')
                                                        : convertCycle('day')
                                                }
                                                readOnly
                                                type="text"
                                            />
                                        </Col>
                                    </>
                                )}
                                <Form.Label column sm={3}>
                                    ???????????????
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
                                        onChange={(date) => setStartDate(date)}
                                        onChangeRaw={(e) => e.preventDefault()}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        disabled={directRun}
                                    />
                                    <TimePicker
                                        readOnly
                                        //defaultValue={moment()}
                                        value={moment()}
                                        //onChange={(time) => setStartTime(time.format('HH:mm'))}
                                        onChange={(time) => setStartTime(time)}
                                        showSecond={false}
                                        disabled={directRun}
                                    />
                                    <Form.Check
                                        name="directRun"
                                        onChange={manageFormData}
                                        checked={directRun}
                                        id="directRun"
                                        disabled={schPattern !== '1'}
                                    />
                                    <Form.Label column sm={3} htmlFor="directRun">
                                        ????????????
                                    </Form.Label>
                                </Col>
                                <Form.Label column sm={3}>
                                    ???????????????
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
                                        onChange={(date) => setEndDate(date)}
                                        onChangeRaw={(e) => e.preventDefault()}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        disabled={schPattern === '1' || noneEndDt}
                                    />
                                    <Form.Check
                                        name="noneEndDt"
                                        onChange={manageFormData}
                                        checked={noneEndDt}
                                        id="noneEndDt"
                                        disabled={schPattern === '1'}
                                    />
                                    <Form.Label column sm={3} htmlFor="noneEndDt">
                                        ????????? ??????
                                    </Form.Label>
                                </Col>
                                <div
                                    className="ag-theme-alpine"
                                    style={{ height: 200, width: 1500 }}
                                >
                                    <AgGridReact
                                        ref={systemGridRef}
                                        //rowData={mainRowData}
                                        rowSelection="multiple"
                                        onGridReady={onSystemGridReady}
                                        //onCellClicked={onMainCellClicked}
                                    >
                                        <AgGridColumn
                                            field="system_id"
                                            headerName="?????????"
                                            checkboxSelection={true}
                                        />
                                        <AgGridColumn
                                            field="index"
                                            headerName="index"
                                            hide={true}
                                        />
                                    </AgGridReact>
                                </div>
                            </Form.Group>
                        </Form>
                    </GridContainer>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowSchedule(false)}>
                        ??????
                    </Button>

                    {editMode ? (
                        <Button
                            type="submit"
                            variant="secondary"
                            onClick={() => {
                                editSchedule();
                            }}
                        >
                            ??????
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            variant="secondary"
                            onClick={() => {
                                saveSchedule();
                            }}
                        >
                            ??????
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            {showCycle && (
                <WorkSchCycle
                    show={showCycle}
                    setShowCycle={setShowCycle}
                    cycle={cycle}
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
`;

export default WorkSchedule;
