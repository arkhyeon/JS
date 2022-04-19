import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import Shop from './Page/Shop';
import { Route, Routes } from 'react-router-dom';
import { ShopData } from './Data';
import styled from 'styled-components';

const divStyle = css`
  width: 80%;
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Header = styled.div`
  width: 100%;
  height: 59px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  display: flex;
  background-color: white;
  & ul {
    display: flex;
    margin: 0 auto;
    position: relative;
    left: -90px;

    & li {
      width: 50px;
      height: 56px;
      margin: 0 20px;
      line-height: 60px;
      font-size: 15px;
      text-align: center;
      font-weight: normal;
      font-family: 'DINPro-Regular';
      cursor: pointer;
    }

    & li:nth-child(1) {
      border-bottom: 3px solid #ff6b00;
      font-weight: bold;
      font-family: 'DINPro-Medium';
    }
  }
`;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Header>
        <h1>r2ware</h1>
        <ul>
          <li>SHOP</li>
          <li>CART</li>
        </ul>
      </Header>
      <div css={divStyle}>
        {ShopData.map((sd, index) => {
          console.log(index);
          return <Shop key={index} index={index} props={sd} />;
        })}
        {/*<CounterContainer />*/}
        {/*<TodosContainer />*/}
      </div>
    </>
  );
}

export default App;
