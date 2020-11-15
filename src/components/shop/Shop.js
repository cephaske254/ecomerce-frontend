import React from "react";
import "./Shop.css";
import ProductCarddefault from "../includes/product-card/ProductCardDefault";

class Shop extends React.Component {
  render() {
    return (
      <>
        <div className="container for-top">
          <h4 className="mt-2">SHOP</h4>
          <div className="row">
            <div className="col container">
              <div className="row">
                <ProductCarddefault />
                <ProductCarddefault />
                <ProductCarddefault />
                <ProductCarddefault />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Shop;
