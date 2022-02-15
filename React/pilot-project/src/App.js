import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./template/Layout";
import { SetRoute, setMsgRoute } from "./utils/CreateMenu";
import { DepthList1 } from "./utils/DepthMenu";
//TODO : themeprovider
//TODO : universal cookie
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    {SetRoute(DepthList1)}
                    {setMsgRoute()}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
