import React from "react";
import {
  deliveryOptions,
  FormError,
  NextAndPrev,
  PaymentOptions,
} from "./screenData";
import { ValidateUserInfo } from "./validators";

export class CheckoutUserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleNext = this.handleNext.bind(this);

    this.state = {
      first_name: this.props.deliveryInfo.first_name || "",
      last_name: this.props.deliveryInfo.last_name || "",
      phone: this.props.deliveryInfo.phone || "",
      phone2: this.props.deliveryInfo.phone2 || "",
      email: this.props.deliveryInfo.email || "",
      touched: [],
    };
  }

  handleChange(e) {
    const object = {};
    object[e.target.name] = e.target.value;

    this.setState({ ...object });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.handleNext();
  }
  handleNext() {
    this.setState({
      touched: ["first_name", "last_name", "phone", "phone2", "email"],
    });
    const errors = this.validate().errors;
    for (var error in errors) {
      if (!errors[error].length ? false : true) {
        return;
      }
    }

    this.props.addUserInfo(
      this.state.first_name,
      this.state.last_name,
      this.state.phone,
      this.state.phone2,
      this.state.email
    );

    this.props.nextIndex();
  }
  handleBlur(e) {
    const name = e.target.name;
    if (!this.state.touched.includes(name)) {
      this.setState({ touched: [...this.state.touched, name] });
    }
  }

  validate() {
    const errors = ValidateUserInfo(this.state);
    errors["touched"] = this.state.touched;
    return errors;
  }

  render() {
    const validate = this.validate();
    return (
      <>
        <div className="bg-white rounded p-2 mt-2">
          <h4 className="m-0">Your Info</h4>
          <small className="ml-3 text-dark">
            We only need this info to keep you updated on your order
          </small>
        </div>
        <div className="bg-white rounded p-2 mt-2">
          <form className="px-3" onSubmit={this.handleSubmit}>
            <h5>Delivery Contact</h5>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="first_name">First Name</label>
                <span className="star">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  id="first_name"
                  placeholder="First Name"
                  required
                  autoCapitalize="true"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <FormError validate={validate} name="first_name" />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="last_name">Last Name</label>
                <span className="star">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  required
                  autoCapitalize="true"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <FormError validate={validate} name="last_name" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="phone">Phone</label>
                <span className="star">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  id="phone"
                  minLength={8}
                  required
                  placeholder="Phone Number"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <FormError validate={validate} name="phone" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="phone2">Phone 2</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone2"
                  id="phone2"
                  placeholder="Alternative phone (optional)"
                  value={this.state.phone2}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <FormError validate={validate} name="phone2" />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="email">Email</label>
                <span className="star">*</span>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  required
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <FormError validate={validate} name="email" />
                <small className="pl-3 text-muted">
                  We'll confirm your order to this email.
                </small>
              </div>
            </div>
            <NextAndPrev {...this.props} handleNext={this.handleNext} />
          </form>
        </div>
      </>
    );
  }
}

export class CheckoutDeliveryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.validate = this.validate.bind(this);
  }
  get renderSubComponent() {
    const sub = deliveryOptions.find(
      (item) => item.id === this.props.deliveryInfo.delivery_option
    );
    if (sub) {
      return sub;
    }
    return deliveryOptions[0];
  }
  handleNext(e) {
    this.props.nextIndex();
  }
  validate(state = this.props.deliveryInfo) {
    let errors = { errors: {} };
    const validator = deliveryOptions.find(
      (item) => item.id === this.props.deliveryInfo.delivery_option
    );
    if (validator) {
      errors = validator.validator(state);
    }

    for (let error in errors.errors) {
      if (errors.errors[error].length) {
        errors["valid"] = false;
        break;
      }
      errors["valid"] = true;
    }
    return errors;
  }
  render() {
    return (
      <>
        <div className="bg-white rounded p-2 mt-2">
          <h4 className="m-0">Delivery Info</h4>
          <form className="form-horizontal pl-2">
            {/* <p className="m-0 h6">Delivery or Pickup</p> */}
            <div className="px-2">
              {deliveryOptions.map((item, index) => {
                return (
                  <DeliveryRadioOption
                    key={item.id}
                    item={item}
                    index={index}
                    {...this.props}
                  />
                );
              })}
            </div>
          </form>
        </div>
        <div className="bg-white rounded p-2 mt-2">
          <this.renderSubComponent.sub
            {...this.props}
            validate={this.validate}
          />
        </div>
      </>
    );
  }
}
const DeliveryRadioOption = (props) => {
  const delivery_option = props.deliveryInfo.delivery_option;
  const checked = delivery_option
    ? props.item.id === delivery_option
    : props.index === 0;

  function changeDeliveryOption(e) {
    props.addDeliveryOption(e.target.value);
  }

  return (
    <div className="form-check">
      <label htmlFor={"delivery-" + props.index} className="form-check-label">
        <input
          checked={checked}
          onChange={changeDeliveryOption}
          type="radio"
          name="dOption"
          value={props.item.id}
          id={"delivery-" + props.index}
          className="form-check-input"
        />
        {props.item.name}
      </label>
    </div>
  );
};

export class CheckoutPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod:
        this.props.deliveryInfo.paymentMethod || PaymentOptions[0].name,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillUnmount() {
    // window.addEventListener("beforeunload", (event) => {
    //   event.returnValue = `Are you sure you want to leave?`;
    // });
  }
  get renderSubComponent() {
    const component = PaymentOptions.find(
      (item) => item.name === this.props.deliveryInfo.paymentMethod
    );
    if (!component) return PaymentOptions[0].component;
    return component.component;
  }
  handleChange(e) {
    this.props.addPaymentMethod(e.target.value);
  }
  render() {
    return (
      <>
        <div className="bg-white rounded p-2 mt-2">
          <h4 className="m-0">Payment</h4>
          <form onSubmit={this.handleSubmit}>
            {PaymentOptions.map((option, index) => {
              return (
                <div key={"payment-" + index} className="form-check">
                  <label
                    htmlFor={"payment-" + index}
                    className="form-check-label"
                  >
                    <input
                      checked={
                        this.props.deliveryInfo.paymentMethod === option.name
                      }
                      onChange={this.handleChange}
                      type="radio"
                      name="paymentOption"
                      value={option.name}
                      id={"payment-" + index}
                      className="form-check-input"
                    />
                    {option.name}
                  </label>
                </div>
              );
            })}
          </form>
        </div>

        <div className="py-2 mt-3 bg-white rounded">
          <this.renderSubComponent {...this.props} />
        </div>
        <NextAndPrev {...this.props} />
      </>
    );
  }
}
