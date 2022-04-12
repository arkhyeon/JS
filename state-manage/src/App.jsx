import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';
import { useState } from 'react';

function App() {
  const [state, setState] = useState();
  return (
    <div>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
}

export default App;
