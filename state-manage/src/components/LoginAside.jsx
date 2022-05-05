import React from 'react';
import styled from '@emotion/styled';

function LoginAside({ setViewAside }) {
  return (
    <>
      <ASideBack onClick={() => setViewAside(false)}></ASideBack>
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
        <LoginOption>
          <span>회원가입</span>
          <span>비밀번호 찾기</span>
        </LoginOption>
        <hr />
        <SNSBtnWrap>
          <li />
          <li />
          <li />
          <li />
        </SNSBtnWrap>
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
    width: 220px;
    height: 1px;
    border: none;
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
    outline: none;
  }
`;

const LoginBtn = styled.button`
  width: 220px;
  height: 36px;
  background-color: #d0d0d0;
  color: white;
  text-align: center;
  line-height: 36px;
  margin-top: 15px;
  border: none;
  cursor: pointer;
`;

const LoginOption = styled.div`
  width: 220px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #909090;

  & span {
    cursor: pointer;
  }
`;

const SNSBtnWrap = styled.ul`
  display: flex;
  gap: 20px;
  margin-top: 1rem;

  & li {
    width: 36px;
    height: 36px;
    background-size: cover;
    cursor: pointer;
    &:nth-child(1) {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAIAAABuYg/PAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUtJREFUeNpi/POAgW6AiYFh1LJRy0YtG7WMTMBCvNJfvxjPnuW4eYPt/QdmNrb/UlJ/jI1/yMn9prJlf/8yrFrJt3w538eP6CFhYPgjL++9sjJRVjISLIh//GCsqxM5eYITlwJW1v8NjW9sbL5TIc5mzhTAYxMQ/P7N2Nwk8vQpC6WWAcNt00YegqYAfb9yJR+llt27x/bnDyMx8XH7Nisdk/5/Rkot09D4ycn5nxi7TEwoTiBAm+LiPhI0RUjob3DIZyoEY2TUJ3//L3gUCAr+7ex6LSDwjwqZmpGRoaj4HRfXP2CmRpPi4Pjv7vE1KekDMTaRUFzdvs0GJPn5/wUFfebm+cfFBSquNDV/Au2jcnG1fTv3kycsaekfAgO/AL1IdoJlJKbd+OABq7z8b0ZGSnMHUT5TUPhNlaw4WlOPWjZq2ahl5AOAAAMANJJrDPZU1zQAAAAASUVORK5CYII=');
    }
    &:nth-child(2) {
      background-image: url('https://www.sta1.com/_nuxt/img/icon-login-facebook@3x.f1f34c7.png');
    }
    &:nth-child(3) {
      background-image: url('https://www.sta1.com/_nuxt/img/icon-login-naver@3x.f070a26.png');
    }
    &:nth-child(4) {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAYAAACPZlfNAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANiSURBVHgB7ZyNTSpBFEaH914BdqAdaAdqBWoHdoBWIHZgB2oF0AFQAXQAVAAd7NtvkjX7EAzkhd174DvJFUNYM8yZ2b3zZyelVCSD4VcyKCwMhoXBsDAYFgbDwmBYGAwLg2FhMCwMhoXBsDAYFgbDwmBYGAwLg2FhMCwMhoXBsDAYFgbDwmBYGAwLg2FhMCwMhoXBsDAYFgbDwmBYGAwLg3GSws7OznIQOSlh9/f3aTgcpuVymZ6enhKRP+kEuLq6Su/v7/m1YrVaJSrFMUfZq4qyRxXr3NzcoL5HLVCF3SsuLi42yprNZqjvUY+jfobpebUpufj8/ExkUC1s13h8fCw2Qe5d6Zh72N3d3bf3lGjc3t4mOqgWtmusP7vUs8osEfUdtgSqsDtHnTKlL8pnGar826JTWaOgJELjKYV+n06naT6f59c65TMsvw4Gg3wr1GfLVD5fd35+nt9bLBZpNBp9uzY6iJalFF09ZVOaXt3yXl5e8ueqa9SrNA4rs8Wt11XXKkmB1EX8Qna73R8rfJ3JZJJjn2sqcXXhQSN04XKvaRJJDi4tbMEal1Xx9vYWtk7CClMrb4NyFj9kfYQXpgTDsiDC2uhdaiAR62I9Qk5NabzUNK+vr4lASGGb5gEPiQbPGnwTCCmsvCWmJhmPx4lCSGFNb5Ch9C7hHgYjpLCmWzypgXgjaUr/7KaKTkhhTS93XF9fYzaWhhSmdaomkSzSxtJwo/ltG2gODWQLQbxCaeGxDbwe9h+hVeI20HpY8EngmAVTpbWJGkzEegmb1n98fLR6YCHy7EfIlqTQym9bBH6WhSxUjrZWnSOvjf0uf/RSUHRL7HQ6ja+PPTw8hD4/FrY1KZTiK91uil6vF7o+wgtT6PBdE0BOtoQvYI5Dp/mQQTNHmKJM9YtDoS3dhDpAHUrXAQclA91ud+tnNH7SHo1qAvny8jInLdtm4/X3np+f86EJCoiWVQ9NDtcTEf2uZOGnyVtd0+/3v/bb61WzGZDb4FfgjhvV0Uqxesi+Kbh6G/XfPqCFnSLeIgDDwmBYGAwLg2FhMCwMhoXBsDAYFgbDwmBYGAwLg2FhMCwMhoXBsDAYFgbDwmBYGAwLg2FhMCwMhoXBsDAYFgbDwmBYGAwLg2FhMCwMhoXBsDAYfwHZIxoDF6nr0QAAAABJRU5ErkJggg==');
    }
  }
`;
