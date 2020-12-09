import * as actions from "../actionTypes";

export const checkoutNextIndex = (maximum) => {
  return {
    type: actions.CHECKOUT_NEXT_INDEX,
    payload: {
      maximum,
    },
  };
};
export const checkoutPrevIndex = () => {
  return {
    type: actions.CHECKOUT_PREV_INDEX,
  };
};

export const checkoutSetIndex = (index) => {
  return {
    type: actions.CHECKOUT_SET_INDEX,
    payload: {
      index,
    },
  };
};
