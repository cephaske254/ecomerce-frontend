import * as actions from "../actionTypes";

const defaultState = {
  firstName: null,
  lastName: null,
  phone: null,
  phone2: null,
  email: null,

  address: null,
  address2: null,

  deliveryOption: null,

  city: null,
  state: null,
  postalCode: null,
  country: null,
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
        deliveryOption: action.payload,
      };
      return data;

    default:
      return state;
  }
}
