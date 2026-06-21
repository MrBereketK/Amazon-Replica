import { type } from "./actionType";

export const initialState = {
  basket: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case type.ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };

    default:
      return state;
  }
};
