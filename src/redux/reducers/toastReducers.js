import * as actions from "../actionTypes";

export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.ADD_TOAST:
      return [
        ...state,
        {
          id: (Math.random() + 1).toString(6).substring(7),
          message: action.payload.message,
          cap: action.payload.cap,
          autoHide: action.payload.autoHide,
          type: action.payload.type,
        },
      ];
    case actions.REMOVE_TOAST:
      return [...state.filter((item) => item.id !== action.payload.id)];

    default:
      return state;
  }
}
