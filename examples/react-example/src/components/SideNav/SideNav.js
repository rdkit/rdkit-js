import React, { Component } from "react";

export default class SideNav extends Component {
  state = {
    activeLink: "introduction",
  };

  render() {
    return (
      <>
        <p className="menu-label">Quick Start</p>
        <ul className="menu-list">
          <li>
            <a href="#component-introduction">Introduction</a>
          </li>
          <li>
            <a href="#component-example-list">Overview</a>
          </li>
        </ul>
        <p className="menu-label">Components</p>
        <ul className="menu-list">
          <li>
            <a href="#component-example-moleculestructure">MoleculeStructure</a>
          </li>
        </ul>
        <p className="menu-label">Examples</p>
        <ul className="menu-list">
          <li>
            <a href="#component-example-svg">SVG Rendering</a>
          </li>
          <li>
            <a href="#component-example-canvas">Canvas Rendering</a>
          </li>
          <li>
            <a href="#component-example-substruct">Substructure Highlighting</a>
          </li>
          <li>
            <a href="#component-example-multi-substruct">
              Multi-Substructure Highlighting
            </a>
          </li>
          <li>
            <a href="#component-example-substruct-search">
              Substructure Search
            </a>
          </li>
          <li>
            <a href="#component-example-drawing-options">Additional Options</a>
          </li>
        </ul>
      </>
    );
  }
}
