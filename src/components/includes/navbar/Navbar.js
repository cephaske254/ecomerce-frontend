import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import RouteComponent from "../routeComponent";
import Cart from "../cart/Cart";
import "./Navbar.css";

import * as $ from "jquery";
import { connect } from "react-redux";

export const navbarRef = React.createRef();

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.navbarRef = navbarRef;

    this.state = {
      fixed: this.props.fixed,
    };
  }

  render() {
    return (
      <>
        <div className="progress-container">
          <div className="progress-bar" id="scrollBar"></div>
        </div>

        <BrowserRouter>
          <nav
            ref={this.navbarRef}
            className={
              "navbar " +
              (this.state.fixed ? "fixed-top" : "sticky-top") +
              " navbar-expand-lg w-100"
            }
          >
            <Link to="/" className="navbar-brand text-dark">
              Company
            </Link>
            <div className="navbar-collapse collapse" id="navbarMobi">
              <div className="d-none d-md-block col-md-5 col-lg-4"></div>
              <ul className="navbar-nav col">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/shop" className="nav-link">
                    Shop
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="navbar-nav d-flex flex-row align-items-center justify-content-end w-100">
                <li className="nav-item">
                  <button
                    data-target="#searchWrapper"
                    data-toggle="collapse"
                    className="btn link"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </li>
                <li className="nav-item">
                  <Link to="#" className="btn link">
                    <i className="fas fa-user"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <CartIcon />
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn navbar-toggler"
                    data-target="#navbarMobi"
                    data-toggle="collapse"
                  >
                    <i className="fas fa-bars"></i>
                  </button>
                </li>
              </ul>
              <SearchBar />
            </div>
          </nav>

          <Cart />
          <RouteComponent></RouteComponent>
        </BrowserRouter>
      </>
    );
  }

  collapseNavbar() {
    try {
      let navbarLinks = document.querySelectorAll(
        "a.link,a.navbar-brand, .btn.link, .nav-link"
      );
      let navbarMobi = document.getElementById("navbarMobi");
      navbarLinks.forEach((element) => {
        element.addEventListener("click", function () {
          if (navbarMobi.classList.contains("show")) {
            navbarMobi.classList.toggle("show");
          }
        });
      });
    } catch {}
  }

  componentDidMount() {
    this.collapseNavbar();

    let navbarRef = this.navbarRef.current;
    let prevScrollpos = window.pageYOffset;
    let outerHeight = window.outerHeight;

    window.onload = () => {
      window.onscroll = () => {
        try {
          let currentScrollPos = window.pageYOffset;
          if (prevScrollpos > currentScrollPos) {
            navbarRef.style.top = "0";
          } else {
            if (currentScrollPos > outerHeight / 2) {
              navbarRef.style.top = `-${navbarRef.offsetHeight}px`;
            }
          }
          prevScrollpos = currentScrollPos;

          let winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;
          let height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
          let scrolled = (winScroll / height) * 100;
          document.getElementById("scrollBar").style.width = scrolled + "%";
        } catch {}
      };
    };
  }
}

Navbar.defaultProps = {
  fixed: false,
  cartItems: 0,
};
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="searchWrapper" className="collapse w-100 fixed-top">
        <div className="d-flex align-items-center justify-content-center vh-50 search-container w-100 bg-white">
          <form action="#" className="form-inline">
            <div className="btn-group">
              <input
                type="search"
                className="btn  search-input  border-primary text-center"
                placeholder="Search products"
              />
              <button className="btn search-btn btn-primary text-white">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          <button
            data-target="#searchWrapper"
            data-toggle="collapse"
            className="btn btn-close btn-sm btn-danger text-white"
          >
            <i className="fas fa-angle-double-up px-3"></i>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let total = 0;
  try {
    total = state.cart.items.reduce(
      (accumulator, current) => accumulator + current.quantity,
      0
    );
  } catch {}
  return {
    cartItems: total,
  };
};

export const CartIcon = connect(mapStateToProps)((props) => {
  function showCart() {
    let cart = $("#cartCont");
    cart.fadeIn();
    document.body.style.overflowY = "hidden";
  }

  return (
    <div onClick={() => showCart()} className="d-flex">
      <button className={"btn link " + props.classes}>
        <i className="fas fa-shopping-cart"></i>
      </button>
      <span className="badge bg-light" id="cartCount">
        {props.cartItems}
      </span>
    </div>
  );
});

export default Navbar;
