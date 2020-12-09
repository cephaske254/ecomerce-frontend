import React from "react";
import { Hexagonsvg } from "../globalAssets";
import { navbarRef } from "../includes/navbar/Navbar";
import "./handlers.css";

class FourOFour extends React.Component {
  componentDidMount() {
    document.title = `${process.env.REACT_APP_TITLE} | Not Found`;
    navbarRef.current.classList.add("collapse");
  }
  componentWillUnmount() {
    navbarRef.current.classList.remove("collapse");
  }
  render() {
    return (
      <>
        <div className="container-fluid vh-100 bg-dark cont">
          <Hexagonsvg />
          <div className="message-box">
            <h1>404</h1>
            <p>The page you're looking for doesnt exist!</p>
            <div className="buttons-con">
              <div className="action-link-wrap">
                <a href="/" className="btn btn-primary">
                  BACK HOME
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FourOFour;
