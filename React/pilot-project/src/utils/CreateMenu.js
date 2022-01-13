import { darken, lighten } from "polished";
import React, { useRef, useState } from "react";
import { Route, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

/**
 * @param {Array} menus
 * EX) Auth : {userLevel === "0" ? [AdminArray] : [UserArray]}
 *      OR
 *     Common : {[Array]}
 * @param {String} color
 * @param {String} fontColor
 * EX) {"#0b2444"} Or {"red"}
 *      If a color value exists, use the color value first.
 *      If not, use the theme provider color
 *      color 값 O > color 이용
 *      color 값 X > theme provider color 이용
 *      theme provider 사용 시 테마 색을 먼저 이용합니다.
 * @param {String} size
 * EX) {"WidthPadding HeightPaaing"} => {"14.5px 40px"}
 *
 * @returns {Component} Menu Component
 */

const CreateMenu = (props) => {
    const menus = props.menus[0];
    const [selectedMenus, setSelectedMenus] = useState([]);
    const handleMenuSelection = (label, depth) => {
        setSelectedMenus((selectedMenus) => {
            const newSelectedMenus = [...selectedMenus];
            newSelectedMenus.length = depth;
            if (label !== "") {
                newSelectedMenus[depth] = label;
            }
            return newSelectedMenus;
        });
    };

    return (
        <>
            <CreateMenu.List onMouseLeave={() => setSelectedMenus([])}>
                {menus.map((menu) => {
                    return (
                        <SidebarItem
                            menu={menu}
                            handleMenuSelection={handleMenuSelection}
                            key={menu.id}
                            selectedMenus={selectedMenus}
                            color={props.color}
                            fontColor={props.fontColor}
                            size={props.size}
                        />
                    );
                })}
            </CreateMenu.List>
        </>
    );
};

/**
 * @param {Object} menu
 * The object from the repeated sentence.
 * 반복문에서 나온 객체
 * @param {Function} handleMenuSelection
 * Where's my mouse?
 * 어디에 hover 되었는가?
 * @param {Function} selectedMenus
 * useState setState Function
 * 상태 관리
 * @param {String} color
 * @param {String} fontColor
 * Color assigned from the outside.
 * 제일 바깥 props에서 할당된 색
 * @param {String} size
 * EX) {"WidthPadding HeightPaaing"} => {"14.5px 40px"}
 * @param {int}} depth
 * What's the depth?
 * @returns {Component} Menu Unit Componet
 */
const SidebarItem = ({ menu, handleMenuSelection, selectedMenus, color, fontColor, size, depth = 0 }) => {
    const { title, link = "", icon, subMenu = [] } = menu;
    return (
        <>
            {subMenu.length > 0 ? (
                <SidebarItem.Item color={color} fontColor={fontColor} size={size}>
                    <NavLink
                        to={link}
                        onMouseEnter={() => handleMenuSelection(title, depth)}
                        onClick={(event) => event.preventDefault()}
                        style={{ cursor: "default" }}
                    >
                        {icon}
                        {title}
                    </NavLink>
                    {selectedMenus[depth] === title && (
                        <SidebarItem.List depth={depth} className="subMenuItem" color={color}>
                            {subMenu.map((child, i) => {
                                const childDepth = depth + 1;
                                return (
                                    <SidebarItem
                                        menu={child}
                                        handleMenuSelection={handleMenuSelection}
                                        key={`sub-${title}-${i}`}
                                        depth={childDepth}
                                        selectedMenus={selectedMenus}
                                        color={color}
                                        fontColor={fontColor}
                                        size={size}
                                    />
                                );
                            })}
                        </SidebarItem.List>
                    )}
                </SidebarItem.Item>
            ) : (
                <SidebarItem.Item
                    color={color}
                    fontColor={fontColor}
                    size={size}
                    onMouseEnter={() => handleMenuSelection("", depth)}
                    onClick={() => handleMenuSelection("", 0)}
                    className={"mainActive"}
                >
                    <NavLink to={link}>
                        {icon}
                        {title}
                    </NavLink>
                </SidebarItem.Item>
            )}
        </>
    );
};

CreateMenu.List = styled.ul`
    display: flex;
`;
SidebarItem.List = styled.ul`
    & li {
        border-bottom: 1px solid rgb(77, 85, 95);
    }

    & li:nth-child(1) {
        border-top: 1px solid rgb(120, 127, 138);
    }
    & > li > a {
        float: left;
    }
    position: absolute;
    opacity: 0.95;
    transition: 0.5s;
    flex-direction: column;
    display: flex;
    background-color: ${(props) => props.color || props.theme.menuColor};
    .subMenuItem {
        left: 100%;
        float: left;
        margin-top: -1px;
    }
`;
SidebarItem.Item = styled.li`
    ${(props) => {
        return css`
            &:hover > a,
            & .active {
                color: ${darken(0.2, props.fontColor || props.theme.menuFontColor)};
                background: ${lighten(0.1, props.color || props.theme.menuColor)};
            }

            .subMenuItem &:active > a,
            &.mainActive:active > a {
                color: ${lighten(0.2, props.fontColor || props.theme.menuFontColor)};
                background: ${darken(0.05, props.color || props.theme.menuColor)};
            }
        `;
    }}

    & svg {
        position: relative;
        top: 2px;
        left: -2px;
    }

    & a {
        width: 100%;
        padding: ${(props) => props.size || "14.5px 40px"};
        display: block;
        margin: 0px;
        color: ${(props) => props.fontColor || props.theme.menuFontColor};
        background-color: ${(props) => props.color || props.theme.menuColor};
    }
`;

export const SetRoute = (props) => {
    const routes = props;
    const nextId = useRef(1);

    return (
        <>
            {routes.map((route) => {
                return SubRoute(route, nextId);
            })}
        </>
    );
};

const SubRoute = (route, nextId, depth = 0) => {
    const { component, link = "", subMenu = [] } = route;
    nextId.current += 1;
    return (
        <>
            {subMenu.length > 0 ? (
                <Route key={route.title} path={link} element={component}>
                    {subMenu.map((child) => {
                        nextId.current += 1;
                        const childDepth = depth + 1;
                        return SubRoute(child, nextId, childDepth);
                    })}
                </Route>
            ) : (
                <Route key={route.title} path={link} element={component} />
            )}
        </>
    );
};

export default CreateMenu;
