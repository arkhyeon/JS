import React from 'react';
import { ShopData } from '../Data';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCount } from '../modules/shop';

function Shop() {
  const dispatch = useDispatch();

  const { count } = useSelector(state => state.shop);

  const increase = () => {
    console.log('start');
    console.log(count);
    dispatch(increaseCount());
  };

  return (
    <>
      <button onClick={increase} style={{ width: '200px' }}>
        1{count}
      </button>
      {ShopData.map((sd, index) => {
        return <Product key={index} index={index} props={sd} />;
      })}
      {/*<CounterContainer />*/}
      {/*<TodosContainer />*/}
    </>
  );
}

export default Shop;
