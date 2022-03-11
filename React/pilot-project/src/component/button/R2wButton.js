import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

/**
 * @param {Function} onClick
 * @param {HTML/TEXT} children
 * @param {type} type submit...
 * @param {value} value
 * @returns normal_2 color Bootstrap Button
 */
export const NormalButton = ({ onClick, children, type = '', value }) => {
    return (
        <SNormalButton onClick={onClick} type={type} value={value}>
            {children}
        </SNormalButton>
    );
};

const SNormalButton = styled(Button)`
    /* height: 33px; */
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.light_1};
    padding: 0px 15px;
    background-color: ${({ theme }) => theme.colors.normal_2};
    border-color: ${({ theme }) => theme.colors.normal_2};

    &:hover,
    &:active,
    &:focus {
        color: #ffffff;
        background-color: ${({ theme }) => theme.colors.normal_2};
        border: 1px solid;
        border-color: ${({ theme }) => theme.colors.normal_2};
    }
`;

/**
 * @param {Function} onClick
 * @param {HTML/TEXT} children
 * @param {type} type submit...
 * @param {value} value
 * @returns white color Bootstrap Button
 */

export const WhiteButton = ({ onClick, children, type = '', value }) => {
    return (
        <SWhiteButton onClick={onClick} type={type} value={value}>
            {children}
        </SWhiteButton>
    );
};

export const GreenButton = ({ onClick, children, type = '', value }) => {
    return (
        <SGreenButton onClick={onClick} type={type} value={value}>
            {children}
        </SGreenButton>
    );
};

const SGreenButton = styled(Button)`
    /* height: 33px; */
    font-size: 0.875rem;
    padding: 0px 15px;
    color: white;
    background-color: green;
    border: 1px solid;
    border-color: ${({ theme }) => theme.colors.gray_2};
    border-radius: 3px;

    &:hover,
    &:active,
    &:focus {
        font-size: 0.875rem;
        color: #000000;
        background-color: ${({ theme }) => theme.colors.light_1};
        border: 1px solid;
        border-color: ${({ theme }) => theme.colors.gray_2};
    }
`;

const SWhiteButton = styled(Button)`
    /* height: 33px; */
    font-size: 0.875rem;
    padding: 0px 15px;
    color: #383838;
    background-color: #ffffff;
    border: 1px solid;
    border-color: ${({ theme }) => theme.colors.gray_2};
    border-radius: 3px;

    &:hover,
    &:active,
    &:focus {
        font-size: 0.875rem;
        color: #000000;
        background-color: ${({ theme }) => theme.colors.light_1};
        border: 1px solid;
        border-color: ${({ theme }) => theme.colors.gray_2};
    }
`;

export const GrayButton = ({ onClick, children, type = '', value }) => {
    return (
        <SGrayButton onClick={onClick} type={type} value={value}>
            {children}
        </SGrayButton>
    );
};

const SGrayButton = styled(Button)`
    /* height: 33px; */
    font-size: 0.875rem;
    padding: 0px 15px;
    color: #383838;
    background-color: ${({ theme }) => theme.colors.light_1};
    border: 1px solid;
    border-color: ${({ theme }) => theme.colors.gray_2};
    border-radius: 3px;

    &:hover,
    &:active,
    &:focus {
        font-size: 0.875rem;
        color: #000000;
        background-color: ${({ theme }) => theme.colors.gray_2};
        border: 1px solid;
        border-color: ${({ theme }) => theme.colors.gray_2};
    }
`;
