import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { getCookie } from '../utils/Cookie';
import CreateMenu from '../utils/CreateMenu';
import { DepthList1 } from '../utils/DepthMenu';
import MenuInfo from './headerComp/MenuInfo';

function Header({ setAuth }) {
    return (
        <HeaderWrap>
            <NavLink to="/">SQLCanvas Trans</NavLink>
            <CreateMenu
                menus={DepthList1}
                useDepth={false}
                color={''}
                fontColor={''}
                size={''}
                userRole={getCookie('ulevel')}
            />
            <div>
                <MenuInfo setAuth={setAuth} />
            </div>
        </HeaderWrap>
    );
}

export default Header;

const HeaderWrap = styled.div`
    width: 100%;
    background: ${({ theme }) => theme.colors.dark_2};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    height: 50px;
    position: relative;
    z-index: 10;

    & > a {
        font-weight: bold;
        font-size: 26px;
        color: ${({ theme }) => theme.colors.light_1};
        font-family: 'arial';
    }
`;
