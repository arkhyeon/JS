import React, { useState } from "react";
import { Route, NavLink } from "react-router-dom";
import styled from "styled-components";
import Message from "../page/message/Message";
import MessageDetail from "../page/message/MessageDetail";
import MessageList from "../page/message/MessageList";
import MessageWrite from "../page/message/MessageWrite";

//Fix 22.01.13

/**
 * @param {Array} menus
 * EX) Auth : {userLevel === "0" ? [AdminArray] : [UserArray]}
 *      OR
 *     Common : {[Array]}
 * @param {Boolean} useDepth
 * 사이드 메뉴 사용할 때 Depth를 사용할 것인지 아닌지
 * true : Depth 이용 메뉴
 * false : Depth없이 메뉴
 * @param {String} color
 * @param {String} fontColor
 * EX) {"#0b2444"} Or {"red"}
 *      If a color value exists, use the color value first.
 *      If not, use the theme provider color
 *      color 값 O > color 이용
 *      color 값 X > theme provider color 이용
 *      theme provider 사용 시 테마 색을 먼저 이용합니다.
 * @param {String} size
 * EX) {"WidthPadding HeightPaaing"} => {"13px 40px"}
 *
 * @returns {Component} Menu Component
 */

const CreateMenu = (props) => {
    const menus = props.menus;
    const [selectedMenus, setSelectedMenus] = useState([]);

    const handleMenuSelection = (label, depth) => {
        setSelectedMenus((selectedMenus) => {
            const newSelectedMenus = [...selectedMenus];
            //depth만큼 잘라준다
            newSelectedMenus.length = depth;
            //서브메뉴가 없을 때
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
                        <DepthItem
                            menu={menu}
                            handleMenuSelection={handleMenuSelection}
                            key={menu.title}
                            selectedMenus={selectedMenus}
                            color={props.color}
                            fontColor={props.fontColor}
                            size={props.size}
                            useDepth={props.useDepth}
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
 * @param {Boolean} useDepth
 * 사이드 메뉴 사용할 때 Depth를 사용할 것인지 아닌지
 * true : Depth 이용 메뉴
 * false : Depth없이 메뉴
 * @param {String} color
 * @param {String} fontColor
 * Color assigned from the outside.
 * CreateMenu 선언부 props에서 할당된 색
 * @param {String} size
 * EX) {"WidthPadding HeightPaaing"} => {"13px 40px"}
 * @param {int} depth
 * depth Level
 * @returns {Component} Menu Unit Component
 */
const DepthItem = ({ menu, handleMenuSelection, selectedMenus, color, fontColor, size, useDepth = true, depth = 0 }) => {
    const { title, link = "", subMenu = [] } = menu;

    return (
        <>
            {subMenu.length > 0 && useDepth ? (
                <DepthItem.Item color={color} fontColor={fontColor} size={size}>
                    <NavLink
                        to={link}
                        onMouseEnter={() => handleMenuSelection(title, depth)}
                        onClick={(event) => event.preventDefault()}
                        style={{ cursor: "default" }}
                    >
                        {title}
                    </NavLink>
                    {selectedMenus[depth] === title && (
                        <DepthItem.List depth={depth} className="subMenuItem" color={color}>
                            {subMenu.map((child, i) => {
                                const childDepth = depth + 1;
                                return (
                                    <DepthItem
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
                        </DepthItem.List>
                    )}
                </DepthItem.Item>
            ) : (
                <DepthItem.Item
                    color={color}
                    fontColor={fontColor}
                    size={size}
                    onMouseEnter={() => handleMenuSelection("", depth)}
                    onClick={() => handleMenuSelection("", 0)}
                    className={"mainActive"}
                >
                    <NavLink to={link}>{title}</NavLink>
                </DepthItem.Item>
            )}
        </>
    );
};

CreateMenu.List = styled.ul`
    display: flex;
`;

DepthItem.List = styled.ul`
    & li {
        border-bottom: 1px solid ${({ theme }) => theme.colors.normal_1};
    }

    & li:nth-child(1) {
        border-top: 1px solid ${({ theme }) => theme.colors.normal_1};
    }
    & > li > a {
        float: left;
    }
    position: absolute;
    opacity: 0.95;
    transition: 0.5s;
    flex-direction: column;
    display: flex;
    .subMenuItem {
        width: 100%;
        left: 100%;
        float: left;
        margin-top: -1px;
    }
`;

DepthItem.Item = styled.li`
    &:hover > a,
    & .active,
    .subMenuItem &:active > a,
    &.mainActive:active > a {
        color: ${(props) => props.fontColor || "#ffffff"};
        background: ${(props) => props.fontColor || props.theme.colors.normal_3};
    }

    & a {
        width: 100%;
        padding: ${(props) => props.size || "13px 40px"};
        display: block;
        margin: 0px;
        color: ${(props) => props.fontColor || props.theme.colors.light_1};
        background-color: ${(props) => props.color || props.theme.colors.dark_2};
    }

    & ul li a {
        padding: ${(props) => props.size || "10px 40px"};
        font-size: 0.9rem;
    }
`;

/**
 * Route Component를 props에 맞게 자동 생성(재귀 SubRoute())
 * @param {Array{Object}} props
 * @returns
 * Route Component
 */
export const SetRoute = (props) => {
    const routes = props;

    return (
        <>
            {routes.map((route) => {
                return SubRoute(route);
            })}
        </>
    );
};

/**
 *
 * @param {Object} route
 * @param {int} depth
 * depth Level
 * @returns
 * Route Component
 */
const SubRoute = (route, depth = 0) => {
    const { component, link = "", title, subMenu = [], routePath } = route;
    return (
        <>
            {subMenu.length > 0 ? (
                <Route key={title} path={routePath ? routePath : link} element={component}>
                    {subMenu.map((child) => {
                        const childDepth = depth + 1;
                        return SubRoute(child, childDepth);
                    })}
                </Route>
            ) : (
                <Route key={title} path={routePath ? routePath : link} element={component} />
            )}
        </>
    );
};

//Message Route Component 생성 함수
export const setMsgRoute = () => {
    return (
        <Route path="Message" element={<Message />}>
            <Route path="MessageReceive" element={<MessageList />} />
            <Route path="MessageReceive/MessageDetail" element={<MessageDetail />} />
            <Route path="MessageDispatch" element={<MessageList />} />
            <Route path="MessageDispatch/MessageDetail" element={<MessageDetail />} />
            <Route path="MessageWrite" element={<MessageWrite />} />
        </Route>
    );
};

export default CreateMenu;
