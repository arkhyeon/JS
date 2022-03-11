import React, { useEffect, useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { StyledAlert } from '../../../component/alert/R2wAlert';
import { NormalButton, WhiteButton } from '../../../component/button/R2wButton';
import DraggableModal from '../../../utils/DraggableModal';

const serverList = [
    { 'serverid:': '1', server_name: 'ORA1' },
    { 'serverid:': '2', server_name: 'ORA2' },
    { 'serverid:': '3', server_name: 'ORA3' },
    { 'serverid:': '4', server_name: 'ORA1_DST' },
    { 'serverid:': '5', server_name: 'ORA2_DST' },
    { 'serverid:': '6', server_name: 'ORA3_DST' },
];

const SystemAddModal = ({ show, setShow, add }) => {
    const [systemName, setSystemName] = useState();
    const [serverSrc, setServerSrc] = useState();
    const [serverDst, setServerDst] = useState();
    const [owners, setOwners] = useState();

    useEffect(() => {
        //console.log('useeffect');
    });

    const open = () => {
        // getServerList.then() 가장 첫번째 서버id 셋팅
        setServerSrc('1');
        setServerDst('4');
    };

    const cancel = () => {
        setShow(false);
    };

    const ok = () => {
        if (!validate()) {
            return;
        }
        add(systemName, serverSrc, serverDst, owners);
        setShow(false);
    };

    const validate = () => {
        if (systemName === '' || systemName === undefined) {
            alert('업무명을 입력해주세요.');
            return false;
        }
        if (serverSrc === '' || serverSrc === undefined) {
            alert('원본서버를 지정해주세요.');
            return false;
        }
        if (serverDst === '' || serverDst === undefined) {
            alert('대상서버를 지정해주세요.');
            return false;
        }
        if (owners === '' || owners === undefined) {
            alert('OWNERS를 입력해주세요.');
            return false;
        }
        return true;
    };

    return (
        <Modal
            dialogAs={DraggableModal}
            show={show}
            onHide={setShow}
            onShow={open}
        >
            <Modal.Header closeButton>
                <Modal.Title>업무 등록</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <GridContainer>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>
                            업무 명
                        </Form.Label>
                        <Col sm={9} className="mb-3">
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setSystemName(e.target.value);
                                }}
                            />
                        </Col>
                        <Form.Label column sm={3}>
                            원본 서버
                        </Form.Label>
                        <Col sm={9} className="mb-3">
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => {
                                    setServerSrc(e.target.value);
                                }}
                            >
                                {serverList.map((server) => (
                                    <option
                                        key={
                                            server.serverid + server.server_name
                                        }
                                        value={server.serverid}
                                    >
                                        {server.server_name}
                                    </option>
                                ))}
                                ;
                            </Form.Select>
                        </Col>
                        <Form.Label column sm={3}>
                            대상 서버
                        </Form.Label>
                        <Col sm={9} className="mb-3">
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => {
                                    setServerDst(e.target.value);
                                }}
                            >
                                {serverList.map((server) => (
                                    <option
                                        key={
                                            server.serverid + server.server_name
                                        }
                                        value={server.serverid}
                                    >
                                        {server.server_name}
                                    </option>
                                ))}
                                ;
                            </Form.Select>
                        </Col>
                        <Form.Label column sm={3}>
                            OWNERS
                        </Form.Label>
                        <Col sm={9} className="mb-3">
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setOwners(e.target.value);
                                }}
                            />
                        </Col>
                        <Form.Label column sm={3}></Form.Label>
                    </Form.Group>
                    <StyledAlert>
                        {'OWNERS는 콤마(,)로 구분해주세요.'}
                        {'EX) Post1,Post2,Post3'}
                    </StyledAlert>
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

const GridContainer = styled.div`
    & input:not(input[type='radio']),
    & select {
        line-height: 1.313;
    }
    & * {
        font-size: 14px;
    }
`;

const ButtonWrap = styled.div`
    & button {
        height: 33px;
        margin-left: 10px;
    }
`;

export default SystemAddModal;
