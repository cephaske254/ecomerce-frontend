import React from "react";
class LoadingSm extends React.Component {
  render() {
    return (
      <>
        <div
          className={`d-flex justify-content-center py-4 align-items-center ${
            this.props.float ? " fixed-top " : ""
          } ${this.props.vh100 ? "vh-100" : ""} ${[...this.props.classes]}`}
        >
          <div className="spinner-grow" />
        </div>
      </>
    );
  }
}

LoadingSm.defaultProps = {
  vh100: true,
  float: true,
  classes: [],
};

export default LoadingSm;
