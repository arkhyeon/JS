import React from "react";
import { Button, Nav } from "react-bootstrap";
import { MdEmail, MdSend } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

function MessageAside() {
    const navigate = useNavigate();
    return (
        <>
            <StyledNav className="d-md-block sidebar">
                <StyledBtn
                    size="md"
                    onClick={() => {
                        navigate('MessageWrite');
                    }}
                >
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        role="img"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title></title>
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"></path>
                    </svg>
                    메시지 작성
                </StyledBtn>
                <hr />
                <NavLink
                    to="MessageReceive"
                    className="nav-link"
                    state="RECEIVE"
                >
                    <Nav.Item>
                        <MdEmail />
                        받은 메시지
                    </Nav.Item>
                </NavLink>
                <NavLink
                    to="MessageDispatch"
                    className="nav-link"
                    state="DISPATCH"
                >
                    <Nav.Item>
                        <MdSend />
                        보낸 메시지
                    </Nav.Item>
                </NavLink>
            </StyledNav>
        </>
    );
}

const StyledNav = styled(Nav)`
    width: 320px;
    min-width: 320px;
    border-right: 1px solid #a9a9a9;
    padding: 15px;
    background-color: ${({ theme }) => theme.colors.light_1};
    & a {
        margin: 2px 0px 0px 0px;
        font-size: 0.95rem;
        height: 35px;
        color: ${({ theme }) => theme.colors.gray_5};
        padding-left: 20px;
        text-align: left;
        border-radius: 3px;

        & .nav-item {
            display: flex;
            gap: 5px;
        }

        & svg {
            font-size: 20px;
        }

        &:focus,
        &:hover,
        &:active,
        &.active {
            color: black;
            background-color: ${({ theme }) => theme.colors.light_2};
        }
    }

    & hr {
        margin: 15px 0px;
    }
`;

const StyledBtn = styled(Button)`
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    height: 35px;
    color: #ffffff;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.normal_2};
    border: none;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    & svg {
        font-size: 21px;
    }

    &:hover,
    &:active,
    &:focus {
        background-color: ${({ theme }) => theme.colors.normal_3};
    }
`;

export default MessageAside;
