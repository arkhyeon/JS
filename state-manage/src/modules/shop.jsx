const ADD_SHOP = 'shop/ADD_SHOP';

let nextId = 1;
export const addShop = text => ({
  type: ADD_SHOP,
  todo: {
    id: nextId++,
    text,
  },
});

const initialState = [];

export default function shop(state = initialState, action) {
  switch (action.type) {
    case ADD_SHOP:
      return state.concat(action.todo);
    default:
      return state;
  }
}
