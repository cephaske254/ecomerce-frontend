import React from "react";
import {
  CheckoutDeliveryInfo,
  CheckoutPayment,
  CheckoutUserInfo,
} from "./screens";
import {
  AddressForm,
  CallMe,
  CreditDebit,
  MpesaExpress,
  Paypal,
  Pickup,
} from "./subScreens";
import { ValidateDeliveryInfo, ValidateUserInfo } from "./validators";
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";

export const mpesaPaybillNo = process.env.REACT_APP_MPESA_PAYBILL;

export const checkOutPages = [
  {
    name: "Address",
    component: CheckoutUserInfo,
    fields: `
    first,last,email,phone
    `,
  },
  {
    name: "Delivery",
    component: CheckoutDeliveryInfo,
    fields: `
    address, city,postalcode,country
    `,
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
    validator: ValidateDeliveryInfo,
  },
  {
    id: "pick-up-at-store-for-free",
    name: "Pick up at store for free",
    description: "Pickup Your items at our store, Monday-Friday 9am-4pm",
    sub: Pickup,
    validator: ValidateUserInfo,
  },
  {
    id: "call-me",
    name: "Call Me For Delivery (Kenya)",
    description:
      "You will be contacted for delivery information. Delivery charges might be charged later.",
    sub: CallMe,
    validator: ValidateUserInfo,
  },
];
export const PaymentOptions = [
  {
    name: "Mpesa Express",
    component: MpesaExpress,
    funding: null,
  },
  {
    name: "PayPal",
    component: Paypal,
    funding: "PAYPAL",
  },
  {
    name: "Credit/Debit Card",
    component: CreditDebit,
    funding: "CARD",
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
              return (
                <p key={error} className="m-0 ml-1 text-danger small">
                  {error}
                </p>
              );
            })
          : ""}
      </>
    );
  }
}

export const NextAndPrev = (props) => {
  return (
    <div className="btn-group mt-2">
      {(props.pageIndex && !props.hideBack && !props.hide) > 0 && (
        <button
          onClick={props.prevIndex}
          type="button"
          className="btn btn-sm border-primary text-primary"
        >
          <i className="fas fa-chevron-left"></i> Back
        </button>
      )}
      {props.handleNext &&
        props.pageIndex < checkOutPages.length - 1 &&
        (!props.hideNext || !props.hide) && (
          <button
            {...props.nextAttributes}
            onClick={props.handleNext}
            type="button"
            className="btn btn-sm btn-primary"
          >
            Next <i className="fas fa-chevron-circle-right"></i>
          </button>
        )}
    </div>
  );
};

export const PayPalButtonSwitch = (props) => {
  function createOrder(data, actions) {
    const items = actions.order.create({
      intent: "CAPTURE",
      application_context: {
        return_url: "https://example.com",
        cancel_url: "https://example.com",
        brand_name: "EXAMPLE INC",
        locale: "en-US",
        landing_page: "BILLING",
        shipping_preference: "SET_PROVIDED_ADDRESS",
        user_action: "CONTINUE",
      },
      purchase_units: [
        {
          reference_id: "PUHF",
          description: "Sporting Goods",

          custom_id: "CUST-HighFashions",
          soft_descriptor: "HighFashions",
          amount: {
            currency_code: "USD",
            breakdown: {},
          },
          items: [],
          shipping: {
            method: "United States Postal Service",
            address: {
              name: {
                full_name: props.deliveryInfo.first_name,
                surname: props.deliveryInfo.last_name,
              },
              address_line_1: props.deliveryInfo.address,
              address_line_2: props.deliveryInfo.address2,
              // admin_area_2: "San Francisco",
              // admin_area_1: "CA",
              postal_code: null,
              country_code: "KENYA",
            },
          },
        },
      ],
    });
    return items;
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(function (details) {
      console.log("Transaction completed by " + details.payer.name.given_name);
    });
  }
  function onCancel(data, actions) {
    console.log(data);
  }
  function onShippingChange(data, actions) {
    console.log(data);
  }

  return (
    <>
      {props.type === "card" && (
        <PayPalButtons
          onCancel={onCancel}
          onApprove={onApprove}
          onShippingChange={onShippingChange}
          fundingSource={FUNDING.CARD}
          createOrder={createOrder}
          style={{ color: "black", shape: "rect", label: "pay" }}
        />
      )}
      {props.type === "paypal" && (
        <PayPalButtons
          onCancel={onCancel}
          onApprove={onApprove}
          onShippingChange={onShippingChange}
          fundingSource={FUNDING.PAYPAL}
          createOrder={createOrder}
          style={{ color: "blue", shape: "rect", label: "pay" }}
        />
      )}
    </>
  );
};
