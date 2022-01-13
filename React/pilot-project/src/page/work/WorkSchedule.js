import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import React, { useRef, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

function WorkSchedule({ show, setShowSchedule }) {
    // const getAddress = () => {
    //     axios
    //         .get(process.env.REACT_APP_DB_HOST + "/Users")
    //         .then((res) => {
    //             addressGrid.current.api.setRowData(res.data);
    //         })
    //         .catch((Error) => {
    //             console.log(Error);
    //         });
    // };

    return (
        <Modal show={show} onHide={setShowSchedule} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">작업 스케줄 추가</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GridContainer className="ag-theme-alpine">스케줄 추가 부</GridContainer>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShowSchedule(false)}>닫기</Button>
                <Button
                    onClick={() => {
                        setShowSchedule(false);
                    }}
                >
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const GridContainer = styled.div`
    height: 387px;
`;

export default WorkSchedule;
