import { type } from "./actionType";

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case type.ADD_TO_BASKET: {
      const existingItem = state.basket.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.payload.id
              ? { ...item, amount: (item.amount || 1) + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        basket: [...state.basket, { ...action.payload, amount: 1 }],
      };
    }

    case type.INCREASE_QTY:
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.payload
            ? { ...item, amount: (item.amount || 1) + 1 }
            : item,
        ),
      };

    case type.DECREASE_QTY: {
      const targetItem = state.basket.find(
        (item) => item.id === action.payload,
      );

      if (!targetItem) return state;

      if ((targetItem.amount || 1) <= 1) {
        return {
          ...state,
          basket: state.basket.filter((item) => item.id !== action.payload),
        };
      }

      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.payload
            ? { ...item, amount: (item.amount || 1) - 1 }
            : item,
        ),
      };
    }

    case type.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.payload),
      };

    case type.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
