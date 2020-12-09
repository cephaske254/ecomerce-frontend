import React from "react";
import { connect } from "react-redux";
import { checkOutPages } from "./screenData";
import "./Checkout.css";
import { navbarRef } from "../includes/navbar/Navbar";
import {
  checkoutNextIndex,
  checkoutSetIndex,
} from "../../redux/actions/checkoutActions";

import {
  checkoutAddDeliveryOption,
  checkoutAddUserInfo,
} from "../../redux/actions/deliveryInfoActions";

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
                  (this.props.pageIndex === index && "active ") +
                  (this.props.pageIndex > index && " done")
                }
              >
                <span className="circle">{index + 1}</span>
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
  componentDidMount() {
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
        <div className="container-fluid shadow-sm sticky-top bg-light">
          <IndexIndicator {...this.props} />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-md-8 col-lg-7">
              <this.renderScreen {...this.props} />
            </div>
            <div className="col-sm-12 col-md-4 col-lg-5">1</div>
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
    addUserInfo: (firstName, lastName, phone, phone2, email) =>
      dispatch(checkoutAddUserInfo(firstName, lastName, phone, phone2, email)),
    nextIndex: () => dispatch(checkoutNextIndex(checkOutPages.length - 1)),
    addDeliveryOption: (option) => dispatch(checkoutAddDeliveryOption(option)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
