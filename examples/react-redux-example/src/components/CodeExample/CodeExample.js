import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactCollapsible from "react-collapsible";

function CodeExample({ code, children }) {
  return (
    <>
      {children}
      <div className="container">
        <ReactCollapsible
          trigger={
            <button className="button is-primary is-light is-large is-fullwidth">
              See Code Example
            </button>
          }
        >
          <div className="container">
            <SyntaxHighlighter language="javascript" style={a11yDark}>
              {code}
            </SyntaxHighlighter>
          </div>
        </ReactCollapsible>
      </div>
    </>
  );
}

export default CodeExample;
