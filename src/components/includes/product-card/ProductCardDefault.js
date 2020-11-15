import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import errorImage from "../../../error.png";
import Products from "../../products/Products";
import "./productCard.css";
import { slugify } from "../../../utils/functions";

class ProductCardDefault extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      image: this.props.image,
      price: this.props.price,
      oldPrice: this.props.oldPrice,
      productId: this.props.productId,
    };
  }
  onError = () => {
    if (!this.state.errored) {
      this.setState({
        image: errorImage,
        errored: true,
      });
    }
  };
  render() {
    return (
      <>
        <div className="col-sm-6 col-md-4 col-lg-3 p-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="product-image-cont">
              <img
                src={this.state.image}
                alt=""
                loading="lazy"
                className="card-img-top"
                onError={this.onError}
              />
            </div>
            <div className="card-footer bg-white border-0 d-flex flex-column justify-content-end h-100">
              <p className="font-weight-bold mb-1">{this.state.name}</p>
              <div className="d-flex small">
                <div className="col">{this.state.price}</div>
                <div className="text-right strike text-muted">
                  {this.state.oldPrice}
                </div>
              </div>
              <div className="d-flex mt-1">
                <Link
                  to={"/" + slugify(this.state.name)}
                  className="btn btn-mono  btn-gradient btn-sm w-100"
                >
                  ADD TO CART
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
ProductCardDefault.defaultProps = {
  name: "Product Name",
  price: "KES 200",
  oldPrice: null,
  image: "",
  productId: null,
};
// https://cdn.vox-cdn.com/thumbor/_E2j0isGoUJ9W1AqUYnSvjEjQz0=/0x0:2040x1360/1400x1400/filters:focal(857x517:1183x843):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/55971933/v_8A0A9690.0.jpg
export default ProductCardDefault;
