import axios from "axios";
import { addBannerAds, addTopProducts } from "../redux/actions/globalActions";
import store from "../store";

export const getBanners = () => {
  return axios.get("/banners/?page_size=10000").then((data) => {
    store.dispatch(addBannerAds(data.data.data));
  });
};

export const getTopProducts = () => {
  return axios.get("/products/top/?page_size=1000").then((data) => {
    store.dispatch(addTopProducts(data.data.data));
  });
};
