import React, { Component } from "react";

export default class Introduction extends Component {
  render() {
    return (
      <div id="component-introduction" className="container">
        <section className="hero">
          <div className="hero-body">
            <p className="title">Introduction</p>
            <p className="subtitle column is-two-thirds pl-0">
              Welcome to RDKit.js for React. If you didn't do it already, we
              first recommend to go through the{" "}
              <a href="https://rdkitjs.com#drawing-molecules-all-options">
                JavaScript examples
              </a>{" "}
              for a low-level overview of the RDKit.js API.
            </p>
          </div>
        </section>
      </div>
    );
  }
}
