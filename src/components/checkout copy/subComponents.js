import React from "react";
import countries from "./countries.json";

export class Pickup extends React.Component {
  invalid() {
    const data = [];
    this.props.required &&
      this.props.required.forEach((item) => {
        data.push(this.state[item] ? true : false);
      });
    return data.includes(false) ? true : false;
  }
  render() {
    return (
      <>
        <p className="text-center text-muted">Pickup from store</p>

        <div className="py-2">
          <button className="btn btn-sm btn-primary">
            Next <i className="fas fa-chevron-circle-right"></i>
          </button>
        </div>
      </>
    );
  }
}
export class AdressForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    address: this.props.deliveryInfo.address,
    address2: this.props.deliveryInfo.address2,
    city: this.props.deliveryInfo.city,
    state: this.props.deliveryInfo.state,
    postalCode: this.props.deliveryInfo.postalCode,
    country: this.props.deliveryInfo.country || "Kenya",
  };
  handleChange(e) {
    const data = {};
    data[e.target.name] = e.target.value;
    this.setState({
      ...this.state,
      ...data,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.addDeliveryInfo(
      this.state.address,
      this.state.address2 || null,
      this.state.city,
      this.state.state,
      this.state.postalCode,
      this.state.country
    );
  }
  invalid() {
    const data = [];
    this.props.required &&
      this.props.required.forEach((item) => {
        data.push(this.state[item] ? true : false);
      });
    return data.includes(false) ? true : false;
  }
  render() {
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
            required
          />
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
              required
            />
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
              required
            />
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
              required
            />
          </div>
          <div className="form-group col-md-7">
            <label htmlFor="country">Country</label>
            <select
              className="form-control"
              id="country"
              onChange={this.handleChange}
              name="country"
              defaultValue={this.props.deliveryInfo.country || "Kenya"}
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
          </div>
        </div>

        <button
          disabled={this.invalid()}
          type="submit"
          className="btn btn-sm btn-primary"
        >
          Next <i className="fas fa-chevron-circle-right"></i>
        </button>
      </form>
    );
  }
}
export class CallMe extends React.Component {
  render() {
    return (
      <>
        <div className="text-center px-2 pb-4">
          <h2>Call Me</h2>
        </div>
      </>
    );
  }
}
