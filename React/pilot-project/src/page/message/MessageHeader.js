import React from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import styled from "styled-components";

function MessageHeader(props) {
    return (
        <MessageBtnList>
            <InputGroup className="mb-3">
                <Form.Select aria-label="Default select example">
                    <option value="0">보낸사람</option>
                    <option value="1">내용</option>
                </Form.Select>
                <FormControl placeholder="" />
                <Button variant="outline-secondary">검색</Button>
            </InputGroup>
            <hr />
        </MessageBtnList>
    );
}

const MessageBtnList = styled.div`
    & div {
        width: 500px;
        padding-bottom: 8px;
    }

    & div .form-select {
        margin-right: 20px;
    }

    & div .form-control {
        width: 120px;
    }
`;

export default MessageHeader;
