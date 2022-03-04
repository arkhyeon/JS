import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { NormalButton, WhiteButton } from '../../../component/button/R2wButton';
import WorkSchCycle from './WorkSchCycle';
import styled from 'styled-components';
import Axios from 'axios';

function SyncFailLog({ show, setShowFailLog, wid }) {
    const logGridRef = useRef();

    const onGridReady = () => {
        getFailLog();
    };

    const getFailLog = () => {
        axios
            .get(process.env.REACT_APP_DB_HOST + '/fail-log/' + wid)
            .then((res) => {
                logGridRef.current.api.setRowData(res.data);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    return (
        <Modal show={show} onHide={setShowFailLog} centered>
            <Modal.Header closeButton>
                <Modal.Title>작업 스케줄 추가</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GridContainer>
                    <AgGridReact
                        ref={logGridRef}
                        gridOptions={syncGridOption}
                        onGridReady={onGridReady}
                        defaultColDef={defaultColDef}
                        rowHeight={35}
                        headerHeight={40}
                    />
                </GridContainer>
            </Modal.Body>
            <Modal.Footer>
                <ButtonWrap>
                    <NormalButton
                        variant="primary"
                        type="submit"
                        onClick={() => {
                            setShowFailLog(false);
                        }}
                    >
                        닫기
                    </NormalButton>
                </ButtonWrap>
            </Modal.Footer>
        </Modal>
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

const defaultColDef = {
    suppressMenu: true,
    sortable: false,
    resizable: true,
};

const syncGridOption = {
    columnDefs: [
        {
            headerName: '업무명',
            field: 'sname',
        },
        {
            headerName: '실패 로그',
            field: 'logmsg',
        },
        {
            headerName: 'id',
            field: 'id',
            hide: true,
        },
    ],
};

export default SyncFailLog;
