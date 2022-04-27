import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

function Cart(props) {
  const cartItem = useSelector(state => state.cart);
  return (
    <MyCartWrap>
      <div>
        MY SHOP <span>1</span>
      </div>
      {cartItem.map((sd, index) => {
        return <div key={index}>{sd.name}</div>;
      })}
    </MyCartWrap>
  );
}

export default Cart;

const MyCartWrap = styled.div`
  width: 100%;
  height: 170px;
  background-color: white;
`;
