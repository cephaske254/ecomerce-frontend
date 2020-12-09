import * as actions from "../actionTypes";

export const checkoutAddUserInfo = (
  firstName,
  lastName,
  phone,
  phone2,
  email
) => {
  return {
    type: actions.CHECKOUT_ADD_USER_INFO,
    payload: {
      firstName,
      lastName,
      phone,
      phone2,
      email,
    },
  };
};

export const checkoutAddDeliveryInfo = (
  address,
  address2,
  city,
  state,
  postalCode,
  country
) => {
  return {
    type: actions.CHECKOUT_ADD_DELIVERY_INFO,
    payload: {
      address,
      address2,
      city,
      state,
      postalCode,
      country,
    },
  };
};

export const checkoutAddDeliveryOption = (deliveryOption) => {
  return {
    type: actions.CHECKOUT_ADD_DELIVERY_OPTION,
    payload: deliveryOption,
  };
};
