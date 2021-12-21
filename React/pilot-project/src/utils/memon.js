import React, { Component, useState } from "react";
import styled, { css } from "styled-components";
import { darken, lighten } from "polished";
import { NavLink } from "react-router-dom";

function R2wCreateMenu({ menus }) {
    const depthList = menus[0] || [];
    const MenuList = ({ depthList, depthLevel = 0, a }) => {
        depthLevel++;
        // console.log(a + " " + depthLevel);
        console.log(depthLevel);
        return (
            <>
                {depthList.map((menu, i) => {
                    return (
                        <>
                            {/* {console.log(i + " " + menu.title)} */}
                            {menu.subMenu.length > 0 ? (
                                <MenuItem key={menu.id}>
                                    <NavLink to={menu.link}>
                                        {menu.icon}
                                        {menu.title}
                                    </NavLink>
                                    <ul key={i} className={"subMenuItem"}>
                                        <MenuList key={i} a={menu.title} depthList={menu.subMenu} depthLevel={depthLevel} />
                                    </ul>
                                </MenuItem>
                            ) : (
                                <MenuItem key={menu.id}>
                                    <NavLink to={menu.link}>
                                        {menu.icon}
                                        {menu.title}
                                    </NavLink>
                                </MenuItem>
                            )}
                        </>
                    );
                })}
            </>
        );
    };
    return (
        <MenuWrap lv={3}>
            <MenuList key="99" depthList={depthList} depthLevel={0} />
        </MenuWrap>
        // <MenuWrap>
        //     {depth_list_1.map((depth_1) => (
        //         <MenuItem key={depth_1.id} className={depth_1.title}>
        //             <NavLink to={depth_1.link}>
        //                 {depth_1.icon}
        //                 {depth_1.title}
        //             </NavLink>
        //             {depth_1.id === 2 ? (
        //                 <ul className="subMenuItem">
        //                     {depth_list_2.map((depth_2) => (
        //                         <li key={depth_2.id}>
        //                             <NavLink to={depth_2.link}>
        //                                 {depth_2.icon}
        //                                 {depth_2.title}
        //                             </NavLink>
        //                             {depth_2.id % 3 === 0 ? (
        //                                 <ul className="subSubMenuItem">
        //                                     {depth_list_3.map((depth_3) => (
        //                                         <li key={depth_3.id}>
        //                                             <NavLink to={depth_3.link}>
        //                                                 {depth_3.icon}
        //                                                 {depth_3.title}
        //                                             </NavLink>
        //                                         </li>
        //                                     ))}
        //                                 </ul>
        //                             ) : (
        //                                 ""
        //                             )}
        //                         </li>
        //                     ))}
        //                 </ul>
        //             ) : (
        //                 ""
        //             )}
        //         </MenuItem>
        //     ))}
        // </MenuWrap>
    );
}

export default R2wCreateMenu;

const MenuWrap = styled.ul`
    display: flex;
    & > li:hover {
        & .subMenuItem2 {
            display: flex;
        }
    }

    /* & > li:hover {
        & > ul {
            display: flex;
            & > li:hover {
                & > ul {
                    display: flex;
                }
            }
        }
    } */
`;

const MenuItem = styled.li`
    float: left;
    ${({ theme }) => {
        return css`
            &:hover,
            & .active {
                background: ${lighten(0.1, theme.color)};
            }

            &:active {
                background: ${darken(0.05, theme.color)};
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
        padding: 14.5px 40px;
        display: block;
        color: #fafafa;
    }

    & > ul > li > ul > li,
    & > ul > li {
        ${({ theme }) => {
            return css`
                &:hover {
                    transition: 0.6s;
                    background: ${lighten(0.1, theme.color)};
                }
                &:active {
                    background: ${darken(0.05, theme.color)};
                }
            `;
        }}
    }
`;



import { darken, lighten } from "polished";
import React, { useState } from "react";
import styled, { css } from "styled-components";

const R2wCreateMenu = (props) => {
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
        <R2wCreateMenu.List>
            {menus.map((menu) => {
                return <SidebarItem menu={menu} handleMenuSelection={handleMenuSelection} key={menu.id} selectedMenus={selectedMenus} />;
            })}
        </R2wCreateMenu.List>
    );
};

const SidebarItem = ({ menu, handleMenuSelection, selectedMenus, depth = 0 }) => {
    const { title, link, subMenu = [] } = menu;
    return (
        <>
            {subMenu.length > 0 ? (
                <SidebarItem.Item>
                    <SidebarItem.Anchor href={link} onMouseEnter={() => handleMenuSelection(title, depth)}>
                        {title}
                    </SidebarItem.Anchor>
                    {selectedMenus[depth] === title && (
                        <SidebarItem.List depth={depth} className="subMenuItem">
                            {subMenu.map((child, i) => {
                                // const { title } = child;
                                const childDepth = depth + 1;
                                return (
                                    <SidebarItem
                                        menu={child}
                                        handleMenuSelection={handleMenuSelection}
                                        key={`child--${i}`}
                                        depth={childDepth}
                                        selectedMenus={selectedMenus}
                                    />
                                );
                            })}
                        </SidebarItem.List>
                    )}
                </SidebarItem.Item>
            ) : (
                <SidebarItem.Item onMouseEnter={() => handleMenuSelection("", depth)}>
                    <SidebarItem.Anchor href={link}>{title}</SidebarItem.Anchor>
                </SidebarItem.Item>
            )}
        </>
    );
};

R2wCreateMenu.List = styled.ul`
    display: flex;
`;
SidebarItem.List = styled.ul``;
SidebarItem.Item = styled.li`
    /* float: left; */
    ${({ theme }) => {
        return css`
            &:hover,
            & .active {
                background: ${lighten(0.1, theme.color)};
            }

            &:active {
                background: ${darken(0.05, theme.color)};
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
        padding: 14.5px 40px;
        display: block;
        color: #fafafa;
    }
`;
SidebarItem.Anchor = styled.a`
    float: left;
    /* display: block;
    width: 100%;
    height: 100%;
    padding: 20px;
    text-decoration: none; */
    /* color: black; */
`;
SidebarItem.Label = styled.span`
    /* position: relative;
    padding: 20px;
    width: 100%;
    display: block; */
    /* &::after {
        position: absolute;
        content: "\\276F";
        right: 20px;
    } */
`;

export default R2wCreateMenu;
