import React from "react";
import _ from "lodash";
import hexRgb from "hex-rgb";
import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";

class ExampleDrawingOptions extends React.Component {
  static initialState = {
    computing: false,
    mainStructureInput: "CN1C=NC2=C1C(=O)N(C(=O)N2C)",
    subStructureInput: "[N,n,O;!H0]",
    width: 350,
    height: 250,
    bondLineWidth: 1,
    addStereoAnnotation: true,
    highlightColour: "#fd5c63",
    legendColour: "#000000",
    symbolColour: "#000000",
    backgroundColour: "#ffffff",
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
              <label className="label">Main Structure</label>
              <div className="control">
                <input
                  className="input"
                  defaultValue={this.state.mainStructureInput}
                  onChange={(e) =>
                    this.handleStateChange(e, "mainStructureInput")
                  }
                  placeholder="Enter a SMILES string here..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns" style={{ margin: "12px 0" }}>
          <div className="column">
            <div className="field">
              <label className="label">Substructure</label>
              <div className="control">
                <input
                  className="input"
                  defaultValue={this.state.subStructureInput}
                  onChange={(e) =>
                    this.handleStateChange(e, "subStructureInput")
                  }
                  placeholder="Enter a SMILES or SMARTS string here..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns" style={{ margin: "12px 0" }}>
          <div className="column">
            <div className="field">
              <label className="label">Width</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  defaultValue={this.state.width}
                  onChange={(e) => this.handleStateChange(e, "width")}
                  placeholder="Width"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Height</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  defaultValue={this.state.height}
                  onChange={(e) => this.handleStateChange(e, "height")}
                  placeholder="Height"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Bond line width</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  defaultValue={this.state.bondLineWidth}
                  onChange={(e) => this.handleStateChange(e, "bondLineWidth")}
                  placeholder="Bond line width"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Stereo-Annotation</label>
              <div className="control">
                <input
                  className="checkbox"
                  type="checkbox"
                  defaultValue={this.state.addStereoAnnotation}
                  onChange={(e) =>
                    this.handleStateChange(e, "addStereoAnnotation")
                  }
                  placeholder="Stereo-Annotation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns" style={{ margin: "12px 0" }}>
          <div className="column">
            <div className="field">
              <label className="label">Highlight Colour</label>
              <div className="control">
                <input
                  type="color"
                  className="input"
                  defaultValue={this.state.highlightColour}
                  onChange={(e) => this.handleStateChange(e, "highlightColour")}
                  placeholder="Highlight Colour"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Background Colour</label>
              <div className="control">
                <input
                  type="color"
                  className="input"
                  defaultValue={this.state.backgroundColour}
                  onChange={(e) =>
                    this.handleStateChange(e, "backgroundColour")
                  }
                  placeholder="Background Colour"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Legend Colour</label>
              <div className="control">
                <input
                  type="color"
                  className="input"
                  defaultValue={this.state.legendColour}
                  onChange={(e) => this.handleStateChange(e, "legendColour")}
                  placeholder="Legend Colour"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Symbol Colour</label>
              <div className="control">
                <input
                  type="color"
                  className="input"
                  defaultValue={this.state.symbolColour}
                  onChange={(e) => this.handleStateChange(e, "symbolColour")}
                  placeholder="Symbol Colour"
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
    const width = this.state.width || 250;
    const height = this.state.width || 250;
    const bondLineWidth = this.state.bondLineWidth || 1;
    const addStereoAnnotation = this.state.addStereoAnnotation || false;
    const highlightColour = this.getColourProportionsFromHex(
      this.state.highlightColour
    );
    const legendColour = this.getColourProportionsFromHex(
      this.state.legendColour
    );
    const backgroundColour = this.getColourProportionsFromHex(
      this.state.backgroundColour
    );
    const symbolColour = this.getColourProportionsFromHex(
      this.state.symbolColour
    );

    if (this.state.computing) {
      return (
        <div className="columns">
          <div className="column">
            <span
              style={{ width: width, height: height }}
              key="computing-input-icon"
              className="icon is-small is-left"
            >
              <i className="fas fa-circle-notch fa-spin" />
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="columns">
        <div className="column" style={{ margin: "12px 12px" }}>
          <div
            style={{
              width: width + 12,
              height: height + 12,
              border: "1px solid rgba(0,0,0,.1)",
              borderRadius: "2px",
            }}
          >
            <MoleculeStructure
              id="structure-example-drawing-options-caffeine"
              structure={this.state.mainStructureInput}
              subStructure={this.state.subStructureInput}
              width={width}
              height={height}
              extraDetails={{
                bondLineWidth,
                addStereoAnnotation,
                highlightColour,
                legendColour,
                backgroundColour,
                symbolColour,
              }}
            />
          </div>
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

  handleStateChange = _.debounce((e, stateProp) => {
    this.setState({ computing: true });

    setTimeout(() => {
      let value;
      if (e.target.type === "number") {
        value = parseFloat(e.target.value, 10);
      } else if (e.target.type === "checkbox") {
        value = !!e.target.checked;
      } else {
        value = e.target.value;
      }

      this.setState({ [stateProp]: value });
      this.setState({ computing: false });
    }, 100);
  }, 300);

  getColourProportionsFromHex(hex) {
    return hexRgb(hex, { format: "array" }).map((v) =>
      parseFloat((v / 255).toFixed(2), 10)
    );
  }
}

export default ExampleDrawingOptions;
