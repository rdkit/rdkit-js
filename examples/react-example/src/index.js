import React from "react";
import ReactDOM from "react-dom";
import Introduction from "./components/Introduction/Introduction";
import CodeExample from "./components/CodeExample/CodeExample";
import NavBar from "./components/NavBar/NavBar";
import ExampleMoleculeStructure from "./examples/ExampleMoleculeStructure";
import ExampleSubstructure from "./examples/ExampleSubstructure";
import ExampleMultiSubstructure from "./examples/ExampleMultiSubstructure";
import ExampleSVG from "./examples/ExampleSvg";
import ExampleCanvas from "./examples/ExampleCanvas";
import ExampleDrawingOptions from "./examples/ExampleDrawingOptions";
import ExampleList from "./examples/ExampleList";
/* eslint import/no-webpack-loader-syntax: off */
import MoleculeStructureCode from "!!raw-loader!./components/MoleculeStructure/MoleculeStructure";
import ExampleSVGCode from "!!raw-loader!./examples/ExampleSvg.js";
import ExampleCanvasCode from "!!raw-loader!./examples/ExampleCanvas.js";
import ExampleSubstructureCode from "!!raw-loader!./examples/ExampleSubstructure.js";
import ExampleMultiSubstructureCode from "!!raw-loader!./examples/ExampleMultiSubstructure.js";
import ExampleDrawingOptionsCode from "!!raw-loader!./examples/ExampleDrawingOptions.js";
import ExampleListCode from "!!raw-loader!./examples/ExampleList.js";
import "./index.css";

ReactDOM.render(<NavBar />, document.getElementById("navbar"));

ReactDOM.render(<Introduction />, document.getElementById("introduction"));

const examples = [
  {
    code: ExampleListCode,
    component: <ExampleList />,
    elementId: "example-list",
  },
  {
    code: MoleculeStructureCode,
    component: <ExampleMoleculeStructure />,
    elementId: "example-mol-structure",
  },
  {
    code: ExampleSVGCode,
    component: <ExampleSVG />,
    elementId: "example-svg",
  },
  {
    code: ExampleCanvasCode,
    component: <ExampleCanvas />,
    elementId: "example-canvas",
  },
  {
    code: ExampleSubstructureCode,
    component: <ExampleSubstructure />,
    elementId: "example-substructures",
  },
  {
    code: ExampleMultiSubstructureCode,
    component: <ExampleMultiSubstructure />,
    elementId: "example-multi-substructures",
  },
  {
    code: ExampleDrawingOptionsCode,
    component: <ExampleDrawingOptions />,
    elementId: "example-all-options",
  },
]

examples.forEach((example) => {
  ReactDOM.render(
    <CodeExample code={example.code}>{example.component}</CodeExample>,
    document.getElementById(example.elementId)
  );
});
