import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import Cart from './Page/Cart';
import Shop from './Page/Shop';

const divStyle = css`
  width: 80%;
  background-color: hotpink;
  margin: 0 auto;
  display: flex;
`;

function App() {
  return (
    <div css={divStyle}>
      <Cart></Cart>
      <Cart></Cart>
      <Cart></Cart>
      <Cart></Cart>

      <Shop></Shop>
      <Shop></Shop>
      <Shop></Shop>
      <Shop></Shop>
      <Shop></Shop>
      {/*<CounterContainer />*/}
      {/*<TodosContainer />*/}
    </div>
  );
}

export default App;
