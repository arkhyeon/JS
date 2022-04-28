import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import ShopItem from '../components/ShopItem';

function Cart(props) {
  const cartItem = useSelector(state => state.cart);
  return (
    <MyCartWrap>
      <div>
        <strong>MY SHOP </strong>
        <span>{cartItem.length}</span>
      </div>
      <MyShop>
        {cartItem.map(ci => {
          return <ShopItem key={ci.id} props={ci} />;
        })}
      </MyShop>
    </MyCartWrap>
  );
}

export default Cart;

const MyCartWrap = styled.div`
  width: 100%;
  height: 140px;
  background-color: white;
  padding: 15px;

  & span {
    color: #ff6b00;
  }
`;

const MyShop = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;
