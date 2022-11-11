export interface SidebarSection {
  // Display name
  name: string;
  // Child elements under the section
  children: SidebarElement[];
}

export interface SidebarElement {
  // Display name
  name: string;
  // Element CSS ID Selector (Include the #)
  id: string;
}

/**
 * Follow the typing to add new sections
 */
export const sections: SidebarSection[] = [
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
        id: "#component-example-loader",
        name: "RDKitLoaderService"
      },
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
        id: "#other-examples-react",
        name: "React Examples"
      },
      {
        id: "#other-examples-vue",
        name: "Vue Examples"
      },
      {
        id: "#other-examples-legacy",
        name: "Legacy Examples"
      }
    ]
  }
];
