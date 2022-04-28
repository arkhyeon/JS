import React from 'react';
import styled from '@emotion/styled';

function ShopItem({ props }) {
  console.log(props);
  return (
    <ShopItemWrap>
      <img src={props.img} />
      <p>{props.name}</p>
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

  & p {
    font-size: 11px;
    text-align: center;
    color: #909090;
  }
`;
