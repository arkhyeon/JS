export const INTEREST = 'CART/INTEREST';
export const REMOVE_INTEREST = 'CART/REMOVE_INTEREST';

export const addInterest = state => ({ type: INTEREST, interest: state });
export const removeInterest = state => ({ type: REMOVE_INTEREST, interest: state });

const initialState = [];

export const interest = (state = initialState, action) => {
  switch (action.type) {
    case INTEREST:
      return [...state.filter(s => s !== action.interest), action.interest];

    case REMOVE_INTEREST:
      return [...state.filter(s => s !== action.interest)];
    default:
      return state;
  }
};
