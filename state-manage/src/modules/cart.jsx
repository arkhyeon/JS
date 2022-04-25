export const ADD_CART = 'CART/ADD_CART';

export const addToCart = state => ({ type: ADD_CART, product: state });

const initialState = [];

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART:
      return [
        ...state,
        {
          ...action.product,
        },
      ];

    default:
      return state;
  }
};
