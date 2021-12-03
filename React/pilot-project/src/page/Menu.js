import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";

function Menu() {
    const value = useParams();

    const MenuDiv = styled.div`
        width: 800px;
        height: 667px;
        margin: 0 auto;
        line-height: 500px;
    `;

    return (
        <MenuDiv>
            <h1>Menu {value.id}</h1>
        </MenuDiv>
    );
}

export default Menu;
