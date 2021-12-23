import React, { useRef, useState } from "react";
import styled from "styled-components";
import { BsFillChatDotsFill, BsPersonFill } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import AccountInfo from "./AccountInfo";
import MessageTab from "./MessageTab";
import { MsgContents } from "./MessageContents";

function MenuInfo({ getAuth }) {
    const [notify, setNotify] = useState(MsgContents.length + 3);
    const [toggleAccount, setToggleAccount] = useState(false);
    const [toggleMessage, setToggleMessage] = useState(false);
    const refId = useRef();

    return (
        <Container ref={refId}>
            <ItemWrap onMouseDown={() => setToggleMessage(!toggleMessage)}>
                <BsFillChatDotsFill />
                {!toggleMessage && (
                    <Badge pill bg="danger">
                        {notify}
                    </Badge>
                )}
            </ItemWrap>
            <ItemWrap onMouseDown={() => setToggleAccount(!toggleAccount)}>
                <BsPersonFill />
            </ItemWrap>
            {toggleMessage && <MessageTab refId={refId} setToggleMessage={setToggleMessage} MsgContents={MsgContents} />}
            {toggleAccount && <AccountInfo toggleAccount={true} setToggleAccount={setToggleAccount} getAuth={getAuth} />}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const ItemWrap = styled.div`
    position: relative;
    color: ${({ theme }) => theme.colors.normal};
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.light};
    }
    &:active {
        color: ${({ theme }) => theme.colors.normal};
    }

    & > svg {
        margin: 0.5rem 0.5rem;
        width: 1.5rem;
        height: 1.5rem;
    }

    .badge {
        position: absolute;
        left: 1rem;
        top: 0.2rem;
    }
`;

export default MenuInfo;
