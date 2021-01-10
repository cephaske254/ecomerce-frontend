import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React from "react";
import countries from "./countries.json";
import { FormError, NextAndPrev, PayPalButtonSwitch } from "./screenData";
import mpesaLogo from "../../mpesa.jpg";
import { validatePhone, validateLength } from "./validators";

export class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.validate = this.validate.bind(this);
  }
  state = {
    address: this.props.deliveryInfo.address,
    address2: this.props.deliveryInfo.address2,
    city: this.props.deliveryInfo.city,
    state: this.props.deliveryInfo.state,
    postal_code: this.props.deliveryInfo.postal_code,
    country: this.props.deliveryInfo.country || "Kenya",
    touched: [],
  };
  handleChange(e) {
    const data = {};
    data[e.target.name] = e.target.value;
    this.setState({
      ...this.state,
      ...data,
    });
  }
  validate() {
    const errors = this.props.validate(this.state);
    errors["touched"] = this.state.touched;
    return errors;
  }

  handleSubmit(e) {
    this.handleNext(e);
  }
  handleNext(e) {
    e.preventDefault();
    this.setState({
      touched: ["address", "city", "state", "postal_code", "country"],
    });
    this.props.addDeliveryInfo(
      this.state.address,
      this.state.address2,
      this.state.city,
      this.state.state,
      this.state.postal_code,
      this.state.country
    );
  }
  handleBlur(e) {
    const name = e.target.name;
    if (!this.state.touched.includes(name)) {
      this.setState({ touched: [...this.state.touched, name] });
    }
    if (this.validate().valid) {
      this.props.nextIndex();
    }
  }

  render() {
    const validate = this.validate();
    return (
      <form className="px-3" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <span className="star">*</span>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="1234 Main St"
            name="address"
            onChange={this.handleChange}
            defaultValue={this.props.deliveryInfo.address}
            onBlur={this.handleBlur}
            required
          />
          <FormError validate={validate} name="address" />
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="city">City / Town / Village</label>
            <span className="star">*</span>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              onChange={this.handleChange}
              defaultValue={this.props.deliveryInfo.city}
              onBlur={this.handleBlur}
              required
            />
            <FormError validate={validate} name="city" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputState">State / Province / Region</label>
            <span className="star">*</span>
            <input
              type="text"
              id="inputState"
              className="form-control"
              name="state"
              onChange={this.handleChange}
              defaultValue={this.props.deliveryInfo.state}
              onBlur={this.handleBlur}
              required
            />
            <FormError validate={validate} name="state" />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="postal_code">Postal Code</label>
            <span className="star">*</span>
            <input
              type="text"
              className="form-control"
              id="postal_code"
              name="postal_code"
              onChange={this.handleChange}
              defaultValue={this.props.deliveryInfo.postal_code}
              onBlur={this.handleBlur}
              required
            />
            <FormError validate={validate} name="postal_code" />
          </div>
          <div className="form-group col-md-7">
            <label htmlFor="country">Country</label>
            <select
              className="form-control"
              id="country"
              onChange={this.handleChange}
              name="country"
              defaultValue={this.props.deliveryInfo.country || "Kenya"}
              onBlur={this.handleBlur}
              required
            >
              {countries.map((item) => {
                return (
                  <option key={item.name} value={item.name}>
                    {item.name} ({item.dial_code})
                  </option>
                );
              })}
            </select>
            <FormError validate={validate} name="country" />
          </div>
        </div>
        <NextAndPrev {...this.props} handleNext={this.handleNext} />
      </form>
    );
  }
}
export class Pickup extends React.Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.state = {
      show: false,
    };
  }
  handleNext() {
    const valid = this.props.validate().valid || false;
    if (valid) {
      this.props.nextIndex();
      return;
    }
    this.setState({ show: true });
  }
  render() {
    return (
      <>
        <div className="pl-3">
          <p className="h5">
            Buy online, pickup your items in our store for FREE. <br />
          </p>

          <div className="px-2">
            <p className="font-weight-bold m-0">Why?</p>
            <ul className="list-style-none pl-3">
              <li>
                <i className="fas fa-check-circle fa-sm mr-1"></i>
                No shipping fees.
              </li>
              <li>
                <i className="fas fa-check-circle fa-sm mr-1"></i>
                Quicker service.
              </li>
              <li>
                <i className="fas fa-check-circle fa-sm mr-1"></i>
                In-stock Insurance.
              </li>
            </ul>
            <div className="font-italic">
              In-store pickup combines the ease of shopping online with the
              promptness of purchasing from a local retailer / in the store.
            </div>
          </div>

          <NextAndPrev {...this.props} handleNext={this.handleNext} />
        </div>
      </>
    );
  }
}
export class CallMe extends React.Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
  }
  handleNext() {
    if (this.props.validate().valid || false) {
      this.props.nextIndex();
      return;
    }
  }
  render() {
    const deliveryInfo = this.props.deliveryInfo;
    return (
      <>
        <div className="pl-3">
          <p className="text-left h5">Custom Delivery? We got you!</p>
          <div className="pl-2">
            <p className="">
              We will contact you using the phone number you provided as soon as
              you confirm your order.
            </p>
            <p className="font-weight-bold m-0">Your Contact Info</p>
            <div className="form-row ml-1">
              {deliveryInfo.first_name && (
                <div className="col-md-6 px-2 d-flex align-items-center">
                  <i className="fas fa-lg fa-address-book"></i>{" "}
                  <span className="mx-2 text-capitalize">
                    {deliveryInfo.first_name + " " + deliveryInfo.last_name}
                  </span>
                </div>
              )}
              <div className="col-md-6 px-2 d-flex align-items-center">
                <i className="fas fa-lg fa-phone-square-alt"></i>{" "}
                <span className="mx-2">
                  {deliveryInfo.phone ? (
                    deliveryInfo.phone
                  ) : (
                    <p>Please Provide a phone number</p>
                  )}
                </span>
              </div>
              {deliveryInfo.phone2 && (
                <div className="col-md-6 px-2 d-flex align-items-center">
                  <i className="fas fa-lg fa-phone-square-alt"></i>{" "}
                  <span className="mx-2">{deliveryInfo.phone2}</span>
                </div>
              )}
              {deliveryInfo.email && (
                <div className="col-md-6 px-2 d-flex align-items-center">
                  <i className="fas fa-lg fa-envelope-square"></i>{" "}
                  <span className="mx-2">{deliveryInfo.email}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-center mt-2">
            <button
              className="btn text-danger"
              onClick={() => this.props.setIndex(0)}
            >
              <i className="fas fa-edit"></i> EDIT INFO
            </button>
          </div>
        </div>
        <NextAndPrev {...this.props} handleNext={this.handleNext} />
      </>
    );
  }
}

export class MpesaExpress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mpesaExpressNo: this.props.deliveryInfo.mpesaExpressNo || "",
      touched: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const object = {};
    object[e.target.name] = e.target.value;
    this.setState({ ...object });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.handleBlur(e);
  }
  handleBlur(e) {
    this.setState({ touched: true });
  }
  validate() {
    const errors = validatePhone(this.state.mpesaExpressNo);
    const lengthErr = validateLength(
      this.state.mpesaExpressNo,
      "phone",
      10,
      0,
      false
    );
    if (errors.phone && errors.phone.length) {
      errors["valid"] = false;
    } else {
      errors["valid"] = true;
    }

    return { ...errors, phone: [...errors.phone, lengthErr] };
  }
  render() {
    const validate = this.validate();
    return (
      <>
        <div className="text p-4">
          <div className="d-flex align-items-center">
            <img alt="mpesa logo" src={mpesaLogo} width="80" className="" />
            <h5 className="pl-3">Mpesa Express</h5>
          </div>
          <p className="p-0">
            We will initiate the payment on your behalf. You will receive a
            pop-up notification to confirm the tansaction by entering your PIN
            on your mobile phone.
          </p>
          <p className="font-weight-bold text-muted">
            Before you proceed, please confirm you have enough money in your
            account.
          </p>
          <div className="pl-2">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="mpesaNumber">
                Enter a phone number you'd like to make payment with to proceed
              </label>
              <div className="btn-group w-100 p-0">
                <input
                  onChange={this.handleChange}
                  maxLength="10"
                  minLength="10"
                  id="mpesaNumber"
                  onBlur={this.handleBlur}
                  type="text"
                  name="mpesaExpressNo"
                  className="btn border text-left"
                  value={this.state.phone}
                  autoFocus
                  required
                />
                <button className="btn btn-sm btn-dark border-dark">
                  SEND REQUEST
                </button>
              </div>
              <small>use the format 07XXXXXXXX or 01XXXXXXXX</small>
              {this.state.touched &&
                validate["phone"].map((error, index) => {
                  return (
                    <p
                      key={"data" + index}
                      className="m-0 ml-1 text-danger small"
                    >
                      {error}
                    </p>
                  );
                })}
            </form>
          </div>
        </div>
      </>
    );
  }
}

const RenderPayPalButtons = (props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  return (
    <>
      {isPending ? (
        <div className="d-flex justify-content-center">
          <span className="sr-only">Loading...</span>
          <div className="spinner-grow text-info" />
        </div>
      ) : (
        <PayPalButtonSwitch {...props} />
      )}
    </>
  );
};
export class Paypal extends React.Component {
  render() {
    return (
      <>
        <RenderPayPalButtons {...this.props} type="paypal" />
      </>
    );
  }
}

export class CreditDebit extends React.Component {
  render() {
    return (
      <>
        <RenderPayPalButtons {...this.props} type="card" />
      </>
    );
  }
}
