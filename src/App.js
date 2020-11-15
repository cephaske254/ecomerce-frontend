import "./App.css";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import "./custom.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import * as $ from "jquery";
// eslint-disable-next-line
import bootstrap from "bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import routes from "./routes/index";
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
