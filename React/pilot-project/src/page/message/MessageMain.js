import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

function MessageMain() {
    return (
        <MessageMainWrap>
            <Outlet />
        </MessageMainWrap>
    );
}
const MessageMainWrap = styled.div`
    width: 100%;
    border-bottom: 1px solid #a9a9a9;
    padding: 15px;
    height: 841px;

    & svg {
        font-size: 24px;
    }
`;
export default MessageMain;
