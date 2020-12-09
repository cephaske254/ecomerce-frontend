import React from "react";
import countries from "./countries.json";
import { FormError } from "./screenData";
import { ValidateDeliveryInfo } from "./validators";

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
    postalCode: this.props.deliveryInfo.postalCode,
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
    const errors = ValidateDeliveryInfo(this.state);
    errors["touched"] = this.state.touched;
    return errors;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleNext(e);
  }
  handleNext(e) {
    this.setState({
      touched: ["address", "city", "state", "postalCode", "country"],
    });
  }
  handleBlur(e) {
    const name = e.target.name;
    if (!this.state.touched.includes(name)) {
      this.setState({ touched: [...this.state.touched, name] });
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
            <label htmlFor="postalCode">Postal Code</label>
            <span className="star">*</span>
            <input
              type="text"
              className="form-control"
              id="postalCode"
              name="postalCode"
              onChange={this.handleChange}
              defaultValue={this.props.deliveryInfo.postalCode}
              onBlur={this.handleBlur}
              required
            />
            <FormError validate={validate} name="postalCode" />
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

        <button
          onClick={this.handleNext}
          type="button"
          className="btn btn-sm btn-primary"
        >
          Next <i className="fas fa-chevron-circle-right"></i>
        </button>
      </form>
    );
  }
}
export class Pickup extends React.Component {
  render() {
    return (
      <>
        <h3>Hey</h3>
      </>
    );
  }
}
export class CallMe extends React.Component {
  render() {
    return (
      <>
        <h3>Hey</h3>
      </>
    );
  }
}
