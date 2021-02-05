import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../../../error.png";
import "./productCard.css";
import loadingSvg from "../../../assets/loader.svg";
import { addToCart } from "../../../redux/actions/cartActions";
import { connect } from "react-redux";
import { addToast } from "../../../redux/actions/toastActions";
import { formatPrice } from "../../../utils/functions";

class ProductCardDefault extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errored: false,
      image: this.props.product.image,
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

  handleAddToCart = () => {
    this.props.addToCart(
      this.props.product.id,
      this.props.product.name,
      this.props.product.price,
      this.props.product.image
    );
  };

  render() {
    return (
      <>
        <div
          key={this.props.product.name}
          className="col-sm-6 col-md-4 col-lg-3 p-3"
        >
          <div className="card text-dark text border-0 shadow-sm h-100 text-decoration-none">
            <Link
              className="card-top h-100 text-dark text-decoration-none"
              to={"/p/" + this.props.product.slug}
            >
              <div className="product-image-cont">
                <img src={loadingSvg} className="loadingImg" alt="" />
                <img
                  src={this.state.image}
                  alt=""
                  loading="lazy"
                  className="card-img-top"
                  onError={this.onError}
                />
              </div>
              <div className="card-footer px-2 bg-white border-0 d-flex flex-column justify-content-end">
                <p className="font-weight-bold mb-1">
                  {this.props.product.name}
                </p>
                <div className="d-flex small">
                  <div className="col p-0">
                    KES {formatPrice(this.props.product.price)}
                  </div>
                  {this.props.product.price &&
                    this.props.product.market_price && (
                      <div className="text-right strike text-muted">
                        KES {formatPrice(this.props.product.market_price)}
                      </div>
                    )}
                </div>
              </div>
            </Link>
            <div className="d-flex mt-1 p-2">
              <button
                onClick={() => {
                  this.handleAddToCart();
                }}
                className="btn btn-mono  btn-gradient btn-sm w-100"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
ProductCardDefault.defaultProps = {
  name: "Product Name",
  price: "KES 0",
  old_price: null,
  image: "",
  productId: null,
};

const matchDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, name, price, image) => {
      dispatch(addToCart(id, name, price, image));
      dispatch(addToast(`${name} added to cart`, "dark", true, false));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ProductCardDefault);
