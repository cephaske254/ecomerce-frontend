import * as actions from "../actionTypes";

export const addToCart = (id, name, price, image) => {
  return {
    type: actions.ADD_TO_CART,
    payload: {
      id,
      name,
      price,
      quantity: 1,
      image,
    },
  };
};

export const removeFromCart = (id) => {
  return {
    type: actions.REMOVE_FROM_CART,
    payload: { id },
  };
};

export const reduceQuantity = (id) => {
  return {
    type: actions.REDUCE_QUANTITY,
    payload: { id },
  };
};


