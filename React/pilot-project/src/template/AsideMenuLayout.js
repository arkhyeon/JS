import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';
import { MdArrowBackIosNew } from 'react-icons/md';

function AsideMenuLayout({ menus, children }) {
    const resizeAside = useRef();
    const navigate = useNavigate();
    const [resizer, setResizer] = useState({
        currentScreenX: 0,
        mouseActive: false,
        currentWidth: 0,
        maxWidth: 0,
    });

    useEffect(() => {
        collapseStyle(window.sessionStorage.getItem('AsideWidth') || 265);
    }, []);

    const resizingStart = (e) => {
        document.body.style.userSelect = 'none';

        setResizer({
            currentScreenX: e.screenX,
            mouseActive: true,
            currentWidth: resizeAside.current.clientWidth,
            maxWidth: window.innerWidth,
        });
    };

    window.onmousemove = (e) => resizing(e);

    const resizing = _.debounce((e) => {
        if (resizer.mouseActive) {
            const move = e.screenX - resizer.currentScreenX;
            const newWidth = resizer.currentWidth + move;

            resizeAside.current.style.width = newWidth + 'px';

            collapseStyle(newWidth);
        }
    }, 1);

    const collapseStyle = (currentWidth) => {
        const classList = resizeAside.current.classList;

        classList.toggle('narrow', currentWidth > 160 && currentWidth < 193);
        classList.toggle('narrower', currentWidth <= 160);

        if (!resizer.mouseActive) {
            resizeAside.current.style.width = currentWidth + 'px';
        }

        window.sessionStorage.setItem('AsideWidth', currentWidth);
    };

    window.onmouseup = (e) => resizingDone(e);

    const resizingDone = () => {
        document.body.style.userSelect = 'unset';
        console.log(resizer);
        setResizer({ ...resizer, mouseActive: false });
    };

    const toggleCollapse = () => {
        const isNarrower = resizeAside.current.classList.contains('narrower');
        isNarrower ? collapseStyle(265) : collapseStyle(83);
    };

    return (
        <Container sytle={{ cursor: 'pointer' }}>
            <AsideWrap ref={resizeAside}>
                {menus.map((menu, i) => {
                    return menu.isTitle ? (
                        <Fragment key={menu.title}>
                            {menu.navigate ? (
                                <SideTitle
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(menu.navigate)}
                                >
                                    {menu.icon} <span>{menu.title}</span>
                                </SideTitle>
                            ) : (
                                <SideTitle>
                                    {menu.icon} <span>{menu.title}</span>
                                </SideTitle>
                            )}
                            <hr />
                        </Fragment>
                    ) : (
                        <NavLink
                            key={menu.title}
                            to={menu.to}
                            className="nav-link"
                            state={menu.state}
                        >
                            <Nav.Item>
                                {menu.icon} <span>{menu.title}</span>
                            </Nav.Item>
                        </NavLink>
                    );
                })}
                <hr />
                <ToggleButton onClick={() => toggleCollapse()}>
                    <MdArrowBackIosNew />
                </ToggleButton>
            </AsideWrap>
            <ResizerBar onMouseDown={(e) => resizingStart(e)} />
            <MainWrap>{children}</MainWrap>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
`;

const AsideWrap = styled.div`
    width: 265px;
    max-width: 265px;
    min-width: 83px;
    padding: 15px;
    background-color: ${({ theme }) => theme.colors.light_1};

    & a {
        margin: 2px 0px 0px 0px;
        font-size: 0.95rem;
        color: ${({ theme }) => theme.colors.gray_5};
        text-align: left;
        border-radius: 3px;
        padding: 7px 16px 7px 20px;

        & .nav-item {
            display: flex;
            gap: 5px;
            height: 21px;
            align-items: center;
            line-height: 15px;
        }

        & svg {
            font-size: 20px;
            min-width: 20px;
            display: block;
        }

        & span {
            display: block;
        }

        &:focus,
        &:hover,
        &:active,
        &.active {
            color: black;
            background-color: ${({ theme }) => theme.colors.light_2};
        }
    }

    &.narrow a {
        padding: 7px 12px 7px 16px;
        & .nav-item {
            flex-direction: column;
            height: auto;
        }

        & svg {
            font-size: 23px;
        }

        & span {
            text-align: center;
            font-size: 0.9em;
        }
    }

    &.narrower {
        & > div {
            padding: 0;
        }

        a {
            padding: 7px 0px 7px 0px;
        }

        svg {
            margin: 0 auto;
            font-size: 22px;
        }

        span {
            display: none;
        }

        & > div:last-child svg {
            transform: rotate(180deg);
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
`;

const MainWrap = styled.div`
    flex: 1;
    padding: 15px;
`;

const ResizerBar = styled.div`
    width: 4px;
    background-color: ${({ theme }) => theme.colors.light_1};
    border-right: 1px solid #a9a9a9;
    cursor: ew-resize;

    &:hover {
        border-right: 3px solid #a9a9a9;
    }
`;

const ToggleButton = styled.div`
    width: 35px;
    height: 35px;
    background-color: ${({ theme }) => theme.colors.light_2};
    border-radius: 3px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        color: black;
        background-color: ${({ theme }) => theme.colors.light_3};
    }

    & svg {
        font-size: 20px;
        color: ${({ theme }) => theme.colors.dark_2};
    }
`;

export default AsideMenuLayout;
