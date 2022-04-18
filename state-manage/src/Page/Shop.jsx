import React from 'react';
import styled from 'styled-components';

function Shop({ props, index }) {
  return (
    <ProductWrap>
      <span>{index + 1}위</span>
      <img src={props.img} />
      <div>{props.name}</div>
      <div>{props.desc}</div>
      <div>장바구니 등록+</div>
      <div>관심 #</div>
    </ProductWrap>
  );
}

const ProductWrap = styled.div`
  width: 230px;
  height: 300px;
  background-color: white;
  box-shadow: 0 1px 0 0 rgb(0 0 0 / 8%);
  margin: 0 3px 6px;
  position: relative;

  & span {
    color: #ff6b00;
    position: absolute;
    top: 12px;
    left: 12px;
    font-style: normal;
    font-size: 12px;
  }
`;

export default Shop;
