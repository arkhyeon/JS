import React from 'react';
import { Outlet } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import Header from './Header';

const wrap = css`
  width: 80%;
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function Main() {
  return (
    <>
      <Header />
      <div css={wrap}>
        <Outlet />
      </div>
    </>
  );
}

export default Main;
