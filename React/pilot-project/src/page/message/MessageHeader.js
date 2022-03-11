import React from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import styled from 'styled-components';
import { WhiteButton } from '../../component/button/R2wButton';
import axios from 'axios';

function MessageHeader({ msgRef }) {
    const location = useLocation();

    const onClearData = () => {
        msgRef.current.api.setRowData(null);
    };

    const onRowDel = () => {
        const selectedRows = msgRef.current.api.getSelectedRows();

        if (selectedRows.length === 0) {
            alert('삭제할 메시지를 선택해 주세요.');
            return;
        }

        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }

        for (let i = 0; i < selectedRows.length; i++) {
            axios
                .delete(
                    process.env.REACT_APP_DB_HOST +
                        '/Messages/' +
                        selectedRows[i].id,
                )
                .then(() => {
                    msgRef.current.api.updateRowData({
                        remove: [selectedRows[i]],
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const onRowRead = () => {
        const selectedNodes = msgRef.current.api.getSelectedNodes();

        if (selectedNodes.length === 0) {
            alert('읽음 처리할 메시지를 선택해 주세요.');
            return;
        }

        for (let i = 0; i < selectedNodes.length; i++) {
            axios
                .patch(
                    process.env.REACT_APP_DB_HOST +
                        '/Messages/' +
                        selectedNodes[i].data.id,
                    { read: 0 },
                )
                .then(() => {
                    selectedNodes[i].setDataValue('read', 0);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    };

    const onRowAllRead = () => {
        axios
            .patch(process.env.REACT_APP_DB_HOST + '/Messages', { read: 0 })
            .then(() => {
                msgRef.current.api.forEachNode(function (rowNode) {
                    rowNode.setDataValue('read', 0);
                });
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    return (
        <MessageBtnList>
            <InputGroup>
                <Form.Select>
                    {location.state === 'RECEIVE' ? (
                        <>
                            <option value="0">보낸사람</option>
                            <option value="1">내용</option>
                        </>
                    ) : (
                        <>
                            <option value="0">받은사람</option>
                            <option value="1">내용</option>
                        </>
                    )}
                </Form.Select>
                <FormControl placeholder="검색" />
                <StyledBtn>
                    <MdSearch />
                </StyledBtn>
            </InputGroup>
            <WhiteButton onClick={onRowDel}>삭제</WhiteButton>
            <WhiteButton onClick={onClearData}>전체삭제</WhiteButton>
            {location.state === 'RECEIVE' && (
                <>
                    <WhiteButton onClick={onRowRead}>읽음</WhiteButton>
                    <WhiteButton onClick={onRowAllRead}>전체읽음</WhiteButton>
                </>
            )}
        </MessageBtnList>
    );
}

const MessageBtnList = styled.div`
    margin-bottom: 15px;
    & div {
        max-width: 750px;
        margin-bottom: 15px;
    }

    & div .form-select {
        margin-right: 7px;
        height: 33px;
        font-size: 14px;
    }

    & div .form-control {
        width: 245px;
        height: 33px;
        font-size: 14px;
    }

    & div button {
        height: 33px;
        display: flex;
        align-items: center;
    }

    & > button {
        height: 33px;
        margin-right: 7px;
    }
`;

const StyledBtn = styled(Button)`
    color: ${({ theme }) => theme.colors.light_1};
    background-color: ${({ theme }) => theme.colors.normal_2};
    border-color: ${({ theme }) => theme.colors.normal_2};

    &:hover,
    &:active,
    &:focus {
        color: #ffffff;
        background-color: ${({ theme }) => theme.colors.normal_2};
        border: 1px solid ${({ theme }) => theme.colors.normal_2};
    }
`;

export default MessageHeader;
