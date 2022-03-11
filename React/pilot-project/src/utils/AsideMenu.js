import {
    MdBuildCircle,
    MdEmail,
    MdSend,
    MdSettings,
    MdSwapHorizontalCircle,
    MdUploadFile,
} from 'react-icons/md';
import React from 'react';

export const ConfigMenus = [
    {
        title: '설정',
        icon: <MdSettings />,
        isTitle: true,
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

export const MessageMenus = [
    {
        title: '메시지 작성',
        icon: (
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                role="img"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title></title>
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"></path>
            </svg>
        ),
        navigate: 'MessageWrite',
        isTitle: true,
    },
    {
        title: '받은 메시지',
        icon: <MdEmail />,
        to: 'MessageReceive',
        state: 'RECEIVE',
    },
    {
        title: '보낸 메시지',
        icon: <MdSend />,
        to: 'MessageDispatch',
        state: 'DISPATCH',
    },
];
