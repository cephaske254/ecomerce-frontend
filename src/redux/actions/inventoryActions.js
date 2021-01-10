import * as actions from "../actionTypes";

export const setProducts = (payload) => {
  return {
    payload,
    type: actions.SET_PRODUCTS,
  };
};

export const setProductDetail = (payload) => {
  return {
    payload,
    type: actions.SET_PRODUCT_DETAIL,
  };
};
