import React, { useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import styled from "styled-components";
import { NormalButton, WhiteButton } from "../../../component/button/R2wButton";
import DraggableModal from "../../../utils/DraggableModal";

const MacroAddModal = ({ show, setShowMacroModal, add }) => {
    const [macroKey, setMacroKey] = useState();

    const open = () => {
        setMacroKey('');
    };

    const cancel = () => {
        setShowMacroModal(false);
    };

    const ok = () => {
        if (macroKey === '') {
            alert('매크로 변수 값이 없습니다.');
            return;
        }
        add(macroKey);
        setShowMacroModal(false);
    };

    return (
        <Modal
            dialogAs={DraggableModal}
            show={show}
            onHide={setShowMacroModal}
            onShow={open}
        >
            <Modal.Header closeButton>
                <Modal.Title>매크로 등록</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <GridContainer>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>
                            매크로 변수
                        </Form.Label>
                        <Col sm={9} className="mb-3">
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setMacroKey(e.target.value);
                                }}
                            />
                        </Col>
                    </Form.Group>
                </GridContainer>
            </Modal.Body>

            <Modal.Footer>
                <ButtonWrap>
                    <WhiteButton variant="secondary" onClick={cancel}>
                        닫기
                    </WhiteButton>
                    <NormalButton variant="primary" onClick={ok}>
                        확인
                    </NormalButton>
                </ButtonWrap>
            </Modal.Footer>
        </Modal>
    );
};
const ButtonWrap = styled.div`
    & button {
        height: 33px;
        margin-left: 10px;
    }
`;

const GridContainer = styled.div`
    & input:not(input[type='radio']),
    & select {
        line-height: 1.313;
    }
    & * {
        font-size: 14px;
    }
`;

export default MacroAddModal;
