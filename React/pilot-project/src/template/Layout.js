import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import '../scss/common.scss';

function Layout({ setAuth }) {
    return (
        <>
            <Header setAuth={setAuth} />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;
