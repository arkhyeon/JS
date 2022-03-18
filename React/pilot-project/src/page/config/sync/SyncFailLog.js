import React, { useRef, useState } from "react";
import axios from "axios";
import { Form, Modal } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { NormalButton } from "../../../component/button/R2wButton";
import styled from "styled-components";
import DetailLog from "./DetailLog";
import DraggableModal from "../../../utils/DraggableModal";

function SyncFailLog({ show, setShowFailLog, wid }) {
    const logGridRef = useRef();
    const [showDetailLog, setShowDetailLog] = useState(false);
    const [clickedFailLog, setClickedFailLog] = useState('');

    const onGridReady = () => {
        getFailLog();
    };

    const getFailLog = () => {
        axios
            .get(process.env.REACT_APP_DB_HOST + '/fail-log/' + wid)
            .then((res) => {
                logGridRef.current.api.setRowData(res.data.fail_message);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const resultClick = (e) => {
        setClickedFailLog(e.node.data.logmsg);
        setShowDetailLog(true);
    };

    return (
        <Modal
            dialogAs={DraggableModal}
            show={show}
            onHide={setShowFailLog}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>스케줄 실패 로그</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label sm={1}>
                    스케줄명 - <Form.Label>Test 스케줄</Form.Label>
                </Form.Label>
                <GridContainer className="ag-theme-alpine">
                    <AgGridReact
                        ref={logGridRef}
                        gridOptions={syncGridOption}
                        onGridReady={onGridReady}
                        defaultColDef={defaultColDef}
                        onCellClicked={(e) => {
                            resultClick(e);
                        }}
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
            {showDetailLog && (
                <DetailLog
                    show={showDetailLog}
                    setShowDetailLog={setShowDetailLog}
                    log={clickedFailLog}
                />
            )}
        </Modal>
    );
}

const GridContainer = styled.div`
    & label {
        font-size: 15px;
    }
    height: 300px;
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
            flex: 0.3,
        },
        {
            headerName: '실패 로그',
            field: 'logmsg',
            flex: 1,
        },
        {
            headerName: 'sid',
            field: 'sid',
            hide: true,
        },
    ],
};

export default SyncFailLog;
