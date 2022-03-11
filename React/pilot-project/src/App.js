import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './template/Layout';
import Login from './template/Login';
import { getCookie } from './utils/Cookie';
import { setMsgRoute, SetRoute } from './utils/CreateMenu';
import { DepthList1 } from './utils/DepthMenu';

function App() {
    const [auth, setAuth] = useState(getCookie('ulevel'));
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        auth ? (
                            <Layout setAuth={setAuth} />
                        ) : (
                            <Login setAuth={setAuth} />
                        )
                    }
                >
                    {SetRoute(DepthList1, auth)}
                    {auth && setMsgRoute()}
                    <Route path={'*'} element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
