import React from "react";
class Footer extends React.Component {
  render() {
    return (
      <>
        <div
          className="container-fluid bg-dark text-white p-4 mt-4"
          style={{ borderRadius: "12px 12px 0 0" }}
        >
          <div className="row justify-content-center align-items-center">
            <div className="text-center">
              <div className="m-0 small d-flex flex-column">
                <small>Development Version</small>
                <div className="m-0">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://uxinfiniti.com"
                    className="text-decoration-none"
                  >
                    UXinfiniti
                  </a>{" "}
                  &copy; 2020
                </div>
                <small>Cephas Too</small>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
