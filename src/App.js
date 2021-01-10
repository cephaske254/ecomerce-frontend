import "./App.css";
import React from "react";
import Navbar from "./components/includes/navbar/Navbar";
import "./custom.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import * as $ from "jquery";
import "bootstrap";
import Toast from "./components/includes/toast";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  render() {
    return (
      <>
        <PayPalScriptProvider
          options={{
            "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
            currency: "USD",
            components: "hosted-fields,buttons",
          }}
        >
          <Toast />
          <Navbar />
        </PayPalScriptProvider>
      </>
    );
  }

  componentDidMount() {
    setTimeout(function () {
      $("#dataLoader").fadeOut();
    }, 500);
  }

  componentWillUnmount() {
    $("#dataLoader").fadeIn();
  }
}

export default App;
