import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import FourOFour from "../handlers/404";
import ProductDetail from "../productDetail/ProductDetail";
import LoadingFull from "../includes/loading/LoadingFull";
const Shop = React.lazy(() => import("../shop/Shop"));
const Home = React.lazy(() => import("../home/Home"));
const Checkout = React.lazy(() => import("../checkout/Checkout"));

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <LazyRoute exact path="/" component={Home} />
        <Route exact path="/checkout">
          <LazyRoute exact path="" component={Checkout} />
        </Route>

        <Route exact path="/shop">
          <LazyRoute exact path="" component={Shop} />
        </Route>

        <LazyRoute exact path="/p/:product_slug" component={ProductDetail} />
        <Route exact path="*" component={FourOFour} />
      </Switch>
    );
  }
}

class LazyRoute extends React.Component {
  render() {
    return (
      <Suspense fallback={<LoadingFull />}>
        <Route exact path={this.props.path} component={this.props.component} />
      </Suspense>
    );
  }
}

export default Routes;
