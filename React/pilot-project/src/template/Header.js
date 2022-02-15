import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import CreateMenu from '../utils/CreateMenu';
import { DepthList1, Common_depth_list_1 } from '../utils/DepthMenu';
import MenuInfo from './headerComp/MenuInfo';

function Header({ getAuth, userAuth }) {
    return (
        <HeaderWrap>
            <NavLink to="/">SQLCanvas Trans</NavLink>
            <CreateMenu menus={userAuth === '0' ? DepthList1 : Common_depth_list_1} useDepth={false} color={''} fontColor={''} size={''} />
            <div>
                <MenuInfo getAuth={getAuth} />
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
