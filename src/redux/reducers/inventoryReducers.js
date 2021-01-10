import * as actions from "../actionTypes";
const defaultState = {
  categories: [],
  productDetail: {
    name: "",
    description: "",
    images: [],
  },
  products: {
    data: [],
    count: 0,
    next: null,
  },
};
export default function reducer(state = { ...defaultState }, action) {
  switch (action.type) {
    case actions.SET_PRODUCTS:
      return {
        ...state,
        products: {
          data: [...action.payload.data],
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
        },
      };

    case actions.SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
}
