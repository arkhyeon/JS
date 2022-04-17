import React from 'react';
import styled from 'styled-components';

function Shop(props) {
  return (
    <ProductWrap>
      <div>img</div>
      <div>안나키즈</div>
      <div>30대 미시스타일, 심플베이직</div>
      <div>장바구니 등록</div>
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
`;

export default Shop;
