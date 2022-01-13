import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsPersonFill } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import AccountInfo from "./AccountInfo";
import MessageTab from "./MessageTab";
import axios from "axios";
import { MdMessage } from "react-icons/md";

function MenuInfo({ getAuth }) {
    const [notify, setNotify] = useState();
    const [unReadMsg, setUnReadMsg] = useState([]);
    const [toggleAccount, setToggleAccount] = useState(false);
    const [toggleMessage, setToggleMessage] = useState(false);

    const getMessages = () => {
        axios
            .get(process.env.REACT_APP_DB_HOST + "/Messages")
            .then((res) => {
                setUnReadMsg(res.data.filter((item) => item.read === 1));
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    useEffect(() => {
        getMessages();
        setNotify(unReadMsg.length);
    }, [unReadMsg.length]);

    return (
        <Container>
            <ItemWrap
                onClick={() => {
                    setToggleMessage(!toggleMessage);
                }}
            >
                <MdMessage />
                {!toggleMessage && notify !== 0 && <Badge>{notify}</Badge>}
            </ItemWrap>
            <ItemWrap onClick={() => setToggleAccount(!toggleAccount)}>
                <BsPersonFill />
            </ItemWrap>
            {toggleMessage && <MessageTab toggleMessage setToggleMessage={setToggleMessage} unReadMsg={unReadMsg} setUnReadMsg={setUnReadMsg} />}
            {toggleAccount && <AccountInfo toggleAccount setToggleAccount={setToggleAccount} getAuth={getAuth} />}
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
    margin: 0px 10px;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.light};
    }
    &:active {
        color: ${({ theme }) => theme.colors.normal};
    }

    & > svg {
        margin: 0.5rem 0.5rem;
        font-size: 1.8rem;
    }

    .badge {
        width: 12px;
        height: 12px;
        background-color: #07ff47 !important;
        color: black;
        border-radius: 3px;
        font-size: 0.7rem;
        position: absolute;
        left: 2.3rem;
        top: 0.1rem;
        padding: 1px;
    }
`;

export default MenuInfo;
