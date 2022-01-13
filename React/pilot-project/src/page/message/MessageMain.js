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
    padding: 21px;
    height: 680px;

    & svg {
        width: 24px;
        height: 24px;
    }
`;
export default MessageMain;
