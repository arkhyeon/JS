import React from 'react';
import { ShopData } from '../Data';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { addShop } from '../modules/shop';

const dispatch = useDispatch();

// const { addShop } = useSelector(state => state.text)

const addre = text => {
  dispatch(addShop(text));
};

function Shop() {
  return (
    <>
      <button onClick={addre('a')}></button>
      {ShopData.map((sd, index) => {
        return <Product key={index} index={index} props={sd} />;
      })}
      {/*<CounterContainer />*/}
      {/*<TodosContainer />*/}
    </>
  );
}

export default Shop;
