import React from "react";
import _ from "lodash";
import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";

class ExampleDrawingOptions extends React.Component {
  static initialState = {
    computing: false,
    mainStructureInput: "CN1C=NC2=C1C(=O)N(C(=O)N2C)",
    subStructureInput: "[N,n,O;!H0]",
  };

  state = { ...ExampleDrawingOptions.initialState };

  render() {
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
                  onChange={(e) => this.handleInputStructureChange(e)}
                  placeholder="Enter a SMILES string here..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns" style={{ margin: "12px 0" }}>
          <div className="column">
            <div className="field">
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  onChange={(e) => this.handleSubStructureInputChange(e)}
                  placeholder="Enter a SMILES or SMARTS string here..."
                />
              </div>
            </div>
          </div>
        </div>
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {
    if (this.state.computing) {
      return (
        <div className="columns is-desktop">
          <div className="column">
            <span key="computing-input-icon" className="icon is-small is-left">
              <i className="fas fa-circle-notch fa-spin" />
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="columns is-desktop">
        <div className="column">
          <MoleculeStructure
            id="structure-example-drawing-options-caffeine"
            structure={this.state.mainStructureInput}
            subStructure={this.state.subStructureInput}
            width={350}
            height={300}
          />
        </div>
      </div>
    );
  }

  renderInputIcon() {
    if (this.state.computing) {
      return (
        <span key="computing-input-icon" className="icon is-small is-left">
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

  handleInputStructureChange = _.debounce((e) => {
    this.setState({ computing: true });

    setTimeout(() => {
      this.setState({ mainStructureInput: e.target.value });

      this.setState({ computing: false });
    }, 100);
  }, 300);

  handleSubStructureInputChange = _.debounce((e) => {
    this.setState({ computing: true });

    setTimeout(() => {
      this.setState({ mainStructureInput: e.target.value });

      this.setState({ computing: false });
    }, 100);
  }, 300);
}

export default ExampleDrawingOptions;
