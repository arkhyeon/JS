import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';
import { css, jsx } from '@emotion/react';

const base = css`
  background-color: darkgreen;
  color: turquoise;
`;
function App() {
  return (
    <div css={base}>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
}

export default App;
