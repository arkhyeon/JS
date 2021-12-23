import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { MdNotificationImportant, MdNotifications, MdSettings } from "react-icons/md";
import styled from "styled-components";

function MessageTab({ refId, setToggleMessage, MsgContents }) {
    const [msgList, setMsgList] = useState(MsgContents);
    useEffect(() => {
        function handleClickOutside(event) {
            setMsgList(MsgContents);
            if (refId.current && !refId.current.contains(event.target)) {
                setToggleMessage(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refId, setToggleMessage, MsgContents]);

    return (
        <MessageWrap>
            <MessageHeader>
                <span>알림</span>
                <MdSettings />
            </MessageHeader>
            <MessageMain>
                {msgList.map((msg) => {
                    let msgIcon;
                    switch (msg.type) {
                        case 1:
                            msgIcon = <MdNotifications />;
                            break;
                        case 2:
                            msgIcon = <MdNotificationImportant style={{ color: "#dc3545" }} />;
                            break;
                        case 3:
                            msgIcon = "";
                            break;
                        case 4:
                            msgIcon = "";
                            break;
                        case 5:
                            msgIcon = "";
                            break;
                        case 6:
                            msgIcon = "";
                            break;
                        default:
                            msgIcon = "";
                    }
                    return (
                        <Message key={msg.id}>
                            <h6>
                                {msgIcon} {msg.writer} <span className="msg_date">{msg.date}</span>
                            </h6>
                            <p>{msg.contents}</p>
                        </Message>
                    );
                })}

                <Message>
                    <h6>
                        <MdNotifications /> [공지] Admin <span className="msg_date">2021-12-22 13:53</span>
                    </h6>
                    <p>Test, which is a new approach to have all solutions astrology under one roof.</p>
                </Message>
                <Message>
                    <h6>
                        <MdNotificationImportant style={{ color: "#dc3545" }} /> Admin <span className="msg_date">2021-12-22 13:53</span>
                    </h6>
                    <p>Test, which is a new approach to have all solutions astrology under one roof.</p>
                </Message>
                <Message>
                    <h6>
                        TransPost <span className="msg_date">2021-12-22 13:53</span>
                    </h6>
                    <p>Test, which is a new approach to have all solutions astrology under one roof.</p>
                </Message>
            </MessageMain>
            <MessageFooter>
                <Button variant="secondary" size="sm">
                    전체 읽음
                </Button>
                <Button size="sm">메세지함 이동</Button>
            </MessageFooter>
        </MessageWrap>
    );
}

const MessageWrap = styled.div`
    width: 320px;
    position: absolute;
    background-color: #f8f8f8;
    margin-top: 45px;
    margin-left: -135px;
    color: #212529;
    box-shadow: -2px 5px 8px rgb(0 0 0 / 50%);
    border-radius: 5px;
`;

const MessageHeader = styled.div`
    padding: 9px 16px 5px;
    margin: 0px 10px;
    text-align: center;
    border-bottom: 1px solid #c4c4c4;
    font-size: 14px;
    & > svg {
        width: 18px;
        height: 18px;
        cursor: pointer;
        float: right;
        transition: 0.4s;
        &:hover {
            color: #0083e0;
        }
    }
`;

const MessageMain = styled.div`
    overflow-y: auto;
    max-height: 535px;

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

const Message = styled.div`
    padding: 18px 16px 10px;
    background: rgba(198, 212, 224, 0.2);
    margin: 12px 10px;
    transition: 0.3s;
    &:hover {
        background: rgba(198, 212, 224, 0.4);
    }
    & p {
        font-size: 14px;
        margin-bottom: 0px;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    & svg {
        width: 18px;
        height: 18px;
        position: relative;
        top: -2px;
    }
    & h6 {
        line-height: 18px;
    }

    & .msg_date {
        font-size: 12px;
        float: right;
    }
`;

const MessageFooter = styled.div`
    padding: 6px 16px 5px;
    margin: 5px 10px;
    display: flex;
    justify-content: space-between;

    & button:nth-child(1) {
        background: #e8eef3;
        color: #414b55;
        border: 1px solid #f8f8f8;
        &:hover {
            border: 1px solid #6c757d;
        }
    }

    & button {
        height: 26px;
        font-size: 13px;
        padding: 0 13px;
        background-repeat: no-repeat;
        vertical-align: top;
        border-radius: 100px;
    }
`;

export default MessageTab;
