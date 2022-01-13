import axios from "axios";
import React, { useEffect } from "react";
import { Button, Offcanvas, Toast, ToastContainer } from "react-bootstrap";
import { MdNotificationImportant, MdNotifications } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function MessageTab({ toggleMessage, setToggleMessage, unReadMsg, setUnReadMsg }) {
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
            .patch(process.env.REACT_APP_DB_HOST + "/Messages/" + id, { read: 0 })
            .then(() => {
                setUnReadMsg(unReadMsg.filter((msg) => msg.id !== id));
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    const allReadMessage = () => {
        setUnReadMsg([]);
    };

    const navigateDetail = (data) => {
        readMessage(data.id);
        navigate("Message/MessageReceive/MessageDetail", { state: data });
        setToggleMessage(false);
    };

    /**---------------------------------------------------------------------------------
     *
     *  Rendering Part
     *
     *---------------------------------------------------------------------------------*/
    return (
        <Offcanvas show={toggleMessage} onHide={setToggleMessage} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>알림</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <hr />
                <ToastContainer>
                    {unReadMsg.map((msg) => {
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
                            <Toast
                                show
                                onClose={() => {
                                    readMessage(msg.id);
                                }}
                                key={msg.id}
                            >
                                <Toast.Header>
                                    {msgIcon}
                                    <strong className="me-auto">{msg.writer}</strong>
                                    <small className="">{msg.date}</small>
                                </Toast.Header>
                                {/* <NavLink to="/"> */}
                                <Toast.Body style={{ cursor: "pointer" }} onClick={() => navigateDetail(msg)}>
                                    <p>{htmlToText(msg.contents)}</p>
                                </Toast.Body>
                                {/* </NavLink> */}
                            </Toast>
                        );
                    })}
                </ToastContainer>
            </Offcanvas.Body>
            <Offcanvas.Header>
                <Button
                    onClick={() => {
                        allReadMessage();
                    }}
                    variant="secondary"
                    size="sm"
                >
                    전체 읽음
                </Button>
                <Button
                    size="sm"
                    onClick={() => {
                        navigate("Message/MessageReceive", { state: "RECEIVE" });
                        setToggleMessage();
                    }}
                >
                    메세지함 이동
                </Button>
            </Offcanvas.Header>
        </Offcanvas>
    );
}

const htmlToText = (html) => {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
};

export default MessageTab;
