import React from "react";
import _ from "lodash";
import hexRgb from "hex-rgb";
import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";

class ExampleDrawingOptions extends React.Component {
  static initialState = {
    computing: false,
    mainStructureInput:
      "CSCC[C@H](NC(=O)[C@H](CC1=CNC2=C1C=CC=C2)NC(=O)CCNC(=O)OC(C)(C)C)C(=O)N[C@@H](CC(O)=O)C(=O)N[C@@H](CC1=CC=CC=C1)C(N)=O",
    subStructureInput: "[n,O]",
    legend: "Legend Text",
    legendFontSize: 16,
    width: 500,
    height: 450,
    bondLineWidth: 1,
    scaleBondWidth: false,
    addStereoAnnotation: true,
    addAtomIndices: true,
    addBondIndices: false,
    explicitMethyl: true,
    centreMoleculesBeforeDrawing: false,
    highlightColour: "#fd5c63",
    legendColour: "#000000",
    symbolColour: "#000000",
    backgroundColour: "#ffffff",
    rotate: 0.0,
    annotationFontScale: 0.5,
    comicMode: false,
    svgMode: true
  };

  constructor(props) {
    super(props);
    this.state = {
      ...ExampleDrawingOptions.initialState
    };
  }

  render() {
    return (
      <div id="component-example-drawing-options" className="container">
        <section className="hero">
          <div className="hero-body">
            <p className="title">Additional Drawing Options</p>
            <p className="subtitle column is-two-thirds pl-0">
              RDKit.js provides you a lot of options for drawing molecules.
              Checkout the{" "}
              <a href="https://rdkitjs.com#drawing-molecules-all-options">
                JavaScript examples
              </a>{" "}
              for the full list of available options.
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
              <label className="label">Legend</label>
              <div className="control">
                <input
                  className="input"
                  defaultValue={this.state.legend}
                  onChange={(e) => this.handleStateChange(e, "legend")}
                  placeholder="Add a legend here..."
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Legend font size</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  defaultValue={this.state.legendFontSize}
                  onChange={(e) => this.handleStateChange(e, "legendFontSize")}
                  placeholder="Add a font size..."
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
              <label className="label">Annotation font scale</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  step="0.1"
                  defaultValue={this.state.annotationFontScale}
                  onChange={(e) =>
                    this.handleStateChange(e, "annotationFontScale ")
                  }
                  placeholder="Annotation font scale"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Rotate</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  step="0.5"
                  defaultValue={this.state.rotate}
                  onChange={(e) => this.handleStateChange(e, "rotate")}
                  placeholder="Rotate"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="columns" style={{ margin: "12px 0" }}>
          <div className="column">
            <div className="field">
              <label className="label">Stereo-Annotation</label>
              <div className="control">
                <input
                  className="checkbox"
                  type="checkbox"
                  defaultChecked={this.state.addStereoAnnotation}
                  onChange={(e) =>
                    this.handleStateChange(e, "addStereoAnnotation")
                  }
                  placeholder="Stereo-Annotation"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Atom Indices</label>
              <div className="control">
                <input
                  className="checkbox"
                  type="checkbox"
                  defaultChecked={this.state.addAtomIndices}
                  onChange={(e) => this.handleStateChange(e, "addAtomIndices")}
                  placeholder="Atom Indices"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Bond Indices</label>
              <div className="control">
                <input
                  className="checkbox"
                  type="checkbox"
                  defaultChecked={this.state.addBondIndices}
                  onChange={(e) => this.handleStateChange(e, "addBondIndices")}
                  placeholder="Bond Indices"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Explicit Methyl</label>
              <div className="control">
                <input
                  className="checkbox"
                  type="checkbox"
                  defaultChecked={this.state.explicitMethyl}
                  onChange={(e) => this.handleStateChange(e, "explicitMethyl")}
                  placeholder="Explicit Methyl"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Scale bond width</label>
              <div className="control">
                <input
                  className="checkbox"
                  type="checkbox"
                  defaultChecked={this.state.scaleBondWidth}
                  onChange={(e) => this.handleStateChange(e, "scaleBondWidth")}
                  placeholder="Scale bond width"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Center molecule</label>
              <div className="control">
                <input
                  className="checkbox"
                  type="checkbox"
                  defaultChecked={this.state.centreMoleculesBeforeDrawing}
                  onChange={(e) =>
                    this.handleStateChange(e, "centreMoleculesBeforeDrawing")
                  }
                  placeholder="Center molecule"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Comic mode</label>
              <div className="control">
                <input
                  className="checkbox"
                  type="checkbox"
                  defaultChecked={this.state.comicMode}
                  onChange={(e) => this.handleStateChange(e, "comicMode")}
                  placeholder="Comic mode"
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
              <label className="label">Background Colour (canvas only)</label>
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
        <div className="columns" style={{ margin: "12px 0" }}>
          <div className="column">
            <div className="field">
              <label className="label">
                SVG/Canvas Rendering (Uncheck for canvas rendering)
              </label>
              <div className="control">
                <input
                  className="checkbox"
                  type="checkbox"
                  defaultChecked={this.state.svgMode}
                  onChange={(e) => this.handleStateChange(e, "svgMode")}
                  placeholder="Svg mode"
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
    const rotate = this.state.rotate || 0.0;
    const annotationFontScale = this.state.annotationFontScale || 0.5;
    const addStereoAnnotation = this.state.addStereoAnnotation || false;
    const addAtomIndices = this.state.addAtomIndices || false;
    const addBondIndices = this.state.addBondIndices || false;
    const explicitMethyl = this.state.explicitMethyl || false;
    const scaleBondWidth = this.state.scaleBondWidth || false;
    const comicMode = this.state.comicMode || false;
    const centreMoleculesBeforeDrawing =
      this.state.centreMoleculesBeforeDrawing || false;
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
    const svgMode = this.state.svgMode || false;
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
              borderRadius: "2px"
            }}
          >
            <MoleculeStructure
              id="structure-example-drawing-options"
              structure={this.state.mainStructureInput}
              subStructure={this.state.subStructureInput}
              drawingDelay={200}
              width={width}
              height={height}
              svgMode={svgMode}
              extraDetails={{
                legend: this.state.legend || "",
                legendFontSize: this.state.legendFontSize || 16,
                bondLineWidth,
                rotate,
                clearBackground: true,
                addStereoAnnotation,
                addAtomIndices,
                addBondIndices,
                explicitMethyl,
                scaleBondWidth,
                highlightColour,
                legendColour,
                backgroundColour,
                symbolColour,
                centreMoleculesBeforeDrawing,
                annotationFontScale,
                comicMode
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
    return _.take(
      hexRgb(hex, { format: "array" }).map((v) =>
        parseFloat((v / 255).toFixed(2), 10)
      ),
      3
    );
  }
}

export default ExampleDrawingOptions;
