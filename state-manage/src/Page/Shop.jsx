import React from 'react';
import { ShopData } from '../Data';
import Product from '../components/Product';

function Shop() {
  return (
    <>
      {ShopData.map((sd, index) => {
        console.log(sd);
        return <Product key={index} index={index} props={sd} />;
      })}
      {/*<CounterContainer />*/}
      {/*<TodosContainer />*/}
    </>
  );
}

export default Shop;
