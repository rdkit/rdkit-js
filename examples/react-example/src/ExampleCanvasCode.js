import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
/* eslint import/no-webpack-loader-syntax: off */
import ExampleCanvas from "./ExampleCanvas";
import ExampleCanvasCode from "!!raw-loader!./ExampleCanvas.js";

function ExampleCanvasWithCode() {
  return (
    <>
      <ExampleCanvas />
      <div className="container">
        <SyntaxHighlighter language="javascript" style={dark}>
          {ExampleCanvasCode}
        </SyntaxHighlighter>
      </div>
    </>
  );
}

export default ExampleCanvasWithCode;
