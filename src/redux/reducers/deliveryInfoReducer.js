import * as actions from "../actionTypes";

const defaultState = {
  first_name: "",
  last_name: "",
  phone: "",
  phone2: "",
  email: "",

  address: "",
  address2: "",

  delivery_option: "",

  city: "",
  state: "",
  postal_code: "",
  country: "",
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actions.CHECKOUT_ADD_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };

    case actions.CHECKOUT_ADD_DELIVERY_OPTION:
      const data = {
        ...state,
        delivery_option: action.payload,
      };
      return data;

    case actions.CHECKOUT_ADD_PAYMENT_METHOD:
      const paymentMethod = {
        ...state,
        paymentMethod: action.payload.paymentMethod,
      };
      return paymentMethod

    default:
      return state;
  }
}
