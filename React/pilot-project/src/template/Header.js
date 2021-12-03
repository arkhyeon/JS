import React, { useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { darken, lighten } from "polished";
import {
    MdHome,
    MdAccountBox,
    MdAnnouncement,
    MdDashboardCustomize,
    MdDelete,
    MdVerifiedUser,
    MdVpnKey,
    MdDriveFileMoveOutline,
    MdFlipCameraIos,
    MdOutlineWindow,
} from "react-icons/md";
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

        & ul li {
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

    const menuList = [
        {
            id: 1,
            title: "Main",
            link: "/",
            icon: <MdHome />,
        },
        {
            id: 2,
            title: "Menu",
            link: "/menu",
            icon: <MdAccountBox />,
        },
        {
            id: 3,
            title: "Menu1",
            link: "/Main1",
            icon: <MdHome />,
        },
        {
            id: 2,
            title: "Menu2",
            link: "/Main2",
            icon: <MdAccountBox />,
        },
        {
            id: 1,
            title: "Menu3",
            link: "/Main3",
            icon: <MdHome />,
        },
        {
            id: 2,
            title: "Menu4",
            link: "/menu4",
            icon: <MdAccountBox />,
        },
        {
            id: 1,
            title: "Menu5",
            link: "/Menu5",
            icon: <MdHome />,
        },
        {
            id: 2,
            title: "Menu6",
            link: "/menu6",
            icon: <MdAccountBox />,
        },
        {
            id: 1,
            title: "Menu7",
            link: "/Menu7",
            icon: <MdHome />,
        },
        {
            id: 2,
            title: "Menu8",
            link: "/menu8",
            icon: <MdAccountBox />,
        },
    ];

    const subMenuList = [
        {
            id: 1,
            title: "subMenu1",
            link: "/menu/1",
            icon: <MdAnnouncement />,
        },
        {
            id: 2,
            title: "subMenu2",
            link: "/menu/2",
            icon: <MdDashboardCustomize />,
        },
        {
            id: 3,
            title: "subMenu3",
            link: "/menu/3",
            icon: <MdDelete />,
        },
        {
            id: 4,
            title: "subMenu4",
            link: "/menu/4",
            icon: <MdVerifiedUser />,
        },
        {
            id: 5,
            title: "subMenu5",
            link: "/menu/5",
            icon: <MdVpnKey />,
        },
        {
            id: 6,
            title: "subMenu6",
            link: "/menu/6",
            icon: <MdDriveFileMoveOutline />,
        },
        {
            id: 7,
            title: "subMenu7",
            link: "/menu/7",
            icon: <MdFlipCameraIos />,
        },
        {
            id: 8,
            title: "subMenu8",
            link: "/menu/8",
            icon: <MdOutlineWindow />,
        },
    ];

    const repleSubmit = useCallback(() => {
        return sessionStorage.getItem("loginTime");
    }, []);

    return (
        <div className="headerWrap">
            <h1 className="logo-wrap">
                <img
                    className="logo"
                    src="http://192.168.10.26:8080/Trans4.7/image/login/login_01.png"
                    alt=""
                />
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
