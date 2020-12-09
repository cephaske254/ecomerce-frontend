import React from "react";
import { deliveryOptions, FormError } from "./screenData";
import { ValidateUserInfo } from "./validators";

export class CheckoutUserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleNext = this.handleNext.bind(this);

    this.state = {
      firstName: this.props.deliveryInfo.firstName,
      lastName: this.props.deliveryInfo.lastName,
      phone: this.props.deliveryInfo.phone,
      phone2: this.props.deliveryInfo.phone2,
      email: this.props.deliveryInfo.email,
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
      touched: ["firstName", "lastName", "phone", "phone2", "email"],
    });
    const errors = this.validate().errors;
    console.log(errors);
    for (var error in errors) {
      if (!errors[error].length ? false : true) {
        return;
      }
    }

    this.props.addUserInfo(
      this.state.firstName,
      this.state.lastName,
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
        <h4 className="m-0">Your Info</h4>
        <small className="ml-3 text-dark">
          We only need this info to keep you updated on your order
        </small>
        <hr />
        <form className="px-3" onSubmit={this.handleSubmit}>
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
                value={this.state.firstName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <FormError validate={validate} name="firstName" />
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
                value={this.state.lastName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <FormError validate={validate} name="lastName" />
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
                defaultValue={this.props.deliveryInfo.email}
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
          <button
            onClick={this.handleNext}
            type="button"
            className="btn btn-sm btn-primary"
          >
            Next <i className="fas fa-chevron-circle-right"></i>
          </button>
        </form>
      </>
    );
  }
}

export class CheckoutDeliveryInfo extends React.Component {
  get renderSubComponent() {
    const sub = deliveryOptions.find(
      (item) => item.id === this.props.deliveryInfo.deliveryOption
    );
    if (sub) {
      return sub;
    }
    return deliveryOptions[0];
  }

  render() {
    return (
      <>
        <form className="form-horizontal pl-2">
          <p className="m-0 font-weight-bold">Delivery or Pickup</p>
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
        <hr />

        <this.renderSubComponent.sub {...this.props} />
      </>
    );
  }
}
const DeliveryRadioOption = (props) => {
  const deliveryOption = props.deliveryInfo.deliveryOption;
  const checked = deliveryOption
    ? props.item.id === deliveryOption
    : props.index === 0;
  console.log(checked);

  function changeDeliveryOption(e) {
    props.addDeliveryOption(e.target.value);
  }

  return (
    <div className="form-check">
      <label htmlFor={"delivery-" + props.index} className="form-check-label">
        <input
          checked={checked}
          // defaultChecked={props.index === 0}
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
  render() {
    return (
      <>
        <p>{JSON.stringify(this.props)}</p>
      </>
    );
  }
}
