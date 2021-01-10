import axios from "axios";
import store from "../store";
import {
  setProducts,
  setProductDetail,
} from "../redux/actions/inventoryActions";

export const getProducts = (nextUrl = undefined) => {
  const url = nextUrl ? nextUrl : "/products/";

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((data) => {
        store.dispatch(setProducts(data.data));
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const getProduct = (slug) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/products/" + slug + "/")
      .then((data) => {
        store.dispatch(setProductDetail(data.data));
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};
