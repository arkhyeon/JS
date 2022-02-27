import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFillChatDotsFill } from 'react-icons/bs';
import Badge from 'react-bootstrap/Badge';
import MessageTab from './MessageTab';
import axios from 'axios';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from '../../utils/Cookie';

function MenuInfo({ setAuth }) {
    const navigate = useNavigate();
    const [notify, setNotify] = useState();
    const [unReadMsg, setUnReadMsg] = useState([]);
    const [toggleMessage, setToggleMessage] = useState(false);

    const getMessages = () => {
        axios
            .get(process.env.REACT_APP_DB_HOST + '/Messages')
            .then((res) => {
                setUnReadMsg(res.data.filter((item) => item.read === 1));
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const onHandleLogout = () => {
        if (!window.confirm('로그아웃하시겠습니까?')) {
            return;
        }

        setAuth(null);
        removeCookie('uid');
        removeCookie('ulevel');
        navigate('/');
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
                <BsFillChatDotsFill />
                {!toggleMessage && notify !== 0 && <Badge>{notify}</Badge>}
            </ItemWrap>
            <ItemWrap onClick={() => onHandleLogout()}>
                <MdLogout />
            </ItemWrap>
            {toggleMessage && <MessageTab toggleMessage setToggleMessage={setToggleMessage} unReadMsg={unReadMsg} setUnReadMsg={setUnReadMsg} />}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const ItemWrap = styled.div`
    position: relative;
    color: ${({ theme }) => theme.colors.light_2};
    margin: 0px 10px;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.light_3};
    }
    &:active {
        color: ${({ theme }) => theme.colors.light_3};
    }

    & > svg {
        margin: 0.5rem 0.5rem;
        font-size: 1.55rem;
    }

    .badge {
        width: 16px;
        height: 16px;
        background-color: red !important;
        color: black;
        border-radius: 100%;
        font-size: 0.75rem;
        position: absolute;
        left: 1.5rem;
        top: 0.2rem;
        padding: 1px 1px 1px 0px;
    }
`;

export default MenuInfo;
