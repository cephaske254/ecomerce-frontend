import React from "react";
import { connect } from "react-redux";
import { removeToast } from "../../../redux/actions/toastActions";
import "./toast.css";
import * as $ from "jquery";

class Toast extends React.Component {
  render() {
    return (
      <>
        <div aria-live="polite" aria-atomic="true" className="toastCont">
          {this.props.toasts &&
            this.props.toasts.map((toast) => {
              return (
                <ToastItem
                  remove={this.props.remove}
                  key={toast.id}
                  toast={toast}
                />
              );
            })}
        </div>
      </>
    );
  }
}

class ToastItem extends React.Component {
  componentDidMount() {
    if (this.props.toast.autoHide) {
      setTimeout(() => this.handleRemove(), 2800);
    }
  }
  handleRemove() {
    let id = this.props.toast.id;
    let self = this;
    $(`#toast-${id}`).slideUp(200, function () {
      self.props.remove(id);
    });
  }
  render() {
    return (
      <div
        className="alert p-0 small bg-dark border-secondary rounded mt-2"
        id={"toast-" + this.props.toast.id}
      >
        {this.props.toast.cap && (
          <div className="px-2 toast-header bg-dark border-secondary py-0">
            <i className="fas fa-bell my-auto mr-2"></i>
            <strong className="mr-auto">Message</strong>
            <button
              type="button"
              className="ml-2 mb-1 btn btn-sm text-danger float-right"
              aria-label="Close"
              onClick={() => this.handleRemove()}
            >
              <i className="fas fa-times-circle fa-sm"></i>
            </button>
          </div>
        )}
        <div className="alert-body d-flex p-2">
          <p className="m-0 col">{this.props.toast.message}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toasts: state.toasts,
  };
};
const matchDispatchToProps = (dispatch) => {
  return {
    remove: (id) => dispatch(removeToast(id)),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(Toast);
