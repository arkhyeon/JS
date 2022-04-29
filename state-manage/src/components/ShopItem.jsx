import React from 'react';
import styled from '@emotion/styled';
import {useDispatch} from "react-redux";
import {removeCart} from "../modules/cart";

function ShopItem({ props, modifyMode }) {
  const dispatch = useDispatch();

  const modifyShopItem = () =>{
    dispatch(removeCart(props));
  }
  return (
    <ShopItemWrap>
      <img src={props.img} />
      <p>{props.name}</p>
      {modifyMode && <a onClick={modifyShopItem}>제거</a>}
    </ShopItemWrap>
  );
}

export default ShopItem;

const ShopItemWrap = styled.div`
  width: 72px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  & img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }

  & p, a {
    font-size: 11px;
    text-align: center;
    color: #909090;
  }
  
  & a{
    cursor: pointer;
  }
`;
