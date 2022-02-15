import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Login from "./Login";
import "../scss/common.scss";

function Layout() {
    let [auth, setAuth] = useState("");
    let [userAuth, setUserAuth] = useState();
    auth = sessionStorage.getItem("user_id");
    userAuth = sessionStorage.getItem("userAuth");

    const getAuth = (text) => {
        setAuth(text);
    };
    const getUserAuth = (userAuthParam) => {
        setUserAuth(userAuthParam);
    };
    return (
        <>
            {auth ? (
                <>
                    <Header getAuth={getAuth} userAuth={userAuth} />
                    <Outlet />
                    <Footer />
                </>
            ) : (
                <Login getAuth={getAuth} getUserAuth={getUserAuth} />
            )}
        </>
    );
}

export default Layout;
