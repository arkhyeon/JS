import React from 'react';
import styled from 'styled-components';

const FooterWrap = styled.div`
    background-color: ${({ theme }) => theme.defaultColor};
    width: 100%;
    height: 46px;
    color: ${({ theme }) => theme.colors.gray_3};
    background-color: white;
    font-size: 0.8rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray_1};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_1};
    line-height: 46px;
    padding: 0px 15px;
`;

function Footer() {
    return <FooterWrap>Copyright©R2ware, All rights reserved. Trans Post Version 1.0</FooterWrap>;
}

export default Footer;
