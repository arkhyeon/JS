import React from 'react';
import { ShopData } from '../Data';
import Product from '../components/Product';

function Shop() {
  return (
    <>
      <button style={{ width: '200px' }}>1</button>
      {ShopData.map((sd, index) => {
        return <Product key={index} index={index} props={sd} />;
      })}
      {/*<CounterContainer />*/}
      {/*<TodosContainer />*/}
    </>
  );
}

export default Shop;
