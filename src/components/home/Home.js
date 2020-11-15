import "./Home.css";
import React from "react";
import ProductCardDefault from "../includes/product-card/ProductCardDefault";
import dji from "../../dji.jpg";

class Home extends React.Component {
  render() {
    return (
      <>
        <Carousel />
        <JumboTron />
        <TopProducts />
      </>
    );
  }
  componentDidMount() {}
}
class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbar: document.getElementsByClassName("navbar"),
    };
  }
  render() {
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
    let navbar = this.state.navbar;
    if (this.state.navbar.length >0) {
      navbar[0].classList.remove("sticky-top");
      navbar[0].classList.add("fixed-top");
    }
  }

  componentWillUnmount() {
    let navbar = this.state.navbar;
    if (this.state.navbar.length >0) {
      navbar[0].classList.remove("fixed-top");
      navbar[0].classList.add("sticky-top");
    }
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
            <div className="btn btn-light jumbotron-btn">GO TO SHOP</div>
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
      topProducts: [
        {
          name: "Apple Iphone 7 Earphones",
          price: "KES 3,500",
          oldPrice: "KES 4,000",
          image:
            "https://www.electronicspareparts.nl/388-large_default/copy-of-samsung-ys-headset-ehs61asfwe-gh59-11849a-35-mm-jack-earphone-for-android-phones-and-all-other-brands-of-devices.jpg",
        },
        {
          name: "Galaxy S20, S20 Plus",
          price: "KES 102,000",
          oldPrice: "KES 105,000",
          image:
            "https://images.samsung.com/sg/smartphones/galaxy-s20/buy/1-13-hubble-y2-cosmic-gray-gallery-mobile-img.jpg",
        },
        {
          name: "Oppo F11 Pro 6GB/128GB",
          price: "KES 40,500",
          image:
            "https://ecitymobileshop.com/wp-content/uploads/2019/05/Oppo-F11-Pro.jpg",
        },
        {
          name: "Xiaomi Mi Note 10 Lite 6GB/128GB",
          price: "KES 53,500",
          image:
            "https://thetomorrowtechnology.co.ke/wp-content/uploads/2020/06/xiaomi_mi_note_10_lite_004_blanco_ad_l.jpg",
        },
        {
          name: "Philips Hue Light Strip",
          price: "KES 2,500",
          image:
            "https://www.assets.signify.com/is/image/PhilipsLighting/e5894e628723498da4f3ac2500a4259d",
        },
        {
          name: "Iphone XS Max 64GB",
          price: "KES 75,000",
          oldPrice: "KES 87,000",
          image:
            "https://static.compareindia.news18.com/compareindia/gallery/images/2018/oct/xsmax_1_161026464764.jpg",
        },
        {
          name: "Apple Iphone lightning Cable",
          price: "KES 1,999",
          image:
            "https://felixredsmart.com/wp-content/uploads/2020/03/apple-lighting-cable.jpg",
        },
        {
          name: "Dji Osmo4 Stabilizer",
          price: "KES 20,000",
          oldPrice: "KES 25,000",
          image: dji,
        },
        {
          name: "Xiaomi Wear 3100",
          price: "KES 12,000",
          image:
            "https://gloimg.gbtcdn.com/images/pdm-product-pic/Electronic/2019/11/12/source-img/20191112100832_56551.jpg_500x500.jpg",
        },
        {
          name: "Redragon RGB Keyboard & Mouse",
          price: "KES 4,500",
          image:
            "https://i5.walmartimages.com/asr/9ecdffb2-3280-4e2b-b499-8b5512dacdd7_1.b74e7961fc2cde8140300cbd79fb198d.jpeg",
        },
        {
          name: "OnePlus 6T A6013",
          price: "KES 37,999",
          image:
            "https://techbuyz.co.ke/wp-content/uploads/2020/05/oneplus.jpg",
        },
        {
          name: "Samsung 860 EVO, 4TB",
          price: "KES 87,000",
          oldPrice: "KES 99,000",
          image:
            "https://static3.caseking.de/media/image/thumbnail/ssss-136_ssss_136_01_800x800.jpg",
        },
      ],
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
            {this.state.topProducts.map((item, key) => {
              return (
                <ProductCardDefault
                  price={item.price}
                  oldPrice={item.oldPrice}
                  name={item.name}
                  image={item.image}
                  key={key}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
export default Home;
