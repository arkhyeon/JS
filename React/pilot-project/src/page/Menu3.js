import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";

const MenuDiv = styled.div`
    width: 800px;
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
            <h1>SubMenu {value.id}</h1>
        </MenuDiv>
    );
}

export default Menu3;
