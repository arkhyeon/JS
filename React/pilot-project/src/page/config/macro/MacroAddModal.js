import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { NormalButton, WhiteButton } from '../../../component/button/R2wButton';

const MacroAddModal = ({ show, setShowMacroModal, add }) => {
    const [macroKey, setMacroKey] = useState();
    const [macroValue, setMacroValue] = useState();

    const open = () => {
        setMacroKey('');
        setMacroValue('');
    };

    const cancel = () => {
        setShowMacroModal(false);
    };

    const ok = () => {
        if (macroKey === '' || macroValue === '') {
            alert('매크로 변수 또는 매크로 값이 없습니다.');
            return;
        }
        add(macroKey, macroValue);
        setShowMacroModal(false);
    };

    return (
        <Modal show={show} onHide={setShowMacroModal} onShow={open} centered>
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
                        <Form.Label column sm={3}>
                            매크로 값
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setMacroValue(e.target.value);
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
