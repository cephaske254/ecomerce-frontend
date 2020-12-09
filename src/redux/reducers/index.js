import { combineReducers } from "redux";
import cartReducers from "./cartReducer";
import toastReducers from "./toastReducers";
import deliveryInfoReducer from "./deliveryInfoReducer";

import checkoutPageIndexReducer from "./checkoutReducers";

const rootReducers = combineReducers({
  cart: cartReducers,
  toasts: toastReducers,
  deliveryInfo: deliveryInfoReducer,
  checkoutPageIndex: checkoutPageIndexReducer,
});

export default rootReducers;
