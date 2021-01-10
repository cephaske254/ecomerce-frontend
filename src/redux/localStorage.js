export const saveState = (state) => {
  const data = {
    cart: state.cart,
    deliveryInfo: state.deliveryInfo,
    checkoutPageIndex: state.checkoutPageIndex,
  };
  sessionStorage.setItem("state", JSON.stringify(data));
};

export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};
