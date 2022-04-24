export const INCREASE = 'COUNT/INCREASE';
export const ADD_CART = 'COUNT/ADD_CART';

export const addToCart = state => ({ type: ADD_CART, state });

const initialState = {
  img: '',
  name: '',
  desc: '',
  category: '',
};

export const shop = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_CART:
      return {
        ...state,
        state,
      };

    default:
      return state;
  }
};
