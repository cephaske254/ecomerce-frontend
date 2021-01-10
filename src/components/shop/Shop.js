import React from "react";
import "./Shop.css";
import ProductCarddefault from "../includes/product-card/ProductCardDefault";
import { connect } from "react-redux";
import { getProducts } from "../../api/inventory";

class Shop extends React.Component {
  componentDidMount() {
    getProducts();
  }
  render() {
    return (
      <>
        <div className="container for-top">
          <h4 className="mt-2">SHOP</h4>
          <div className="row">
            <div className="col container">
              <div className="row">
                {this.props.products &&
                  this.props.products.map((product, index) => {
                    return (
                      <ProductCarddefault
                        key={"prKey-" + index}
                        product={product}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const inventory = state.inventory;
  return {
    products: inventory.products.data,
    next: inventory.products.next,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Shop);
