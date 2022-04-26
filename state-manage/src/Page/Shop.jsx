import React from 'react';
import { ShopData } from '../Data';
import Product from '../components/Product';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

function Shop() {
  const cartItem = useSelector(state => state.cart);
  const interest = useSelector(state => state.interest);

  return (
    <>
      <MyShop>
        <ShopInfo>
          <img src="https://www.sta1.com/_nuxt/img/icon-myshop@3x.00de977.png" />
          <p>
            MY<strong> CART</strong>
          </p>

          <ul>
            <li>
              <p>CART</p>
              <span>{cartItem.length}</span>
            </li>
            <li>
              <p>INTEREST</p>
              <span>{interest.length}</span>
            </li>
          </ul>
        </ShopInfo>
      </MyShop>
      {ShopData.map((sd, index) => {
        return <Product key={index} index={index} props={sd} />;
      })}
    </>
  );
}

export default Shop;

const MyShop = styled.div`
  width: 230px;
  height: 270px;
  background-color: white;
  box-shadow: 0 1px 0 0 rgb(0 0 0 / 8%);
  margin: 0 3px 6px;
  position: relative;
  cursor: pointer;
  padding-top: 30px;
`;

const ShopInfo = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 18px;

  & img {
    width: 90px;
    height: 90px;
    border-radius: 100%;
    margin: 0 auto;
  }

  & > p {
    color: #909090;
    font-size: 20px;
    margin-top: 7px;
  }

  & ul {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;

    & li:nth-child(1) {
      border-right: 1px solid #edeff0;
    }

    & li:nth-child(2) span {
      color: #ff6b00;
    }

    & li {
      width: 110px;
      height: 60px;

      & p {
        font-size: 13px;
        color: #909090;
      }

      & span {
        font-size: 28px;
        color: #909090;
        line-height: 60px;
      }
    }
  }
`;
