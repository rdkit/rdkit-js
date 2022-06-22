import React, { Component } from "react";

export default class SideNav extends Component {
  state = {
    activeLink: "#component-introduction"
  };

  componentDidMount() {
    if (window.location.hash.length > 1) {
      this.setState({ activeLink: window.location.hash });
    }
  }

  render() {
    const sections = [
      {
        name: "General",
        children: [
          {
            id: "#component-introduction",
            name: "Introduction"
          },
          {
            id: "#component-example-list",
            name: "Overview"
          }
        ]
      },
      {
        name: "Components",
        children: [
          {
            id: "#component-example-moleculestructure",
            name: "MoleculeStructure"
          }
        ]
      },
      {
        name: "Examples",
        children: [
          {
            id: "#component-example-svg",
            name: "SVG Rendering"
          },
          {
            id: "#component-example-canvas",
            name: "Canvas Rendering"
          },
          {
            id: "#component-example-substruct",
            name: "Substructure Highlighting"
          },
          {
            id: "#component-example-multi-substruct",
            name: "Multi-Substructure Highlighting"
          },
          {
            id: "#component-example-substruct-search",
            name: "Substructure Search"
          },
          {
            id: "#component-example-drawing-options",
            name: "Additional Options"
          }
        ]
      },
      {
        name: "Other",
        children: [
          {
            id: "#other-examples-vanilla-js",
            name: "JavaScript Examples"
          },
          {
            id: "#other-examples-legacy",
            name: "Legacy Examples"
          }
        ]
      }
    ];

    const renderedSections = sections.map((section) => (
      <React.Fragment key={section.name}>
        <p className="menu-label">{section.name}</p>
        <ul className="menu-list">
          {section.children.map((child) => (
            <li key={child.id}>
              <a
                href={child.id}
                className={
                  this.state.activeLink === child.id ? "is-active" : undefined
                }
                onClick={() => this.setState({ activeLink: child.id })}
              >
                {child.name}
              </a>
            </li>
          ))}
        </ul>
      </React.Fragment>
    ));

    return renderedSections;
  }
}
