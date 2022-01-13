import React from "react";
import { Button, Nav } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";

function MessageAside() {
    const navigate = useNavigate();
    return (
        <StyledNav className="d-md-block sidebar">
            <StyledBtn
                size="md"
                onClick={() => {
                    navigate("MessageWrite");
                }}
            >
                +메세지 작성
            </StyledBtn>
            <hr />
            <NavLink to="MessageReceive" className="nav-link" state="RECEIVE">
                <Nav.Item>받은 메세지</Nav.Item>
            </NavLink>
            <NavLink to="MessageDispatch" className="nav-link" state="DISPATCH">
                <Nav.Item>보낸 메세지</Nav.Item>
            </NavLink>
        </StyledNav>
    );
}

const StyledNav = styled(Nav)`
    width: 280px;
    min-width: 280px;
    border-right: 1px solid #a9a9a9;
    padding-top: 5px;
    padding-right: 15px;
    margin-left: 15px;
    & a {
        color: #212529;
        border-radius: 0px 20px 20px 0px;
        &:focus {
            color: #212529;
        }
        &:hover {
            color: #212529;
            background-color: ${({ theme }) => theme.colors.gray_2};
        }
        &:active,
        &.active {
            color: white;
            background-color: ${({ theme }) => theme.menuColor};
        }
    }
`;

const StyledBtn = styled(Button)`
    margin: 16px 0px 9px;
`;

export default MessageAside;
