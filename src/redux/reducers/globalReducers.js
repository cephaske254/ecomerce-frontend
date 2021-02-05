import * as actions from "../actionTypes";

const defaultState = { banners: [], topProducts: [] };

export default function (state = defaultState, action) {
  switch (action.type) {
    case actions.SET_BANNERS:
      return { ...state, banners: [...action.payload] };
    case actions.SET_TOP_PRODUCTS:
      return { ...state, topProducts: [...action.payload] };
    default:
      return state;
  }
}
