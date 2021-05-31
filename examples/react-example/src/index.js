import React from "react";
import ReactDOM from "react-dom";
import CodeExample from "./components/CodeExample/CodeExample";
import ExampleMoleculeStructure from "./examples/ExampleMoleculeStructure";
import ExampleSVG from "./examples/ExampleSvg";
import ExampleCanvas from "./examples/ExampleSvg";
/* eslint import/no-webpack-loader-syntax: off */
import MoleculeStructureCode from "!!raw-loader!./components/MoleculeStructure/MoleculeStructure";
import ExampleSVGCode from "!!raw-loader!./examples/ExampleSvg.js";
import ExampleCanvasCode from "!!raw-loader!./examples/ExampleCanvas.js";
import "./index.css";

ReactDOM.render(
  <CodeExample code={MoleculeStructureCode}>
    <ExampleMoleculeStructure />
  </CodeExample>,
  document.getElementById("example-mol-structure")
);

ReactDOM.render(
  <CodeExample code={ExampleSVGCode}>
    <ExampleSVG />
  </CodeExample>,
  document.getElementById("example-svg")
);

ReactDOM.render(
  <CodeExample code={ExampleCanvasCode}>
    <ExampleCanvas />
  </CodeExample>,
  document.getElementById("example-canvas")
);
