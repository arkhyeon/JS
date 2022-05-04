import React from 'react';
import styled from '@emotion/styled';

function LoginAside() {
  return (
    <>
      <ASideBack></ASideBack>
      <ASideMain>
        <LoginInput>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAqCAYAAAA9IzKsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFJREFUeNrMmE1IVFEUx988G4eRMigcQiISRBqQPhRtWxK2GFsIJlgguNTCxIWbESyofUULV6ULCRskSBQssG0tJIxAiYEW0aYomPykwez/4P+m0+095747zaMDP7zvvnPP+b839+P4IrvXrKB2EvSBNpAEUZAHK2ARPAJvtaM92LXsAMlrQQYsgyGKifJelNdDvJ+hv5bpimgFb0CXpn8X/Vt1nPdp+JwBL0C16PvGp30NvoAacBZcBofok+C4cxTka5Eic+IAX2+d6LsHxkDOw/8guAVuiL4P4BRYM50TY4qAPv7uOR//HO/3ib46xjGaE4fBgLi+DyY058QE/V0bYLzAInpAnO2vIB1wKac5zmKcHhMRF0X7IVgPKGKd47ziaYs4LdoLlpkt+MTTFnFUtFcNRaz6xDParDYNRWiN20vED9FOGIpI+MTTFvFetFsMRbT4xNMW8Uq0Ow1FdPrE0xYxowRrDCigURExYyLiOci6Zwx4LDavYhanf4TXWcYLLOInGFGe7JlymnpZNf3kmxthPKMl+hRMiesLrKB6Pd5KnP0r9HNtinGMj3I3+Bw4r/TneTY4S6+SB1RU8XkJUmCr1PLOCXAFLCn9TsIj4Bj/qgKWOG6r1PIuxtPQ2X6bA66OZo5LM45ReedMrCesqFXbAZ+VXbCSO2SFUmndBldBN3gX5E2kWD8mlcROXdnBFeBU08cFtezvoN+OGJtkvJSuiBRnc5Xomwcn+DRzexxMm7zfTf95ca+KcVPFRDTxKaJiBfRzYDbgnMhyXD/juJM5wzyeIvaDabH+t8ElMG6VZuOMsy2W/DTz/SXiJqgX170lVFReFVavuK5nvj9EOBNrUDjd5Wv7l5ZhXNcGmbcgYljMg09g1CqPjTK+Oz+GXREx5VXdARtlErHB+L9/8uuRmCOinZuKY9/BpFVem2QedzNrt/mdwbXZEoraIMXvrLhus5U1u2iFYzJPkyOiQXQshyRC5mmw+W3BtY8hiZB5amzl1FsLSYTMU2F7FDBh2JbJv4Fltf9GxI4oWsK0Ql6bn3XyyuedMKyQ95cAAwD2XaYX4xYLNAAAAABJRU5ErkJggg==" />
          <input type="text" placeholder="아이디" />
        </LoginInput>
        <hr />
        <LoginInput>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAqCAYAAAA9IzKsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAApRJREFUeNrsmL9rFEEUx2fXGKMWksYgKYxCJJJCOAJCPEUtDAErRUglNkJQAhELGxEF2zQhKKQ5CBYmoH+CeImCaY54YBQExUIkVgd6qGg8v0+/A89l1pvb7N4dmAcfdm929r3vzcybHxvULptG7SQYA3nQDzrAD/AaPAH3wSNvbzO13w587TC4A3KOZ+LnILkISuASWPZxHHoKmABPYwTUHGU51p9IS8QVMA228Pc6KIBToJs+uvm7wOeG9af5/j8tqDMmjoLHSuxLcJbXOJMuecCr2E9wHCzFjYmwTivdVQJegeE6AqzQYdZ3+WmoO06DQdUF0gIVzzFUYX3bNYP017CIc+r+HlhtMJVX+Z7Ln7eIvLpfMMlsIcaft4i96r6cUEQ5xp+3iEDdryUU8TnGX6LJ6rvJ0ELTBtYWIuIWsD2R3xcS+t/h8Puhnohj4LYjnQop/en3XO6vg0VXd9wARa4XQUYtH9B/kfH+aomr4JaqLJuUF2AbeAs+biDwbrAPfOP0bWNKvCqYklV0PxebrXwo+4Dz4E0GLSGx5sARlfoD0h2TSoDM9yMZCTD0O6LWIYk7KSJGVaWbbKIsrco41kZFRJ8qWGzS1KDj9IWRNF1rkggdp2Nz2k5LRA8PQj1ZrB2+tsRTmJy+DrSqJfrVdVc7jIngvx6Y2tZbJWJZXT+1KjtOgEPgeStT9At4lvaY6GzSWOyMiqj6nJJSNh2nGkaOamNNEqHjlEXEvCq4BoYyFjDEONbmRcQseMeCndwJS6XelIP30m+RcQzjztrPRTmeB7ZHXvzKXfJGTXbtXY7MypuZWsmmaImfeB5ye26ty/FyGibHiDNgJZqiUjAAxs2fj2WVlANX6HeccVbsg18CDAA5sH8dNP4JbAAAAABJRU5ErkJggg==" />
          <input type="password" placeholder="비밀번호" />
        </LoginInput>
        <LoginBtn>로그인</LoginBtn>
      </ASideMain>
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
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 80px 0px;
  gap: 5px;
  font-size: 12px;
  & hr {
    height: 1px;
    background-color: #e0e4e6;
  }
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

const LoginInput = styled.div`
  width: 220px;
  height: 36px;
  display: flex;
  align-items: center;
  gap: 10px;

  & img {
    width: 11px;
    height: 14px;
  }

  & input {
    border: none;
  }
`;

const LoginBtn = styled.div`
  width: 220px;
  height: 36px;
  background-color: #d0d0d0;
  color: white;
  text-align: center;
  line-height: 36px;
  margin-top: 15px;
`;
