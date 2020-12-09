import React from "react";
import loaderSvg from "../../../assets/loader.svg";

class LoadingFull extends React.Component {
  render() {
    return (
      <div id="dataLoader" className="data-loader">
        <img src={loaderSvg} alt="" />
      </div>
    );
  }
}

export default LoadingFull;
