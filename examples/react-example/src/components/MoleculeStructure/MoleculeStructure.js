import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import "./MoleculeStructure.css";

class MoleculeStructure extends Component {
  static propTypes = {
    /**
     * Generic properties
     */
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    svgMode: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    /**
     * RDKit-specific properties
     */
    structure: PropTypes.string.isRequired,
    subStructure: PropTypes.string,
    extraDetails: PropTypes.object,
    drawingDelay: PropTypes.number
  };

  static defaultProps = {
    subStructure: "",
    className: "",
    width: 250,
    height: 200,
    svgMode: false,
    extraDetails: {},
    drawingDelay: undefined
  };

  constructor(props) {
    super(props);

    this.RDKit = window.RDKit;

    this.MOL_DETAILS = {
      width: this.props.width,
      height: this.props.height,
      bondLineWidth: 1,
      addStereoAnnotation: true,
      ...this.props.extraDetails,
    };

    const structure =
      typeof this.props.structure === "string" ? this.props.structure : "";
    const subStructure =
      typeof this.props.subStructure === "string"
        ? this.props.subStructure
        : "";
    this.state = {
      svg: undefined,
      mol: !!this.RDKit ? this.RDKit.get_mol(structure) : "",
      qmol: this.RDKit ? this.RDKit.get_qmol(subStructure) : "",
      rdKitLoaded: !!this.RDKit,
      rdKitError: false,
    };
  }

  draw() {
    if (this.props.drawingDelay) {
      setTimeout(() => {
        this.drawSVGorCanvas();
      }, this.props.drawingDelay);
    } else {
      this.drawSVGorCanvas();
    }
  }

  drawSVGorCanvas() {
    const mol = window.RDKit.get_mol(this.props.smiles || "invalid");
    const qmol = window.RDKit.get_qmol(this.props.subStructure || "invalid");

    if (this.props.svgMode && this.isValidMol(mol)) {
      const svg = mol.get_svg_with_highlights(this.getMolDetails(mol, qmol));
      this.setState({ svg });
    } else if (this.isValidMol(mol)) {
      const canvas = document.getElementById(this.props.id);
      mol.draw_to_canvas_with_highlights(canvas, this.getMolDetails(mol, qmol));
    }

    /**
     * Delete C++ mol objects manually
     * https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#memory-management
     */
    mol.delete();
    qmol.delete();
  }

  isValidMol(mol) {
    return mol.is_valid();
  }

  getMolDetails(mol, qmol) {
    if (this.isValidMol(mol) && this.isValidMol(qmol)) {
      const matchDetails = JSON.parse(mol.get_substruct_match(qmol));
      return JSON.stringify({
        ...this.MOL_DETAILS,
        ...(this.props.extraDetails || {}),
        ...matchDetails,
      });
    } else {
      return JSON.stringify({
        ...this.MOL_DETAILS,
        ...(this.props.extraDetails || {}),
      });
    }
  }

  componentDidMount() {
    this.draw();

    if (!this.state.rdKitLoaded) {
      window
        .initRDKitModule()
        .then((RDKit) => {
          window.RDKit = RDKit;
          this.RDKit = window.RDKit;
          this.setState({ rdKitLoaded: true, rdKitError: false });
        })
        .catch(() => {
          this.setState({ rdKitLoaded: false, rdKitError: true });
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.rdKitState === "LOADED") {
      const shouldUpdateDrawing =
        prevProps.smiles !== this.props.smiles ||
        prevProps.subStructure !== this.props.subStructure;

      if (shouldUpdateDrawing) {
        this.draw();
      }
    }
  }

  render() {
    if (this.state.rdKitError) {
      return "Error loading renderer.";
    }
    if (!this.state.rdKitLoaded) {
      return "Loading renderer...";
    }

    if (!this.isValidMol()) {
      return (
        <span title={`Cannot render structure: ${this.props.structure}`}>
          Render Error.
        </span>
      );
    } else if (this.props.svgMode) {
      return (
        <div
          title={this.props.structure}
          className={"molecule-structure-svg " + (this.props.className || "")}
          style={{ width: this.props.width, height: this.props.height }}
          dangerouslySetInnerHTML={{ __html: this.state.svg }}
        ></div>
      );
    } else {
      return (
        <div
          className={
            "molecule-canvas-container " + (this.props.className || "")
          }
        >
          <canvas
            title={this.props.structure}
            id={this.props.id}
            width={this.props.width}
            height={this.props.height}
          ></canvas>
        </div>
      );
    }
  }
}

export default MoleculeStructure;
