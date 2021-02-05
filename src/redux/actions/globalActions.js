import * as actions from "../actionTypes";

export const addBannerAds = (banners) => {
  return {
    type: actions.SET_BANNERS,
    payload: [...banners],
  };
};

export const addTopProducts = (products) => ({
  type: actions.SET_TOP_PRODUCTS,
  payload: [...products],
});
