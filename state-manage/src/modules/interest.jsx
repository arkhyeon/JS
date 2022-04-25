export const INTEREST = 'CART/INTEREST';

export const addInterest = state => ({ type: INTEREST, interest: state });

const initialState = [];

export const interest = (state = initialState, action) => {
  switch (action.type) {
    case INTEREST:
      return [...state.filter(s => s !== action.interest), action.interest];

    default:
      return state;
  }
};
