import React from "react";
import {
  CheckoutDeliveryInfo,
  CheckoutPayment,
  CheckoutUserInfo,
} from "./screens";
import { AddressForm, CallMe, Pickup } from "./subScreens";

export const checkOutPages = [
  {
    name: "Your Info",
    component: CheckoutUserInfo,
  },
  {
    name: "Delivery Info",
    component: CheckoutDeliveryInfo,
  },
  {
    name: "Payment",
    component: CheckoutPayment,
  },
];

export const deliveryOptions = [
  {
    id: "deliver-to-address",
    name: "Deliver to address",
    description: "",
    sub: AddressForm,
  },
  {
    id: "pick-up-at-store-for-free",
    name: "Pick up at store for free",
    description: "Pickup Your items at our store, Monday-Friday 9am-4pm",
    sub: Pickup,
  },
  {
    id: "call-me",
    name: "Call Me For Delivery",
    description:
      "You will be contacted for delivery information. Delivery charges might be charged later.",
    sub: CallMe,
  },
];

export class FormError extends React.Component {
  render() {
    const touched = this.props.validate.touched.includes(this.props.name);
    const errors = this.props.validate.errors[this.props.name];
    return (
      <>
        {touched && errors
          ? errors.map((error) => {
              return <p className="m-0 ml-1 text-danger small">{error}</p>;
            })
          : ""}
      </>
    );
  }
}
