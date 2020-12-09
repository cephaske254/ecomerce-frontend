import React from "react";
import { connect } from "react-redux";
import "./Checkout.css";
import { navbarRef } from "../includes/navbar/Navbar";
import IndexIndicator, { checkOutPages } from "./IndexIndicator";
import {
  checkoutNextIndex,
  checkoutPrevIndex,
  checkoutSetIndex,
} from "../../redux/actions/checkoutActions";
import { checkoutBtnRef } from "../includes/cart/Cart";
import { CartIcon } from "../includes/navbar/Navbar";
import { addToast } from "../../redux/actions/toastActions";
import {
  checkoutAddUserInfo,
  checkoutAddDeliveryOption,
  checkoutAddDeliveryInfo,
} from "../../redux/actions/deliveryInfoActions";
import { validateCheckOutInfo } from "./validators";

class ShowPage extends React.Component {
  render() {
    let RenderComponent = checkOutPages[this.props.pageIndex].component;
    return <RenderComponent {...this.props} />;
  }
}

class Checkout extends React.Component {
  componentDidMount() {
    validateCheckOutInfo(this.props.deliveryInfo);
    checkoutBtnRef.current.classList.add("collapse");

    navbarRef.current.classList.add("collapse");
    document.title = `${process.env.REACT_APP_TITLE} | Checkout`;
    this.props.addToast("Hello");
  }
  componentWillUnmount() {
    checkoutBtnRef.current.classList.remove("hidden");
    navbarRef.current.classList.remove("collapse");
  }

  handleSetIndex(index) {
    this.props.setIndex(index);
  }

  render() {
    return (
      <>
        <div className="position-fixed bg-white right-0 cartTop mt-1 mr-1 rounded shadow">
          <CartIcon classes="border py-1" />
        </div>
        <div className="container-fluid sticky-top bg-light indexCont shadow-sm mb-1">
          <IndexIndicator
            setIndex={this.props.setIndex}
            pageIndex={this.props.pageIndex}
          />
        </div>
        <div className="container">
          <div className="w-100"></div>
          <div className="row">
            <div className="col-sm-12 col-md-8 col-lg-7">
              <ShowPage {...this.props} />
            </div>
            <div className="col col-sm-12 col-md-4  col-lg-5"></div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    validate: validateCheckOutInfo(state.deliveryInfo),
    cart: state.cart,
    deliveryInfo: state.deliveryInfo,
    pageIndex: state.checkoutPageIndex.index,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDeliveryOption: (id) => dispatch(checkoutAddDeliveryOption(id)),
    addDeliveryInfo: (address, address2, city, state, postalCode, country) =>
      dispatch(
        checkoutAddDeliveryInfo(
          address,
          address2,
          city,
          state,
          postalCode,
          country
        )
      ),
    nextIndex: () => dispatch(checkoutNextIndex(3)),
    prevIdex: () => dispatch(checkoutPrevIndex()),
    setIndex: (index) => dispatch(checkoutSetIndex(index)),
    addToast: (message) => dispatch(addToast(message, null, true, true)),
    addUserInfo: (firstName, lastName, phone, phone2, email) =>
      dispatch(checkoutAddUserInfo(firstName, lastName, phone, phone2, email)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
