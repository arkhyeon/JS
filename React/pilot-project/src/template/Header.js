import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { lighten } from "polished";
import CreateMenu from "../utils/CreateMenu";
import "../scss/header.scss";
import { DepthList1, Common_depth_list_1 } from "../utils/DepthMenu";
import MenuInfo from "./headerComp/MenuInfo";

function Header({ getAuth, userAuth }) {
    // const [visible, setVisible] = useState(false);
    // const setLoginInfo = useCallback(() => {
    //     return (
    //         <>
    //             <b>{sessionStorage.getItem("user_id")}</b>
    //             <span> (솔루션 관리자)</span>
    //         </>
    //     );
    // }, []);

    // const repleSubmit = useCallback(() => {
    //     return sessionStorage.getItem("loginTime");
    // }, []);
    // console.log(A());

    // const logout = () => {
    //     getAuth(null);
    //     sessionStorage.removeItem("user_id");
    //     sessionStorage.removeItem("userAuth");
    //     navigate("/");
    // };

    return (
        <div className="headerWrap">
            <NavLink to="/">SQLCanvas Trans</NavLink>
            <CreateMenu menus={userAuth === "0" ? [DepthList1] : [Common_depth_list_1]} color={""} fontColor={""} size={"14.5px 40px"} />
            <LogintInfo>
                {/* <MdAccountCircle
                    onClick={() => {
                        visible ? setVisible(false) : setVisible(true);
                    }}
                /> */}
                {/* <span>최근 접속 시간 : {repleSubmit()}</span> */}
                {/* {visible && (
                    <ul>
                        <li>
                            <MdAccountCircle /> 로그인 정보
                        </li>
                        <li>
                            <MdSettings /> 설정
                        </li>
                        <li onClick={() => logout()}>
                            <MdLogout /> 로그아웃
                        </li>
                    </ul>
                )} */}
                <MenuInfo getAuth={getAuth} />
            </LogintInfo>
        </div>
    );
}

export default Header;

const LogintInfo = styled.div`
    color: #fafafa;
    width: 222px;
    display: block;

    & > svg {
        width: 28px;
        height: 50px;
        cursor: pointer;
        display: block;
    }
    ul {
        position: absolute;
    }
    ul li {
        width: 180px;
        height: 40px;
        cursor: pointer;
        font-size: 14px;
        line-height: 40px;
        margin-right: 5px;
        padding: 0 10px;
        ${({ theme }) => {
            return css`
                background-color: ${lighten(0.15, theme.defaultColor)};
                &:hover {
                    background-color: ${lighten(0.25, theme.defaultColor)};
                }
            `;
        }}
    }
    ul li svg {
        width: 24px;
        height: 24px;
        position: relative;
        top: 6px;
    }
`;
