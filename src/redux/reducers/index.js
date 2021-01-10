import { combineReducers } from "redux";
import cartReducers from "./cartReducer";
import toastReducers from "./toastReducers";
import deliveryInfoReducer from "./deliveryInfoReducer";
import checkoutPageIndexReducer from "./checkoutReducers";
import inventoryReducers from "./inventoryReducers";

const rootReducers = combineReducers({
  cart: cartReducers,
  toasts: toastReducers,
  deliveryInfo: deliveryInfoReducer,
  checkoutPageIndex: checkoutPageIndexReducer,
  inventory: inventoryReducers,
});

export default rootReducers;
