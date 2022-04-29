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
            SHOP<div className="line-bottom"></div>
          </li>
        </NavLink>
        <NavLink to="/cart">
          <li className="cart">CART</li>
        </NavLink>
      </ul>
      <p>LOGIN</p>
    </HeaderComponent>
  );
}

const HeaderComponent = styled.div`
  width: 100%;
  height: 59px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  & a {
    color: #303030;
  }
  
  & p {
    width: 150px;
    color: #303030;
    padding-right:30px;
    text-align: right;
    line-height: 59px;
    cursor: pointer;
  }
  
  & ul {
    display: flex;
    position: relative;

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

    & a.active .shop div {
      left: 20px;
    }
    & a .shop div {
      left: 110px;
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

const LoginAside = () => {

}

export default Header;
