import * as actions from "../actionTypes";

export default function reducer(state = { index: 0 }, action) {
  switch (action.type) {
    case actions.CHECKOUT_NEXT_INDEX:
      if (state.index <= action.payload.maximum) {
        return {
          ...state,
          index: state.index + 1,
        };
      }
      return state;
    case actions.CHECKOUT_PREV_INDEX:
      if (state.index > 0) {
        return {
          ...state,
          index: state.index + -1,
        };
      }
      return state;
    case actions.CHECKOUT_SET_INDEX:
      if (action.payload.index >= 0 && action.payload.index !== state.index) {
        return {
          ...state,
          index: action.payload.index,
        };
      }
      return state;
    default:
      return state;
  }
}
