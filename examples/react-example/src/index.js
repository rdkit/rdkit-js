import React from "react";
import ReactDOM from "react-dom";
import CodeExample from "./components/CodeExample/CodeExample";
import ExampleMoleculeStructure from "./examples/ExampleMoleculeStructure";
import ExampleSubstructure from "./examples/ExampleSubstructure";
import ExampleSVG from "./examples/ExampleSvg";
import ExampleCanvas from "./examples/ExampleSvg";
/* eslint import/no-webpack-loader-syntax: off */
import MoleculeStructureCode from "!!raw-loader!./components/MoleculeStructure/MoleculeStructure";
import ExampleSVGCode from "!!raw-loader!./examples/ExampleSvg.js";
import ExampleCanvasCode from "!!raw-loader!./examples/ExampleCanvas.js";
import ExampleSubstructureCode from "!!raw-loader!./examples/ExampleSubstructure.js";
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

ReactDOM.render(
  <CodeExample code={ExampleSubstructureCode}>
    <ExampleSubstructure />
  </CodeExample>,
  document.getElementById("example-substructures")
);
