import React from "react";
import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";

class ExampleDrawingOptions extends React.Component {
  state = {
    searching: false,
  };

  render() {
    const caffeine = "CN1C=NC2=C1C(=O)N(C(=O)N2C)";
    const caffeineSubStruct = "[N,n,O;!H0]";

    const aspirin = "CC(=O)Oc1ccccc1C(=O)O";
    const aspirinSubStruct = "CC(=O)Oc1ccccc1C";

    return (
      <div id="component-example-drawing-options" className="container">
        <section className="hero">
          <div className="hero-body">
            <p className="title">Additional Drawing Options</p>
            <p className="subtitle">
              RDKit.js provides you with all these additional options.
            </p>
          </div>
        </section>
        <div className="columns" style={{ margin: "12px 0" }}>
          <div className="column">
            <div className="field">
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  onChange={(e) => this.handleSearchChange(e)}
                  placeholder="Enter a SMARTS or SMILES string here..."
                />
                {this.renderInputIcon()}
              </div>
            </div>
          </div>
        </div>
        <div className="columns is-desktop">
          <div className="column">
            <MoleculeStructure
              id="structure-example-drawing-options-caffeine"
              structure={caffeine}
              subStructure={caffeineSubStruct}
              width={350}
              height={300}
              svgMode
              extraDetails={{
                addAtomIndices: true,
                highlightColor: [1, 0, 1],
                legend: "caffeine",
              }}
            />
          </div>
          <div className="column">
            <MoleculeStructure
              id="structure-example-drawing-options-aspirin"
              structure={aspirin}
              subStructure={aspirinSubStruct}
              extraDetails={{
                addAtomIndices: true,
                highlightColor: [0, 1, 1],
                legend: "aspirin",
              }}
              width={350}
              height={300}
            />
          </div>
        </div>
      </div>
    );
  }

  renderInputIcon() {
    if (this.state.searching) {
      return (
        <span key="searching-input-icon" className="icon is-small is-left">
          <i className="fas fa-circle-notch fa-spin" />
        </span>
      );
    } else {
      return (
        <span key="search-input-icon" className="icon is-small is-left">
          <i className="fas fa-search" />
        </span>
      );
    }
  }
}

export default ExampleDrawingOptions;
