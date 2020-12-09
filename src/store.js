import { createStore } from "redux";
import { loadState, saveState } from "./redux/localStorage";
import rootReducers from "./redux/reducers";
import throttle from "lodash.throttle";

const persistedState = loadState();

const store = createStore(
  rootReducers,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(throttle(() => saveState(store.getState()), 1000));

export default store;
