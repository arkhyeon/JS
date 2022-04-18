import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import Cart from './Page/Cart';
import Shop from './Page/Shop';
import { ShopData } from './Data';

const divStyle = css`
  width: 80%;
  background-color: hotpink;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function App() {
  return (
    <div css={divStyle}>
      {ShopData.map((sd, index) => {
        console.log(index);
        return <Shop key={index} index={index} props={sd} />;
      })}
      {/*<CounterContainer />*/}
      {/*<TodosContainer />*/}
    </div>
  );
}

export default App;
