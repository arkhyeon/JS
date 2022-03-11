import React from 'react';
import { Alert } from 'react-bootstrap';
import { MdReport } from 'react-icons/md';
import styled from 'styled-components';

/**
 * @param {HTML/TEXT} children
 * @returns StyledAlert
 * @example 
 * <StyledAlert>
        {Title(제목)}
        {Desc(설명)}
    </StyledAlert>
 */
export const StyledAlert = ({ children }) => {
    return (
        <ModalDesc>
            <Alert.Heading>
                <MdReport />
                {children[0]}
            </Alert.Heading>
            <p>{children[1]}</p>
        </ModalDesc>
    );
};

const ModalDesc = styled(Alert)`
    background-color: ${({ theme }) => theme.colors.normal_4};
    border-color: ${({ theme }) => theme.colors.dark_1};
    color: white;
    margin: 0px;
    padding: 10px;
    font-size: 0.9rem;

    & .alert-heading {
        display: flex;
        font-size: 1rem;

        & svg {
            margin-right: 3px;
            font-size: 1.3rem;
        }
    }

    & p {
        white-space: pre-line;
    }
`;
