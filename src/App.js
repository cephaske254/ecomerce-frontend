import "./App.css";
import React from "react";
import Navbar from "./components/includes/navbar/Navbar";
import "./custom.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import * as $ from "jquery";
// eslint-disable-next-line
import bootstrap from "bootstrap";
import Toast from "./components/includes/toast";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // productImageHeight: "150px",
    };
  }
  render() {
    return (
      <>
        <Toast/>
        <Navbar />
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
