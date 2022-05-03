import React from 'react';
import styled from '@emotion/styled';

function LoginAside() {
  return (
    <>
      <ASideBack></ASideBack>
      <ASideMain></ASideMain>
    </>
  );
}

export default LoginAside;

const ASideMain = styled.div`
  width: 300px;
  height: 100%;
  background-color: white;
  position: fixed;
  z-index: 1;
  top: 0px;
  right: 0px;
`;

const ASideBack = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  position: fixed;
  top: 0px;
  z-index: 1;
  opacity: 0.7;
`;
