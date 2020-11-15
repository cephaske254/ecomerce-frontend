import React from "react";
import Home from "../components/home/Home";
const Shop = React.lazy(() => import("../components/shop/Shop"));

const shopRoute = {
  title: "Shop",
  component: Shop,
  url: "/shop",
  exact: true,
  requirePermission: false,
  suspense:true
};

const homeIndexRoute = {
  title: "Home",
  component: Home,
  url: "/",
  exact: true,
  requirePermission: false,
  suspense:false
};

export  default [shopRoute, homeIndexRoute];
