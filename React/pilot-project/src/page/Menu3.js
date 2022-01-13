import React from "react";
import { useParams } from "react-router";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import WorkRegister from "../page_component/work_register";

const MenuDiv = styled.div`
    width: 100%;
    height: 667px;
    margin: 0 auto;
    line-height: 500px;
    display: flex;
    justify-content: center;
    align-content: center;
    h1 {
        line-height: 667px;
    }
`;

function Menu3() {
    const value = useParams();
    console.log(window.location.pathname);
    return (
        <MenuDiv>
            <WorkRegister>SubMenu3 {value.id}</WorkRegister>
            <Outlet />
        </MenuDiv>
    );
}

export default Menu3;
