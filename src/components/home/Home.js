import "./Home.css";
import React from "react";
import ProductCardDefault from "../includes/product-card/ProductCardDefault";
import { Link } from "react-router-dom";
import Footer from "../includes/footer/Footer";
import { navbarRef } from "../includes/navbar/Navbar";
import { connect } from "react-redux";
import { addBannerAds } from "../../redux/actions/globalActions";
import { getBanners, getTopProducts } from "../../api/globals";

class Home extends React.Component {
  render() {
    return (
      <>
        <Carousel {...this.props} />
        <JumboTron />
        <TopProducts topProducts={this.props.topProducts} />
        <Footer />
      </>
    );
  }
  componentDidMount() {}
}
class Carousel extends React.Component {
  render() {
    document.title = `${process.env.REACT_APP_TITLE} | Home`;
    return (
      <>
        {this.props.banners.length > 0 ? (
          <div
            className="carousel bg-dark slide carousel-fade"
            id="carousel"
            data-ride="carousel"
            data-pause="false"
          >
            <div className="carousel-inner">
              <CarouselItems {...this.props} />
            </div>

            <a
              className="carousel-control-prev"
              href="#carousel"
              role="button"
              data-slide="prev"
            >
              <i
                className="fas fa-chevron-circle-left fa-lg"
                aria-hidden="true"
              ></i>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carousel"
              role="button"
              data-slide="next"
            >
              <i
                className="fas fa-chevron-circle-right fa-lg"
                aria-hidden="true"
              ></i>
              <span className="sr-only">Next</span>
            </a>
          </div>
        ) : (
          <div
            className="d-flex bg-dark justify-content-center 
          p-2"
          >
            <div className="spinner-grow" />
          </div>
        )}
      </>
    );
  }

  componentDidMount() {
    try {
      let navbar = navbarRef.current;
      navbar.classList.remove("sticky-top");
      navbar.classList.add("fixed-top");
    } catch {}

    if (!this.props.banners.length) getBanners();
  }

  componentWillUnmount() {
    try {
      let navbar = navbarRef.current;
      navbar.classList.remove("fixed-top");
      navbar.classList.add("sticky-top");
    } catch {}
  }
}

class CarouselItems extends React.Component {
  render() {
    return (
      <>
        {this.props.banners.map((item, key) => {
          return (
            <div
              key={key}
              className={"carousel-item " + (key === 0 ? "active" : "")}
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div class="carousel-caption">
                <p class="title">{item.title}</p>
                <div class="px-2 prices">
                  {item.product && item.product.price && item.show_prices && (
                    <div class="d-flex" v-if="">
                      <p class="h5">{"KES " + item.product.price}</p>
                      {item.product && item.product.market_price && (
                        <p class="h5 ml-2">
                          <span class="mx-3 my-0 text-center">|</span>
                          <span class="strike text-light">
                            {"KES " + item.product.market_price}
                          </span>
                        </p>
                      )}
                    </div>
                  )}{" "}
                  <Link to={`/p/${item.product.slug}/`} class="btn shop-now">
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

class JumboTron extends React.Component {
  render() {
    return (
      <div className="container-fluid bg-dark py-5">
        <div className="row flex-column justify-content-center align-items-center">
          <div className="d-flex py-3 text-center flex-column">
            <p className="h3 jumbotron-header">Don't worry, we have it.</p>
            <Link to="/shop" className="btn btn-light jumbotron-btn">
              GO TO SHOP
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

class TopProducts extends React.Component {
  componentDidMount() {
    getTopProducts();
  }
  render() {
    return (
      <>
        {this.props.topProducts.length > 0 ? (
          <>
            <div className="container-fluid">
              <h4 className="section-header">TOP PRODUCTS</h4>
            </div>
            <div className="container bg-light">
              <div className="row">
                {this.props.topProducts.map((item) => {
                  return <ProductCardDefault key={item.id} product={item} />;
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-grow"></div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  banners: state.globals.banners,
  topProducts: state.globals.topProducts,
});
const mapDispatchToProps = (dispatch) => ({
  setBanners: (banners) => dispatch(addBannerAds(banners)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
