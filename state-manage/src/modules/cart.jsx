export const ADD_CART = 'CART/ADD_CART';
export const REMOVE_CART = 'CART/REMOVE_CART';

export const addCart = state => ({ type: ADD_CART, product: state });
export const removeCart = state => ({ type: REMOVE_CART, product: state });

const initialState = [];

export const cart = (state = initialState, action) => {
  console.log([...state.filter(s => s.id !== action.product.id)]);
  switch (action.type) {
    case ADD_CART:
      return [
        ...state.filter(s => s.id !== action.product.id),
        {
          ...action.product,
        },
      ];
    case REMOVE_CART:
      return [...state.filter(s => s.id !== action.product.id)];

    default:
      return state;
  }
};
