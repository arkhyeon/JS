import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <HeaderComponent>
      <h1>r2ware</h1>
      <ul>
        <NavLink to="/">
          <li className="shop">
            SHOP<li className="line-bottom"></li>
          </li>
        </NavLink>
        <NavLink to="/cart">
          <li className="cart">CART</li>
        </NavLink>
      </ul>
    </HeaderComponent>
  );
}

const HeaderComponent = styled.div`
  width: 100%;
  height: 59px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  display: flex;
  background-color: white;
  & a {
    color: #303030;
  }
  & ul {
    display: flex;
    margin: 0 auto;
    position: relative;
    left: -90px;

    & li {
      width: 50px;
      height: 56px;
      margin: 0 20px;
      line-height: 60px;
      font-size: 15px;
      text-align: center;
      font-weight: normal;
      font-family: 'DINPro-Regular';
      cursor: pointer;
    }

    & a.active li {
      font-weight: bold;
      //font-family: 'DINPro-Medium';
    }

    & a.active .shop li {
      left: 0px;
    }
    & a .shop li {
      left: 90px;
    }

    & .line-bottom {
      width: 50px;
      height: 3px;
      background-color: lightcoral;
      position: absolute;
      bottom: 0px;
      transition: 500ms;
    }
  }
`;

export default Header;
