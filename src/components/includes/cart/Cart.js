import React from "react";
import { connect } from "react-redux";
import "./Cart.css";
import * as $ from "jquery";
import {
  addToCart,
  reduceQuantity,
  removeFromCart,
} from "../../../redux/actions/cartActions";
import { formatPrice, toPrice } from "../../../utils/functions";
import { useHistory } from "react-router-dom";
import { addToast } from "../../../redux/actions/toastActions";

export const checkoutBtnRef = React.createRef();

function CheckoutButton(props) {
  const history = useHistory();

  function handleClick() {
    if (!props.cart.length) {
      props.notify();
      return;
    }
    props.hideCart();
    setTimeout(() => {
      history.push("/checkout");
    }, 320);
  }

  return (
    <>
      {props.cart.length == 0 && (
        <button
          ref={checkoutBtnRef}
          onClick={() => handleClick()}
          className="btn btn-sm mx-2 shadow-sm btn-dark py-0"
        >
          CHECKOUT <i className="fa fa-shopping-cart"></i>
        </button>
      )}
    </>
  );
}

export class Cart extends React.Component {
  hideCart() {
    let cart = $("#cartCont");
    document.body.style.overflowY = "scroll";
    cart.fadeOut();
  }

  render() {
    return (
      <>
        <div
          className="cartCont bg-white border-left rounded collapse"
          id="cartCont"
        >
          <div className="card border-0">
            <div className="p-2 sticky-top shadow bg-white -bottom">
              <div className="d-flex">
                <div className="col">
                  <p className="card-title h3 ml-1 m-0">Cart</p>
                </div>

                <button
                  className="btn btn-sm my-auto btn-danger"
                  onClick={() => this.hideCart()}
                >
                  <i className="fas fa-times-circle px-2"></i>
                </button>
              </div>
              <div className="d-flex">
                <div className="col">
                  <CheckoutButton
                    notify={this.props.notify}
                    cart={this.props.cart}
                    hideCart={this.hideCart}
                  />
                </div>
                <Total cart={this.props.cart} />
              </div>
            </div>
            <ul className="border-0 px-3 list-style-none h-100">
              {this.props.cart.length ? (
                this.props.cart.map((item) => {
                  return (
                    <CartItem
                      item={item}
                      key={item.id}
                      add={this.props.add}
                      reduce={this.props.reduce}
                      remove={this.props.remove}
                    />
                  );
                })
              ) : (
                <p className="text-muted text-center">No items in cart</p>
              )}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

class CartItem extends React.Component {
  handleRemoveFromCart = (id) => {
    $(`#cart-${id}`).slideUp(300, () => this.props.remove(id));
  };

  render() {
    return (
      <li id={"cart-" + this.props.item.id} className="cart-item">
        <div className="py-2 d-flex border-bottom mb-1">
          <img
            src={this.props.item.image}
            width="50"
            height="50"
            alt=""
            className="rounded my-auto"
          />
          <div className="col">
            <p className="card-title m-0">{this.props.item.name}</p>
            <div className="d-flex">
              <Controls
                add={this.props.add}
                reduce={this.props.reduce}
                item={this.props.item}
              />
              <p className="text-right small my-auto w-100">
                {formatPrice(this.props.item.price)}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              this.handleRemoveFromCart(this.props.item.id);
            }}
            className="btn btn-sm text-danger mt-auto"
          >
            <i className="fas fa-minus-circle"></i>
          </button>
        </div>
      </li>
    );
  }
}

class Controls extends React.Component {
  handleReduce = () => {
    this.props.reduce(this.props.item.id);
  };
  handleAdd = () => {
    this.props.add(this.props.item.id);
  };
  render() {
    return (
      <>
        <div className="btn-group">
          <button
            onClick={() => {
              this.handleReduce();
            }}
            className="btn btn-sm bg-light border"
          >
            -
          </button>
          <button className="btn btn-sm border">
            {this.props.item.quantity}
          </button>
          <button
            onClick={() => {
              this.handleAdd();
            }}
            className="btn btn-sm border bg-light"
          >
            +
          </button>
        </div>
      </>
    );
  }
}
class Total extends React.Component {
  getTotal() {
    const prices = this.props.cart.map((item, prices) => {
      return toPrice(item.price) * item.quantity + prices;
    });
    return formatPrice(prices.reduce((a, b) => a + b, 0).toFixed(2));
  }
  render() {
    return (
      <>
        <div className="mx-2 px-2 rounded d-flex align-items-center prc-tag">
          <p className="m-0 my-auto font-weight-bold">KES {this.getTotal()}</p>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart.items,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    remove: (id) => dispatch(removeFromCart(id)),
    reduce: (id) => dispatch(reduceQuantity(id)),
    add: (id) => dispatch(addToCart(id)),
    notify: () =>
      dispatch(
        addToast(
          "Please add some items to cart to proceed to checkout",
          "",
          true,
          true
        )
      ),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(Cart);
