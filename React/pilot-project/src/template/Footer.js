import React from "react";
import styled from "styled-components";

const FooterWrap = styled.div`
    background-color: ${({ theme }) => theme.defaultColor};
    width: 100%;
    min-width: 1900px;
    height: 200px;
    text-align: center;
    line-height: 200px;
    color: white;
    justify-content: center;
    align-content: center;
    h3 {
        line-height: 200px;
    }
`;

function Footer() {
    return (
        <FooterWrap>
            <h3>Copyright © 2021 R2ware. All rights reserved.</h3>
        </FooterWrap>
    );
}

export default Footer;
