import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';
import { css, jsx } from '@emotion/react';
import Cart from './Page/Cart';
import Shop from './Page/Shop';

const base = css`
  background-color: darkgreen;
  color: turquoise;
`;
function App() {
  return (
    <div css={base}>
      <Cart></Cart>
      <Shop></Shop>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
}

export default App;
