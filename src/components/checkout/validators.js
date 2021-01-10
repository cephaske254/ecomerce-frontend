const validateRequired = (val, required = true) => {
  if (!val && required === true) {
    return "This field is required!";
  }
  return;
};

export const validateLength = (
  val,
  field,
  min = 1,
  max = 0,
  anonymous = false
) => {
  if (max === 0 && val && val.length < min) {
    return anonymous
      ? `Please enter a valid ${field}`
      : `Enter atleast ${min} characters`;
  }
  if (max > 0 && val && val.length >= min) {
    return anonymous
      ? `Please enter a valid ${field}`
      : `Enter atmost ${min} characters`;
  }
};

const validateEmail = (val, required = true) => {
  const data = {};
  const errors = [];

  const vReq = validateRequired(val, required);
  if (vReq) {
    errors.push(vReq);
  }

  const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (val && !filter.test(val)) {
    errors.push("Please enter a valid email!");
  }
  data["email"] = errors;
  return data;
};

const validateNames = (val, field) => {
  const data = {};
  const errors = [];

  const vReq = validateRequired(val);
  if (vReq) {
    errors.push(vReq);
  }

  if (/[^a-zA-z -]/.test(val)) {
    errors.push("Invalid characters");
  }
  data[field] = errors;
  return data;
};

export const validatePhone = (val, field = "phone", required = true) => {
  const data = {};
  const errors = [];

  const vReq = validateRequired(val, required);
  const VLen = validateLength(val, "phone number", 8, 0, true);
  if (vReq) {
    errors.push(vReq);
  }
  if (VLen) {
    errors.push(VLen);
  }

  if (val && /[^0-9+ -]/.test(val)) {
    errors.push("Invalid characters");
  }
  data[field] = errors;
  return data;
};

export const ValidateUserInfo = (state) => {
  const errors = {
    ...validateNames(state.first_name, "first_name"),
    ...validateNames(state.last_name, "last_name"),
    ...validatePhone(state.phone, "phone"),
    ...validatePhone(state.phone2, "phone2", false),
    ...validateEmail(state.email, true),
  };
  return { errors: errors };
};

// DELIVERY INFO
const validateAddress = (val, field = "address") => {
  const data = {};
  const errors = [];

  const vReq = validateRequired(val, true);
  // const vLen = validateLength(val, "address", 3, 0, true);
  if (vReq) {
    errors.push(vReq);
  }
  data[field] = errors;
  return data;
};
const validateCity = (val, field = "city", required = true) => {
  const data = {};
  const errors = [];
  const vReq = validateRequired(val, required);
  if (vReq) {
    errors.push(vReq);
  }
  data[field] = errors;
  return data;
};
export const ValidateDeliveryInfo = (state) => {
  const errors = {
    ...validateAddress(state.address),
    ...validateCity(state.city, "city"),
    ...validateCity(state.state, "state"),
    ...validateCity(state.postal_code, "postal_code"),
    ...validateCity(state.country, "country"),
  };
  return { errors: errors };
};
