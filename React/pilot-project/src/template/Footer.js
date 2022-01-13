import React from "react";
import styled from "styled-components";

const FooterWrap = styled.div`
    background-color: ${({ theme }) => theme.defaultColor};
    width: 100%;
    min-width: 1900px;
    height: 46px;
    color: #989898;
    background-color: white;
    font-size: 0.8rem;
    border-top: 1px solid #b6b6b6;
    border-bottom: 1px solid #b6b6b6;
    line-height: 46px;
    padding: 0px 15px;
    position: fixed;
    bottom: 0px;
`;

function Footer() {
    return <FooterWrap>Copyright©R2ware, All rights reserved. Trans Post Version 1.0</FooterWrap>;
}

export default Footer;
