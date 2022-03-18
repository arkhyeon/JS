import React, { useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { StyledAlert } from '../../../component/alert/R2wAlert';
import { NormalButton, WhiteButton } from '../../../component/button/R2wButton';
import DraggableModal from '../../../utils/DraggableModal';
import axios from 'axios';

const SystemAddModal = ({ show, setShow, addSystem }) => {
    const [systemName, setSystemName] = useState();
    const [serverSrc, setServerSrc] = useState();
    const [serverDst, setServerDst] = useState();
    const [owners, setOwners] = useState();
    const [serverList, setServerList] = useState([]);

    const serverMappings = () => {
        axios
            .get('find/servers')
            .then((res) => {
                setServerList(res);
            })
            .catch((Error) => {
                console.log('Error: ', Error);
            });
    };

    const open = () => {
        serverMappings();
    };

    const saveSystem = () => {
        if (!validate()) {
            return;
        }

        const newSystem = {
            system_name: systemName,
            serverid_src: serverSrc,
            serverid_dst: serverDst,
            owner_list: owners,
        };

        axios
            .post('save/systems', newSystem)
            .then(() => {
                addSystem(systemName, serverSrc, serverDst, owners);
            })
            .catch((Error) => {
                console.log(Error);
            });

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
        <Modal dialogAs={DraggableModal} show={show} onHide={setShow} onShow={open}>
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
                                onChange={(e) => {
                                    setServerSrc(e.target.value);
                                }}
                            >
                                <option value="">서버를 선택해 주세요.</option>
                                {serverList.map((sl) => (
                                    <option key={sl.serverid} value={sl.serverid}>
                                        {sl.server_name}
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
                                onChange={(e) => {
                                    setServerDst(e.target.value);
                                }}
                            >
                                <option value="">서버를 선택해 주세요.</option>
                                {serverList.map((sl) => (
                                    <option key={sl.serverid} value={sl.serverid}>
                                        {sl.server_name}
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
                    <WhiteButton
                        onClick={() => {
                            setShow(false);
                        }}
                    >
                        닫기
                    </WhiteButton>
                    <NormalButton onClick={saveSystem}>확인</NormalButton>
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
