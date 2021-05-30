import React from "react";
import ReactDOM from "react-dom";
import ExampleSVG from "./ExampleSvg";
import ExampleCanvas from "./ExampleCanvas";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ExampleSVG />
  </React.StrictMode>,
  document.getElementById("example-svg")
);

ReactDOM.render(
  <React.StrictMode>
    <ExampleCanvas />
  </React.StrictMode>,
  document.getElementById("example-canvas")
);
