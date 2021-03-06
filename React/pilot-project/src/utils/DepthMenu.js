import React from 'react';
import Work from '../page/work/Work';
import Macro from '../page/config/macro/Macro';
import Sync from '../page/config/sync/Sync';
import System from '../page/config/system/System';
import Config from '../page/config/Config';

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
 * @param {Integer} userRole(option)
 * 권한 체크
 * userRole(ulevel)이 menuRole보다 작다면 활성화
 * ex ) userRole[1] > menuRole[3] >> 활성화
 *      userRole[3] > menuRole[1] >> 비활성
 * @param {Array} subMenu(option)
 *  - 해당 메뉴 하위로 나올 메뉴
 *
 * @return
 * function CreateMenu = title, link, subMenu 사용
 * function setRoute   = title, link, subMenu, component 사용
 */
export const DepthList1 = [
    {
        title: '작업',
        link: '/',
        component: <Work />,
        menuRole: 3,
    },
    {
        title: '설정',
        link: 'config',
        routePath: 'config/*',
        component: <Config />,
        menuRole: 1,
        subMenu: [
            {
                id: 5_1,
                title: '-1도맑음',
                link: '/work',
                routePath: 'work',
                component: <System />,
            },
            {
                id: 5_2,
                title: '캡쳐도구',
                link: '/sync',
                routePath: 'sync',
                component: <Sync />,
            },
            {
                id: 5_3,
                title: '검색하려면 여기에 입력하십',
                link: '/macro',
                routePath: 'macro',
                component: <Macro />,
            },
        ],
    },
];
