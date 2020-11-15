import React from "react";
// eslint-disable-next-line
import { createPopper } from "@popperjs/core";
class SideBar extends React.Component {
  render() {
    return (
      <>
        <div className="sideBarCont hides bg-white" id="sideBarCont">
          <div className="col vh-100"></div>
          <div className="buttons align-self-center p-2">
            <button className="btn showHide rounded btn-sm">
              <i className="fas fa-chevron-circle-left"></i>
            </button>
          </div>
        </div>
      </>
    );
  }

  componentDidMount() {
    const showHideButtons = document.querySelectorAll(".btn.showHide");
    const sideBar = document.getElementById("sideBarCont");

    showHideButtons.forEach((element) => {
      element.addEventListener("click", function () {
        sideBar.classList.toggle("hide");
      });

      // const popcorn = document.querySelector("#btnToolTip");
      // const tooltip = document.querySelector("#tooltip");
      // createPopper(popcorn, tooltip, {
      //   placement: "right-start",
      // });
    });
  }
}

export default SideBar;
