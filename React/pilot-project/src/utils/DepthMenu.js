import React from "react";
import Work from "../page/work/Work";
import Macro from "../page/config/macro/Macro";
import Sync from "../page/config/sync/Sync";
import System from "../page/config/system/System";
import Config from "../page/config/Config";

//Fix 22.01.13

/**
 * @param {String} title
 * 메뉴에 들어갈 텍스트, map key 역할[unique]
 * @param {String} link(option)
 * URL Path
 * NavLink to={link}
 * routePath가 없으면 link가 routePath로 설정
 * @param {String} routePath(option)
 * routePath
 * Route path={routePath}
 * @param {component} component(option)
 * 해당 URL에 보여줄 컴포넌트
 * Route element={component}
 * @param {Array} subMenu(option)
 *  - 해당 메뉴 하위로 나올 메뉴
 *
 * @return
 * function CreateMenu = title, link, subMenu 사용
 * function setRoute   = title, link, subMenu, component 사용
 */
export const DepthList1 = [
    {
        title: "작업",
        link: "/",
        component: <Work />,
    },
    {
        title: "설정",
        link: "config",
        routePath: "config/*",
        component: <Config />,
        subMenu: [
            {
                id: 5_1,
                title: "업무 등록",
                link: "/work",
                routePath: "work",
                component: <System />,
            },
            {
                id: 5_2,
                title: "테이블 동기화",
                link: "/sync",
                routePath: "sync",
                component: <Sync />,
            },
            {
                id: 5_3,
                title: "매크로 설정",
                link: "/macro",
                routePath: "macro",
                component: <Macro />,
            },
        ],
    },
];

export const Common_depth_list_1 = [
    {
        id: 1,
        title: "작업",
        link: "/",
        component: <Work />,
    },
];
