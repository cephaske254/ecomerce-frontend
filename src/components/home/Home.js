import "./Home.css";
import React from "react";
import ProductCardDefault from "../includes/product-card/ProductCardDefault";
import topProducts from "./topProducts.json";
import { Link } from "react-router-dom";
import Footer from "../includes/footer/Footer";
import { navbarRef } from "../includes/navbar/Navbar";

class Home extends React.Component {
  render() {
    return (
      <>
        <Carousel />
        <JumboTron />
        <TopProducts />
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
      <div
        className="carousel bg-dark slide carousel-fade"
        id="carousel"
        data-ride="carousel"
        data-pause="false"
      >
        <div className="carousel-inner">
          <CarouselItem />
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
    );
  }

  componentDidMount() {
    try {
      let navbar = navbarRef.current;
      navbar.classList.remove("sticky-top");
      navbar.classList.add("fixed-top");
    } catch {}
  }

  componentWillUnmount() {
    try {
      let navbar = navbarRef.current;
      navbar.classList.remove("fixed-top");
      navbar.classList.add("sticky-top");
    } catch {}
  }
}

class CarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselItems: [
        {
          title: "ASUS StudioBook ProArt",
          price: "KES 78,000",
          oldPrice: "KES 102,000",
          image: "https://cdn.mos.cms.futurecdn.net/JMzoTqNZJCXXzVUXbhNA8Z.jpg",
        },
        {
          title: "MacBook Pro",
          price: "KES 78,000",
          oldPrice: "KES 102,000",
          image:
            "https://cdn.wccftech.com/wp-content/uploads/2018/05/Upcoming-2016-MacBook-Pro-sneak-peak-features-included-and-release-date.jpg",
        },
        {
          title: "Home Pod",
          price: "KES 20,100",
          image:
            "https://cdn.cultofmac.com/wp-content/uploads/2018/02/HomePod-1.jpg",
        },
      ],
    };
  }

  render() {
    return (
      <>
        {this.state.carouselItems.map((item, key) => {
          return (
            <div
              key={key}
              className={"carousel-item " + (key === 0 ? "active" : "")}
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="carousel-caption">
                <p className="title">{item.title}</p>
                <p className="h5" hidden>
                  {item.price} &nbsp;
                  {item.oldPrice != null ? (
                    <strike className="text-muted">{item.oldPrice}</strike>
                  ) : (
                    ""
                  )}
                </p>
                <button className="btn shop-now">SHOP NOW</button>
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
  constructor(props) {
    super(props);
    this.state = {
      topProducts: topProducts,
    };
  }
  render() {
    return (
      <>
        <div className="container-fluid">
          <h4 className="section-header">TOP PRODUCTS</h4>
        </div>
        <div className="container bg-light">
          <div className="row">
            {this.state.topProducts.map((item) => {
              return <ProductCardDefault key={item.id} product={item} />;
            })}
          </div>
        </div>
      </>
    );
  }
}
export default Home;
