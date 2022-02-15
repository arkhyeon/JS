import React from "react";
import styled from "styled-components";
import MessageAside from "./MessageAside";
import MessageMain from "./MessageMain";

function Message() {
    return (
        <Container>
            <MessageAside />
            <MessageMain />
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    min-width: 1900px;
    display: flex;
`;

export default Message;
