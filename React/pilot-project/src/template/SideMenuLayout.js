import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

/**
 * 
 * @param menus [제목, icon(react-icon), to(nav-link : to)]
 * ex)
 * const menus = [
*       메인 타이틀
        {
            title: "설정",
            icon: <MdSettingsApplications />,
        },
        사이드 메뉴1
        {
            title: "업무 등록",
            icon: <MdUploadFile />,
            to: "work",
        },
        {
            title: "테이블 동기화",
            icon: <MdSwapHorizontalCircle />,
            to: "sync",
        },
        {
            title: "매크로 설정",
            icon: <MdBuildCircle />,
            to: "macro",
        },
    ];
 * @returns 
 */
function SideMenuLayout({ menus, children }) {
    return (
        <Container>
            <AsideWrap>
                {menus.map((menu, i) => {
                    return i === 0 ? (
                        <>
                            <SideTitle>
                                {menu.icon} {menu.title}
                            </SideTitle>
                            <hr />
                        </>
                    ) : (
                        <NavLink to={menu.to} className="nav-link">
                            <Nav.Item>
                                {menu.icon} {menu.title}
                            </Nav.Item>
                        </NavLink>
                    );
                })}
            </AsideWrap>
            <MainWrap>{children}</MainWrap>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
`;

const AsideWrap = styled.div`
    width: 320px;
    border-right: 1px solid #a9a9a9;
    padding: 15px;
    background-color: ${({ theme }) => theme.colors.light_1};
    & a {
        margin: 2px 0px 0px 0px;
        font-size: 0.95rem;
        height: 35px;
        color: ${({ theme }) => theme.colors.gray_5};
        padding-left: 20px;
        text-align: left;
        background-color: none;
        border-radius: 3px;

        & .nav-item {
            display: flex;
            gap: 5px;
        }

        & svg {
            font-size: 20px;
        }

        &:focus,
        &:hover,
        &:active,
        &.active {
            color: black;
            background-color: ${({ theme }) => theme.colors.light_2};
        }
    }

    & hr {
        margin: 15px 0px;
    }
`;

const SideTitle = styled.div`
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    height: 35px;
    color: #ffffff;
    background-color: ${({ theme }) => theme.colors.normal_2};
    border: none;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 0px 20px;

    & svg {
        font-size: 21px;
    }

    &:hover,
    &:active,
    &:focus {
        background-color: ${({ theme }) => theme.colors.normal_3};
    }
`;

const MainWrap = styled.div`
    width: calc(100% - 320px);
    padding: 15px;
`;

export default SideMenuLayout;
