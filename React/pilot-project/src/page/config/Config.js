import React from 'react';
import { useEffect } from 'react';
import { MdBuildCircle, MdSettings, MdSwapHorizontalCircle, MdUploadFile } from 'react-icons/md';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideMenuLayout from '../../template/SideMenuLayout';

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
    const menus = [
        {
            title: '설정',
            icon: <MdSettings />,
        },
        {
            title: '업무 등록',
            icon: <MdUploadFile />,
            to: 'work',
        },
        {
            title: '테이블 동기화',
            icon: <MdSwapHorizontalCircle />,
            to: 'sync',
        },
        {
            title: '매크로 설정',
            icon: <MdBuildCircle />,
            to: 'macro',
        },
    ];

    return (
        <SideMenuLayout menus={menus}>
            <Outlet />
        </SideMenuLayout>
    );
}

export default Config;
