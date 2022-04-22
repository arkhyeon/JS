export const INCREASE = 'COUNT/INCREASE';

export const increaseCount = count => ({ type: INCREASE });

const initialState = {
  count: 0,
};

export const shop = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        count: state.count + 1,
      };

    default:
      return state;
  }
};
