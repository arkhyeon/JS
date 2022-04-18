import React from 'react';
import styled from 'styled-components';

function Shop({ props, index }) {
  return (
    <ProductWrap>
      <span>{index + 1}위</span>
      <ShopInfo>
        <img src={props.img} />
        <h2>{props.name}</h2>
        <p>{props.desc}</p>
        <p>{props.category}</p>
      </ShopInfo>
      <ButtonWrap>
        <div>장바구니 🛒</div>
        <div>관심 ✨</div>
      </ButtonWrap>
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
  cursor: pointer;

  & span {
    color: #ff6b00;
    margin: 12px 0 0 12px;
    font-style: normal;
    font-size: 12px;
    display: block;
  }
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

  & h2 {
    color: #303030;
    font-size: 15px;
    padding: 13px 0 12px;
  }

  & p {
    color: #909090;
    font-size: 13px;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  line-height: 40px;
  text-align: center;
  position: absolute;
  bottom: 0;
  font-size: 11px;
  color: #909090;

  & div {
    width: 50%;
    border: 1px solid #edeff0;
    &:hover {
      font-size: 11.3px;
    }
  }
`;

export default Shop;