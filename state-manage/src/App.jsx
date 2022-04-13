import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';
import { jsx, css } from '@emotion/react';

const mainWrap = css`
  background-color: hotpink;
`;
function App() {
  return (
    <div css={mainWrap}>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
}

export default App;
