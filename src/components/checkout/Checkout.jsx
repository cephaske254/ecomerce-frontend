import React from "react";
import { connect } from "react-redux";
import { checkOutPages } from "./screenData";
import "./Checkout.css";
import { navbarRef } from "../includes/navbar/Navbar";
import {
  checkoutNextIndex,
  checkoutPrevIndex,
  checkoutSetIndex,
} from "../../redux/actions/checkoutActions";

import {
  addPaymentMethod,
  checkoutAddDeliveryInfo,
  checkoutAddDeliveryOption,
  checkoutAddUserInfo,
} from "../../redux/actions/deliveryInfoActions";
import { placeOrder } from "../../api/checkout";

class IndexIndicator extends React.Component {
  render() {
    return (
      <div className="d-flex py-2">
        <ul className="list-style-none indicators p-0 d-flex w-100">
          {checkOutPages.map((item, index) => {
            return (
              <li
                key={item.name}
                className={
                  "col " +
                  (this.props.pageIndex === index && "current ") +
                  (this.props.pageIndex > index && " done")
                }
              >
                {this.props.pageIndex > index ? (
                  <div className="circle">
                    <i className="fas fa-check fa-sm"></i>
                  </div>
                ) : (
                  <div className="circle">
                    <p className="m-0">{index + 1}</p>
                  </div>
                )}
                <span className="label">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Checkout extends React.Component {
  placeOr() {
    const data = placeOrder({
      shipping: {
        ...this.props.deliveryInfo,
      },
      billing: {
        ...this.props.deliveryInfo
      },
      total_amount: 200,
      currency: "KES",
    });
  }
  componentDidMount() {
    this.placeOr();
    navbarRef.current.classList.add("collapse");
  }
  componentWillUnmount() {
    navbarRef.current.classList.remove("collapse");
  }
  get renderScreen() {
    return checkOutPages[this.props.pageIndex].component;
  }
  render() {
    return (
      <>
        <div className="container-fluid shadow-sm sticky-top bg-white mb-2">
          <IndexIndicator {...this.props} />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-md-8 col-lg-7">
              <this.renderScreen {...this.props} />
            </div>
            <div className="col-sm-12 col-md-4 col-lg-5"></div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    deliveryInfo: state.deliveryInfo,
    pageIndex: state.checkoutPageIndex.index,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIndex: (index) => dispatch(checkoutSetIndex(index)),
    prevIndex: () => dispatch(checkoutPrevIndex()),
    addUserInfo: (first_name, last_name, phone, phone2, email) =>
      dispatch(
        checkoutAddUserInfo(first_name, last_name, phone, phone2, email)
      ),
    nextIndex: () => dispatch(checkoutNextIndex(checkOutPages.length - 1)),
    addDeliveryOption: (option) => dispatch(checkoutAddDeliveryOption(option)),
    addDeliveryInfo: (address, address2, city, state, postal_code, country) =>
      dispatch(
        checkoutAddDeliveryInfo(
          address,
          address2,
          city,
          state,
          postal_code,
          country
        )
      ),
    addPaymentMethod: (method) => dispatch(addPaymentMethod(method)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
