import React, { useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { darken, lighten } from "polished";
import { menuList, subMenuList, subSubMenuList } from "./Menu";
import "../index.scss";

function Header({ getAuth }) {
    const navigate = useNavigate();

    const setLoginInfo = useCallback(() => {
        return (
            <>
                <b>{sessionStorage.getItem("user_id")}</b>
                <span> (솔루션 관리자)</span>
            </>
        );
    }, []);

    const logout = () => {
        getAuth(null);
        sessionStorage.removeItem("user_id");
        navigate("/");
    };

    const MenuItem = styled.li`
        width: 120px;
        height: 70px;
        line-height: 70px;
        float: left;
        transition: 0.2s;
        text-align: center;
        &:hover {
            background: ${lighten(0.1, "#98b054")};
        }

        &:active {
            background: ${darken(0.1, "#98b054")};
        }
        .active & {
            background: ${darken(0.1, "#98b054")};
        }
        & svg {
            position: relative;
            top: 2px;
            left: -2px;
        }

        & .subMenuItem > a > li {
            width: 180px;
            height: 70px;
            &:hover {
                background: ${lighten(0.1, "#98b054")};
            }
            &:active {
                background: ${darken(0.1, "#98b054")};
            }
        }

        & .subMenuItem > a > li .subSubMenuItem li {
            &:hover {
                background: ${lighten(0.1, "#98b054")};
            }
            &:active {
                background: ${darken(0.1, "#98b054")};
            }
        }
        & ul {
            a.active li {
                background: ${darken(0.1, "#98b054")};
            }
        }
    `;

    const LogintInfo = styled.li`
        ul > & {
            width: 350px;
            line-height: 20px;
            text-align: left;
            display: inline-block;
            margin-top: 15px;
            margin-left: 50px;
            p {
                width: 300px;
                height: 20px;
            }
            button {
                width: 60px;
                height: 20px;
                background: #7b8f42;
                border: none;
                color: white;
                border-radius: 5px;
                cursor: pointer;
                display: block;
                transition: 0.3s;
                font-weight: 700;
                float: left;
                margin-left: 10px;
                :hover {
                    background: ${darken(0.2, "#98b054")};
                }
            }
            & > span {
                float: left;
            }
        }
    `;

    const repleSubmit = useCallback(() => {
        return sessionStorage.getItem("loginTime");
    }, []);

    return (
        <div className="headerWrap">
            <h1 className="logo-wrap">
                <img className="logo" src="http://192.168.10.26:8080/Trans4.7/image/login/login_01.png" alt="" />
            </h1>
            <ul>
                {menuList.map((menu) => (
                    <NavLink to={menu.link}>
                        <MenuItem key={menu.id} className={menu.title}>
                            {menu.icon}
                            {menu.title}
                            {menu.id === 2 ? (
                                <ul className="subMenuItem">
                                    {subMenuList.map((subMenu) => (
                                        <NavLink to={subMenu.link}>
                                            <li key={subMenu.id}>
                                                {subMenu.icon}
                                                {subMenu.title}
                                                {subMenu.id % 2 === 0 ? (
                                                    <ul className="subSubMenuItem">
                                                        {subSubMenuList.map((subSubMenu) => (
                                                            <NavLink to={subSubMenu.link}>
                                                                <li key={subSubMenu.id}>
                                                                    {subSubMenu.icon}
                                                                    {subSubMenu.title}
                                                                </li>
                                                            </NavLink>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    ""
                                                )}
                                            </li>
                                        </NavLink>
                                    ))}
                                </ul>
                            ) : (
                                ""
                            )}
                        </MenuItem>
                    </NavLink>
                ))}
                <LogintInfo>
                    <p>{setLoginInfo()}</p>
                    <span>최근 접속 시간 : {repleSubmit()}</span>
                    <button onClick={() => logout()}>로그아웃</button>
                </LogintInfo>
            </ul>
        </div>
    );
}

export default Header;
