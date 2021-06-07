import React, { Component } from "react";

export default class NavBar extends Component {
  render() {
    return (
      <>
        <nav
          className="navbar has-shadow"
          style={{ padding: "12px 0" }}
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand" style={{ padding: "6px" }}>
            <a
              className="navbar-item"
              href="https://www.npmjs.com/package/@rdkit/rdkit"
              target="_blank"
            >
              <img src={`${process.env.PUBLIC_URL}/rdkitjs_cropped_200.png`} />
            </a>

            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="#">
                {" "}
                Home{" "}
              </a>
              <a className="navbar-item" href="#">
                {" "}
                Documentation{" "}
              </a>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a
                    data-tooltip="Source Code"
                    className="button has-tooltip-bottom is-white is-big"
                    href="https://github.com/rdkit/rdkit"
                    target="_blank"
                  >
                    <span className="icon">
                      <i className="fab fa-github fa-2x"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
