import React, { Component } from "react";

export default class SideNav extends Component {
  state = {
    activeLink: "introduction",
  };

  render() {
    return (
      <>
        <p class="menu-label">Quick Start</p>
        <ul class="menu-list">
          <li>
            <a href="#component-introduction">Introduction</a>
          </li>
          <li>
            <a href="#component-example-list">Overview</a>
          </li>
        </ul>
        <p class="menu-label">Components</p>
        <ul class="menu-list">
          <li>
            <a href="#component-example-moleculestructure">MoleculeStructure</a>
          </li>
        </ul>
        <p class="menu-label">Examples</p>
        <ul class="menu-list">
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
