import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Login from "../page/Login";

function Layout({ getTheme }) {
    let [auth, setAuth] = useState("");
    // const [theme, setTheme] = useState('light');
    auth = sessionStorage.getItem("user_id");

    const getAuth = (text) => {
        setAuth(text);
    };
    return (
        <>
            {auth ? (
                <>
                    <Header getAuth={getAuth} />
                    <Outlet />
                    <Footer />
                </>
            ) : (
                <Login getAuth={getAuth} />
            )}
        </>
    );
}

export default Layout;
