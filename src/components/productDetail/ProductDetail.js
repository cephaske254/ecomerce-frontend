import React from "react";
import "./ProductDetail.css";
import { addToCart } from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import { addToast } from "../../redux/actions/toastActions";
import { getProduct } from "../../api/inventory";
import { formatPrice } from "../../utils/functions";
import LoadingSm from "../includes/loading/loadingSm";

class ProductDetail extends React.Component {
  state = {
    loading: false,
    imageHeight: "auto",
  };

  setImageHeight() {
    let images = document.querySelectorAll(".imagesScroll .imageCont");
    if (images[0]) {
      this.setState({ imageHeight: `${images.offsetWidth}px` });
    }
  }
  componentDidMount() {
    this.setImageHeight();
    const slug = this.props.match.params.product_slug;

    window.onresize = () => {
      this.setImageHeight();
    };

    if (this.props.product && this.props.product.slug === slug) return;
    console.log(this.props.product.slug);

    this.setState({ loading: true });
    getProduct(slug).finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <>
        <style
          dangerouslySetInnerHTML={{
            __html: `
      .imagesScroll .imageCont {
        min-height:${this.state.imageHeight} !important;
      }
      `,
          }}
        ></style>
        {this.state.loading &&
        this.props.match.params.slug !== this.props.product.slug ? (
          <LoadingSm />
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-7 py-2 imagesScroll">
                <div className="fluid">
                  <div className="card border-0 shadow-sm">
                    <div
                      className="carousel slide w-100"
                      id="carousel"
                      data-ride="carousel"
                      data-wrap="true"
                      data-keyboard="true"
                    >
                      <div className="carousel-inner">
                        {this.props.product.images &&
                          this.props.product.images.map((image, index) => {
                            return (
                              <div
                                key={"carousel-img-" + index}
                                className={
                                  "carousel-item" +
                                  (index === 0 ? " active" : "")
                                }
                              >
                                <div className="d-flex imageCont">
                                  <img
                                    src={image.image}
                                    alt=""
                                    className=""
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <ol className="carousel-indicators">
                        {this.props.product.images &&
                          this.props.product.images.map((image, index) => {
                            return (
                              <li
                                key={image}
                                data-target="#carousel"
                                data-slide-to={index}
                                style={{
                                  backgroundImage: `url(${image.image})`,
                                }}
                                className={
                                  "border " + (index === 0 ? "active" : "")
                                }
                              ></li>
                            );
                          })}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-5 col-12 py-2 px-3">
                <p className="my-0 d-flex card-title h4">
                  {this.props.product.name}
                </p>

                <AddToCartView
                  addToCart={this.props.addToCart}
                  product={this.props.product}
                />
                <hr />

                <Description description={this.props.product.description} />

                {this.props.product.attributes && (
                  <AttributeCont attributes={this.props.product.attributes} />
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

class Description extends React.Component {
  render() {
    return (
      <>
        <div className="">
          <h5 className="card-subtitle">Description</h5>
          <div className="card-body py-0 px-2">
            {this.props.description ? (
              <div
                dangerouslySetInnerHTML={{ __html: this.props.description }}
                className="text"
              />
            ) : (
              <p className="text-muted text-center">No Description Provided</p>
            )}
          </div>
        </div>
      </>
    );
  }
}

class AttributeCont extends React.Component {
  render() {
    return (
      <>
        {this.props.attributes.length > 0 &&
          this.props.attributes.map((attr) => {
            if (attr.name === "colors" && attr.items.length > 0) {
              return <ColorPad key={attr.name} items={attr.items} />;
            } else if (attr.name === "storage") {
              return (
                <>
                  <div className="text-bold">{attr.name}</div>
                  <div className="d-flex">
                    {attr.items.map((item) => {
                      return (
                        <div key={item.value} className="pad">
                          {item.value}
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            }

            return null;
          })}
      </>
    );
  }
}

class ColorPad extends React.Component {
  render() {
    return (
      <>
        <div className="text-bold">Colors</div>
        <div className="d-flex">
          {this.props.items.map((item) => {
            return (
              <div
                key={item.value}
                className="color-pad"
                style={{ backgroundColor: item.value.toString() }}
              ></div>
            );
          })}
        </div>
      </>
    );
  }
}

class AddToCartView extends React.Component {
  handleAddToCart = () => {
    this.props.addToCart(
      this.props.product.id,
      this.props.product.name,
      this.props.product.price,
      this.props.product.images[0].image || null
    );
  };
  render() {
    return (
      <>
        <div className="m-0">
          <div className="d-flex m-0 text-primary">
            <p className="prc-tag col h6">
              KES {formatPrice(this.props.product.price)}
            </p>
            {this.props.product.discount_price &&
              this.props.product.market_price && (
                <p className="col strike text-muted h6">
                  KES {formatPrice(this.props.product.market_price)}
                </p>
              )}
          </div>
          <button
            onClick={() => {
              this.handleAddToCart();
            }}
            className="btn w-100 mx-2 btn-sm btn-mono btn-gradient"
          >
            ADD TO CART
          </button>
        </div>
      </>
    );
  }
}

//
const mapStateToProps = (state) => {
  return {
    product: state.inventory.productDetail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, name, price, image) => {
      dispatch(addToCart(id, name, price, image));
      dispatch(addToast(`${name} added to cart`, "dark", true, false));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
