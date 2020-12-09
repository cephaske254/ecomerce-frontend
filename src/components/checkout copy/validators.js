import { availableDeliveryOptions } from "./Components";

export const deliveryInfoValidator = (info) => {
  const object = {};
  object["firstName"] = info.firstName ? true : false;
  object["lastName"] = info.lastName ? true : false;
  object["phone"] = info.phone ? true : false;
  object["phone2"] = info.phone2 ? true : false;
  object["email"] = info.email ? true : false;

  return object;
};

export const validatePhoneNumber = (phone, blank = true) => {
  if (phone) {
    return phone.match(/^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
  }
  return true;
};

export const validateCheckOutInfo = (state) => {
  const object = { userInfo: false};

  if (
    (state.firstName && state.lastName && state.phone && state.email) ||
    state.phone2
  ) {
    object["userInfo"] = true;
  }

  // subComponents
  availableDeliveryOptions.forEach((option, index) => {
    const states = [];
    option.required.forEach((item) => {
      states.push(state[item] ? true : false);
    });
    if (states.includes(false)) {
      object[option.id] = false;
      return;
    }
    object[option.id] = true;
  });

  return object;
};
