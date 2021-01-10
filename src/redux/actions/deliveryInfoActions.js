import * as actions from "../actionTypes";

export const checkoutAddUserInfo = (
  first_name,
  last_name,
  phone,
  phone2,
  email
) => {
  return {
    type: actions.CHECKOUT_ADD_USER_INFO,
    payload: {
      first_name,
      last_name,
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
  postal_code,
  country
) => {
  return {
    type: actions.CHECKOUT_ADD_DELIVERY_INFO,
    payload: {
      address,
      address2,
      city,
      state,
      postal_code,
      country,
    },
  };
};

export const checkoutAddDeliveryOption = (delivery_option) => {
  return {
    type: actions.CHECKOUT_ADD_DELIVERY_OPTION,
    payload: delivery_option,
  };
};

export const addPaymentMethod = (paymentMethod) => {
  return {
    type: actions.CHECKOUT_ADD_PAYMENT_METHOD,
    payload: { paymentMethod },
  };
};
