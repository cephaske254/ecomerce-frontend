import * as actions from "../actionTypes";

export const addToast = (
  message,
  type = "dark",
  autoHide = true,
  cap = false
) => {
  return {
    type: actions.ADD_TOAST,
    payload: {
      message,
      type,
      autoHide,
      cap,
    },
  };
};

export const removeToast = (id) => {
  return {
    type: actions.REMOVE_TOAST,
    payload: {
      id,
    },
  };
};
