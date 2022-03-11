import axios from 'axios';
import React, { useEffect } from 'react';
import { Offcanvas, Toast, ToastContainer } from 'react-bootstrap';
import { MdNotificationImportant, MdNotificationsNone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NormalButton, WhiteButton } from '../../component/button/R2wButton';

function MessageTab({
    toggleMessage,
    setToggleMessage,
    unReadMsg,
    setUnReadMsg,
}) {
    /**---------------------------------------------------------------------------------
     *
     *  useState
     *
     *---------------------------------------------------------------------------------*/

    const navigate = useNavigate();
    useEffect(() => {
        setUnReadMsg(unReadMsg);
    }, [setUnReadMsg, unReadMsg]);

    /**---------------------------------------------------------------------------------
     *
     *  User & Envent function
     *
     *---------------------------------------------------------------------------------*/

    const readMessage = (id) => {
        axios
            .patch(process.env.REACT_APP_DB_HOST + '/Messages/' + id, {
                read: 0,
            })
            .then(() => {
                setUnReadMsg(unReadMsg.filter((msg) => msg.id !== id));
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    const allReadMessage = () => {
        for (let i = 0; i < unReadMsg.length; i++) {
            axios
                .patch(
                    process.env.REACT_APP_DB_HOST +
                        '/Messages/' +
                        unReadMsg[i].id,
                    { read: 0 },
                )
                .then((res) => {
                    setUnReadMsg(
                        unReadMsg.filter((msg) => msg.id !== res.data.id),
                    );
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    };

    const navigateDetail = (data) => {
        readMessage(data.id);
        navigate('Message/MessageReceive/MessageDetail', { state: data });
        setToggleMessage(false);
    };

    /**---------------------------------------------------------------------------------
     *
     *  Rendering Part
     *
     *---------------------------------------------------------------------------------*/
    return (
        <StyledOffcanvas
            show={toggleMessage}
            onHide={setToggleMessage}
            placement="end"
        >
            <StyledOffHeader closeButton>
                <Offcanvas.Title>
                    <MdNotificationsNone />
                    알림
                </Offcanvas.Title>
            </StyledOffHeader>
            <StyledOffBody>
                <ToastContainer>
                    {unReadMsg.map((msg) => {
                        let msgIcon;
                        switch (msg.type) {
                            case 1:
                                msgIcon = '';
                                break;
                            case 2:
                                msgIcon = <MdNotificationsNone />;
                                break;
                            case 3:
                                msgIcon = (
                                    <MdNotificationImportant
                                        style={{ color: '#F8520B' }}
                                    />
                                );
                                break;
                            default:
                                msgIcon = '';
                        }
                        return (
                            <Toast
                                show
                                onClose={() => {
                                    readMessage(msg.id);
                                }}
                                key={msg.id}
                            >
                                <Toast.Header>
                                    {msgIcon}
                                    <strong className="me-auto">
                                        {msg.writer}
                                    </strong>
                                    <small className="">{msg.date}</small>
                                </Toast.Header>
                                <Toast.Body
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigateDetail(msg)}
                                >
                                    <p>{htmlToText(msg.contents)}</p>
                                </Toast.Body>
                            </Toast>
                        );
                    })}
                </ToastContainer>
            </StyledOffBody>
            <StyledOffFooter>
                <WhiteButton
                    onClick={() => {
                        allReadMessage();
                    }}
                >
                    전체읽음
                </WhiteButton>
                <NormalButton
                    onClick={() => {
                        navigate('Message/MessageReceive', {
                            state: 'RECEIVE',
                        });
                        setToggleMessage();
                    }}
                >
                    메시지함 이동
                </NormalButton>
            </StyledOffFooter>
        </StyledOffcanvas>
    );
}

const htmlToText = (html) => {
    var divContainer = document.createElement('div');
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || '';
};

const StyledOffcanvas = styled(Offcanvas)`
    top: 50px;
`;

const StyledOffHeader = styled(Offcanvas.Header)`
    background-color: ${({ theme }) => theme.colors.light_1};
    padding: 15px;
    & .offcanvas-title {
        display: flex;
        align-items: center;
        & svg {
            font-size: 22px;
            margin-right: 5px;
        }
    }
`;

const StyledOffBody = styled(Offcanvas.Body)`
    padding: 15px;
    overflow: auto;

    & .toast-container > :not(:last-child) {
        margin-bottom: 15px;
    }

    & .toast {
        width: 100%;
        & svg {
            font-size: 16px;
            margin-right: 3px;
        }

        & .toast-header .btn-close {
            margin-right: 0px;
            font-size: 11px;
        }

        & .toast-body {
            &:hover {
                background-color: #f9f9f9;
            }
            & p {
                color: #212529;
                font-size: 14px;
                margin-bottom: 0px;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        height: 17%;
        background-color: rgba(0, 0, 0, 0.12);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0);
    }
`;

const StyledOffFooter = styled(Offcanvas.Header)`
    background-color: ${({ theme }) => theme.colors.light_2};
    padding: 15px;
    & button {
        height: 33px;
    }
`;

export default MessageTab;
