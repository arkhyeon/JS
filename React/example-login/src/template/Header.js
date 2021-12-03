import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./scss/header.scss";

const HeaderWrap = styled.div`
    display: flex;
    flex: 1;
    background: url("http://192.168.10.26:8080/Trans4.7/image/header/topmenu_bg.png");
    height: 100px;
    min-width: 970px;
`;

const Menu = styled.ul`
    display: flex;
    flex: 0.65;
`;
const MenuItem = styled.li`
    margin-right: 10px;
`;

const LoginInfoText = styled.p`
    font-size: 13px;
    color: white;
    margin-top: 10px;
    width: 222px;
`;

const LoginInfoTextWrap = styled.div`
    min-width: 222px;
    margin: 6px 15px;
    transition: 1s;
    overflow: hidden;
    @media only screen and (max-width: 1200px) {
        min-width: 0px;
        opacity: 0;
    }
`;

const LogOut = styled.div`
    margin: 6px 15px 6px 0px;
`;

function Header() {
    return (
        <HeaderWrap>
            <h1 className="logo-wrap">
                <img
                    className="logo"
                    src="http://192.168.10.26:8080/Trans4.7/image/login/login_01.png"
                    alt=""
                />
            </h1>
            <Menu>
                <MenuItem>
                    <Link to="/main">
                        <img
                            src="http://192.168.10.26:8080/Trans4.7/image/header/top_icon_off_01.png"
                            alt=""
                        />
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/menu">
                        <img
                            src="http://192.168.10.26:8080/Trans4.7/image/header/top_icon_off_02.png"
                            alt=""
                        />
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/menu1">
                        <img
                            src="http://192.168.10.26:8080/Trans4.7/image/header/top_icon_off_03.png"
                            alt=""
                        />
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/menu2">
                        <img
                            src="http://192.168.10.26:8080/Trans4.7/image/header/top_icon_off_04.png"
                            alt=""
                        />
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/menu3">
                        <img
                            src="http://192.168.10.26:8080/Trans4.7/image/header/top_icon_off_05.png"
                            alt=""
                        />
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/menu4">
                        <img
                            src="http://192.168.10.26:8080/Trans4.7/image/header/top_icon_off_06.png"
                            alt=""
                        />
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/menu5">
                        <img
                            src="http://192.168.10.26:8080/Trans4.7/image/header/top_icon_off_07.png"
                            alt=""
                        />
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/menu6">
                        <img
                            src="http://192.168.10.26:8080/Trans4.7/image/header/top_icon_off_08.png"
                            alt=""
                        />
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/menu7">
                        <img
                            src="http://192.168.10.26:8080/Trans4.7/image/header/top_icon_off_09.png"
                            alt=""
                        />
                    </Link>
                </MenuItem>
            </Menu>
            <LoginInfoTextWrap>
                <LoginInfoText>admin (SQLCanvas 관리자)</LoginInfoText>
                <LoginInfoText>
                    최근 접속 시간 : 2021-11-18 21:51:49
                </LoginInfoText>
            </LoginInfoTextWrap>
            <LogOut>
                <Link to="/">
                    <img
                        src="http://192.168.10.26:8080/Trans4.7/image/admin/logout.png"
                        alt=""
                    />
                </Link>
            </LogOut>
        </HeaderWrap>
    );
}

export default Header;
