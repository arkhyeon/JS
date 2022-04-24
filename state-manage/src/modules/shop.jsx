export const INCREASE = 'COUNT/INCREASE';
export const ADD_CART = 'COUNT/ADD_CART';

export const addToCart = state => ({ type: ADD_CART, product: state });

const initialState = [{}];

export const shop = (state = initialState, action) => {
  console.log(action);
  console.log(state);
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
