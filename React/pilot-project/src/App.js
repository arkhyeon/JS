import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './template/Layout';
import Login from './template/Login';
import { getCookie, setCookie } from './utils/Cookie';
import { setMsgRoute, SetRoute } from './utils/CreateMenu';
import { DepthList1 } from './utils/DepthMenu';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = '/KPOST47/';
axios.defaults.headers.common['authorization'] = getCookie('authorization');

axios.interceptors.response.use(
    function (response) {
        console.log(
            '%cURL Info : ' + response.config.url + '-------------------------------------',
            'background: #000; color: #bada55',
        );
        console.log(response.data.data);
        console.log(
            '%c------------------------------------------------------------',
            'background: #000; color: #bada55',
        );
        if (response.data.data === null) {
            return response;
        } else {
            return response.data.data;
        }
    },
    (error) => {
        console.log(
            '%cURL Info : ' + error.config.url + '-------------------------------------',
            'background: #000; color: #2CD4A8',
        );
        console.log(error.response);
        console.log(
            '%cError Code : ' + error.response.status + ' ' + error.response.statusText,
            'background: #000; color: #2CD4A8',
        );
        alert(error.response.status + ' ' + error.response.statusText);
        return Promise.reject(error);
    },
);

function App() {
    const [auth, setAuth] = useState(getCookie('ulevel'));
    try {
        const decoded = jwt_decode(getCookie('authorization'));
        setCookie('ulevel', decoded.level);
    } catch (e) {}

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={auth ? <Layout setAuth={setAuth} /> : <Login setAuth={setAuth} />}
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
