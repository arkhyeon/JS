import React from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import styled from 'styled-components';

function MessageHeader() {
    const location = useLocation();
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
        </MessageBtnList>
    );
}

const MessageBtnList = styled.div`
    margin-bottom: 15px;
    & div {
        width: 750px;
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
        border: 1px solid;
        border-color: ${({ theme }) => theme.colors.normal_2};
    }
`;

export default MessageHeader;
