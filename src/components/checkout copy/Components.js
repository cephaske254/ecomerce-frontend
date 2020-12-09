import React from "react";
import { CallMe, Pickup, AdressForm } from "./subComponents";

export const availableDeliveryOptions = [
  {
    id: "deliver-to-address",
    name: "Deliver to address",
    description: "",
    sub: AdressForm,
    required: [
      "address",
      "city",
      "state",
      "postalCode",
      "country",
    ],
  },
  {
    id: "pick-up-at-store-for-free",
    name: "Pick up at store for free",
    description: "Pickup Your items at our store, Monday-Friday 9am-4pm",
    sub: Pickup,
    required: [],
  },
  {
    id: "call-me",
    name: "Call Me For Delivery",
    description:
      "You will be contacted for delivery information. Delivery charges might be charged later.",
    sub: CallMe,
    required: ["firstName", "lastName", "email", "phone"],
  },
];

export class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryInfo: this.props.deliveryInfo,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cleanAndHandleChange = this.cleanAndHandleChange.bind(this);
  }
  handleChange(e) {
    const data = {};
    data[e.target.name] = e.target.value;
    this.setState({
      deliveryInfo: {
        ...this.state.deliveryInfo,
        ...data,
      },
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.addUserInfo(
      this.state.deliveryInfo.firstName,
      this.state.deliveryInfo.lastName,
      this.state.deliveryInfo.phone,
      this.state.deliveryInfo.phone2,
      this.state.deliveryInfo.email
    );
  }
  cleanAndHandleChange(e) {
    const data = {};
    data[e.target.name] = e.target.value.replace(/[^\d+]/g, "");
    this.setState({
      deliveryInfo: {
        ...this.state.deliveryInfo,
        ...data,
      },
    });
  }
  render() {
    return (
      <>
        <h4 className="m-0">Your Info</h4>
        <small className="ml-3 text-dark">
          We only need this info to keep you updated on your order
        </small>
        <hr />
        <form className="form-horizobtal px-3" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First Name</label>
              <span className="star">*</span>
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                required
                autocapitalize
                value={this.state.deliveryInfo.firstName}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="lastName">Last Name</label>
              <span className="star">*</span>
              <input
                type="text"
                className="form-control"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                required
                autocapitalize
                value={this.state.deliveryInfo.lastName}
                onChange={this.handleChange}
              />
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
                value={this.state.deliveryInfo.phone}
                onChange={this.cleanAndHandleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phone2">Phone 2</label>
              <input
                type="text"
                className="form-control"
                name="phone2"
                id="phone2"
                placeholder="Alternative phone (optional)"
                value={this.state.deliveryInfo.phone2}
                onChange={this.cleanAndHandleChange}
              />
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
                value={this.state.deliveryInfo.email}
                onChange={this.handleChange}
              />
              <small className="pl-3 text-muted">
                We'll confirm your order to this email.
              </small>
            </div>
          </div>
          <button type="submit" className="btn btn-sm btn-primary">
            Next <i className="fas fa-chevron-circle-right"></i>
          </button>
        </form>
      </>
    );
  }
}

export class DeliveryInfo extends React.Component {
  get RenderSubComponent() {
    const object = availableDeliveryOptions.find(
      (item) => item.id === this.props.deliveryInfo.deliveryOption
    );
    if (object) {
      return object;
    }
    return availableDeliveryOptions[0];
  }
  render() {
    return (
      <>
        <h4>Delivery Info</h4> <hr />
        {JSON.stringify(this.props.validate)}
        <form className="form-horizontal pl-2">
          <p className="m-0 font-weight-bold">Delivery or Pickup</p>
          <div className="px-2">
            {availableDeliveryOptions.map((item, index) => {
              return (
                <DeliveryRadioOption
                  item={item}
                  index={index}
                  {...this.props}
                />
              );
            })}
          </div>
        </form>
        <hr />
        <this.RenderSubComponent.sub
          {...this.props}
          required={this.RenderSubComponent.required}
        />
      </>
    );
  }
}

const DeliveryRadioOption = (props) => {
  let checked =
    (props.deliveryInfo.deliveryOption &&
      props.item.id === props.deliveryInfo.deliveryOption) ||
    props.index === 0;

  function changeDeliveryOption(e) {
    if (!e.target.value) {
      return;
    }
    props.addDeliveryOption(e.target.value);
  }

  return (
    <div className="form-check">
      <input
        defaultChecked={checked}
        onChange={changeDeliveryOption}
        type="radio"
        name="deliveryOption"
        value={props.item.id}
        id={"delivery-" + props.index}
        className="form-check-input"
      />
      <label htmlFor={"delivery-" + props.index} className="form-check-label">
        {props.item.name}
      </label>
    </div>
  );
};
