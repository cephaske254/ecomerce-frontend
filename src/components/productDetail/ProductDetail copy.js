import React, { useEffect } from "react";
import "./ProductDetail.css";
import data from "./product.json";
import { useParams } from "react-router-dom";
import { useState } from "react";

class ProductDetail extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      imageHeight: "auto",
      product: data,
      id: CurrentId,
    };
  }

  setImageHeight() {
    let images = document.querySelectorAll(".imagesScroll .imageCont");
    if (images[0]) {
      this.setState({ imageHeight: `${images.offsetWidth}px` });
    }
  }
  componentDidMount() {
    this.setImageHeight();

    window.onresize = () => {
      this.setImageHeight();
    };
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
                      <div className="carousel-item active">
                        <div className="d-flex imageCont">
                          <img
                            src="https://thetomorrowtechnology.co.ke/wp-content/uploads/2020/06/xiaomi_mi_note_10_lite_004_blanco_ad_l.jpg"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>

                      <div className="carousel-item">
                        <div className="d-flex imageCont">
                          <img
                            src="https://ecitymobileshop.com/wp-content/uploads/2019/05/Oppo-F11-Pro.jpg"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                    <ol className="carousel-indicators">
                      <li
                        data-target="#carousel"
                        data-slide-to="0"
                        style={{
                          backgroundImage:
                            "url(https://thetomorrowtechnology.co.ke/wp-content/uploads/2020/06/xiaomi_mi_note_10_lite_004_blanco_ad_l.jpg)",
                        }}
                        className="active border"
                      ></li>
                      <li
                        data-target="#carousel"
                        data-slide-to="1"
                        style={{
                          backgroundImage:
                            "url(https://ecitymobileshop.com/wp-content/uploads/2019/05/Oppo-F11-Pro.jpg)",
                        }}
                        className="active border"
                      ></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-5 py-2 px-3">
              <div className="title">
                <p className="my-0 d-flex">{this.state.product.name}</p>
              </div>

              <Description description={this.state.product.description} />

              <AttributeCont attributes={this.state.product.attributes} />

              <AddToCart product={this.state.product} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

class Description extends React.Component {
  render() {
    return (
      <>
        <h5>Description</h5>
        {this.props.description.length > 0 ? (
          <ul className="px-3 small">
            {this.props.description.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        ) : (
          <p className="text-muted text-center">No Description Provided</p>
        )}
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

class AddToCart extends React.Component {
  render() {
    return (
      <>
        <div className="mt-2"></div>
        <div className="py-2">
          <div className="d-flex m-0 text-primary">
            <p className="prc-tag h5">KES 2,000</p>
            <p className="col strike text-muted">KES 4,500</p>
          </div>
          <div className="btn-group">
            <button className="btn btn-sm btn-mono btn-gradient">
              ADD TO CART
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ProductDetail;
