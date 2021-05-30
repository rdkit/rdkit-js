import React from "react";
import ReactDOM from "react-dom";
import ExampleSVG from "./ExampleSvg";
import ExampleCanvasCode from "./ExampleCanvasCode";
import "./index.css";

ReactDOM.render(<ExampleSVG />, document.getElementById("example-svg"));

ReactDOM.render(
  <ExampleCanvasCode />,
  document.getElementById("example-canvas")
);
