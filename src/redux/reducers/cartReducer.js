import * as actions from "../actionTypes";

export default function reducer(
  state = {
    items: [],
    total: 0,
  },
  action
) {
  switch (action.type) {
    case actions.ADD_TO_CART:
      const itemExists = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!itemExists) {
        return {
          ...state,
          items: [...state.items, action.payload],
          total: 0,
        };
      } else if (itemExists) {
        const items = state.items.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              quantity: parseInt(product.quantity) + 1,
            };
          }
          return product;
        });
        return {
          ...state,
          items: [...items],
        };
      }
      break;

    case actions.REDUCE_QUANTITY:
      const cartItems = state.items.map((product) => {
        if (product.id === action.payload.id) {
          if (product.quantity <= 1) {
            return { ...product };
          }
          let quantity = product.quantity - 1;
          return { ...product, quantity };
        }
        return product;
      });
      return {
        ...state,
        items: [...cartItems],
      };
    case actions.REMOVE_FROM_CART:
      const items = state.items.filter(
        (product) => product.id !== action.payload.id
      );
      return {
        ...state,
        items: [...items],
      };
    default:
      return state;
  }
}
