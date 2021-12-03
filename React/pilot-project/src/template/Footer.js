import React from "react";
import styled from "styled-components";

function Footer() {
    const Footer = styled.div`
        background-color: #617036;
        width: 100%;
        height: 200px;
        text-align: center;
        line-height: 200px;
        color: white;
    `;
    return (
        <Footer>
            <h1>Footer</h1>
        </Footer>
    );
}

export default Footer;
