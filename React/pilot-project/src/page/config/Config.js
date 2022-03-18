import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AsideMenuLayout from "../../template/AsideMenuLayout";
import { ConfigMenus } from "../../utils/AsideMenu";

function Config() {
    const sampleLocation = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (sampleLocation.pathname === '/config') {
            navigate('work');
        }
    }, []);
    if (sampleLocation.pathname === '/config') {
        navigate('work');
    }

    return (
        <AsideMenuLayout menus={ConfigMenus}>
            <Outlet />
        </AsideMenuLayout>
    );
}

export default Config;
