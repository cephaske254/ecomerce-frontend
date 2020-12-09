import React from "react";
import { DeliveryInfo, UserInfo } from "./Components";

export const checkOutPages = [
  {
    name: "Your Info",
    component: UserInfo,
  },
  {
    name: "Delivery Info",
    component: DeliveryInfo,
  },
  {
    name: "Payment",
    component: "Payment",
  },
];

export default class IndexIndicator extends React.Component {
  render() {
    return (
      <div className="d-flex py-2">
        <ul className="list-style-none indicators p-0 d-flex w-100">
          {checkOutPages.map((item, index) => {
            return (
              <li
                onClick={() => this.props.setIndex(index)}
                className={
                  "col " +
                  (this.props.pageIndex === index && "active ") +
                  (this.props.pageIndex > index && " done")
                }
              >
                <span className="circle">{index + 1}</span>
                <span className="label">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
