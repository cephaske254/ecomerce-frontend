import React from "react";

class LoadingFull extends React.Component {
  render() {
    return (
      <div id="dataLoader" class="data-loader">
        <img src="%PUBLIC_URL%/loader.svg" alt="" />
      </div>
    );
  }
}

export default LoadingFull;
