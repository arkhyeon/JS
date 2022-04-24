import React from 'react';
import { useSelector } from 'react-redux';
import { ShopData } from '../Data';
import Product from '../components/Product';

function Cart(props) {
  const cartItem = useSelector(state => state.shop);
  return (
    <div>
      {cartItem.map((sd, index) => {
        return <div key={index}>{sd.name}</div>;
      })}
    </div>
  );
}

export default Cart;
