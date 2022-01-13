import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./template/Layout";
import Main from "./page/Main";
import Menu from "./page/Menu";
import Menu2 from "./page/Menu2";
import Menu3 from "./page/Menu3";
import Menu4 from "./page/Menu4";
import Message from "./page/message/Message";
import MessageDetail from "./page/message/MessageDetail";
import MessageWrite from "./page/message/MessageWrite";
import MessageList from "./page/message/MessageList";
import Login2 from "./template/Login2";
import { SetRoute } from "./utils/CreateMenu";
import { DepthList1 } from "./utils/DepthMenu";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login2" element={<Login2 />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Main />} />
                    {SetRoute(DepthList1)}
                    <Route path="Message" element={<Message />}>
                        <Route path="MessageReceive" element={<MessageList />} />
                        <Route path="MessageReceive/MessageDetail" element={<MessageDetail />} />
                        <Route path="MessageDispatch" element={<MessageList />} />
                        <Route path="MessageDispatch/MessageDetail" element={<MessageDetail />} />
                        <Route path="MessageWrite" element={<MessageWrite />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
