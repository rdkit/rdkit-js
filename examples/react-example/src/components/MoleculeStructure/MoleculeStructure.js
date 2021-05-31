import React, { Component } from "react";
import "./MoleculeStructure.css";
import PropTypes from "prop-types";

class MoleculeStructure extends Component {
  static DEFAULT_SIZE = {
    width: 250,
    height: 200,
  };

  constructor(props) {
    super(props);

    this.RDKit = window.RDKit;

    this.MOL_DETAILS = JSON.stringify({
      width: this.props.width || MoleculeStructure.DEFAULT_SIZE.width,
      height: this.props.height || MoleculeStructure.DEFAULT_SIZE.height,
      bondLineWidth: 1,
      addStereoAnnotation: true,
      ...(props.molDetails || {}),
    });

    const structure =
      typeof this.props.structure === "string" ? this.props.structure : "";
    this.state = {
      svg: undefined,
      mol:
        this.RDKit && !!this.props.structure
          ? this.RDKit.get_mol(structure)
          : this.RDKit.get_mol(""),
      qmol:
        this.RDKit && !!this.props.subStructure
          ? this.RDKit.get_qmol(this.props.subStructure)
          : this.RDKit.get_qmol(""),
      rdKitLoaded: !!this.RDKit,
      rdKitError: false,
    };
  }

  draw() {
    const isValidMol = this.isValidMol();
    if (isValidMol && this.props.svgMode) {
      const svg = this.state.mol.get_svg_with_highlights(this.getMolDetails());
      this.setState({ svg });
    } else if (isValidMol) {
      const canvas = document.getElementById(this.props.id);
      this.state.mol.draw_to_canvas_with_highlights(
        canvas,
        this.getMolDetails()
      );
    }
  }

  isValidMol() {
    return !!this.state.mol && this.state.mol.is_valid();
  }

  isValidQMol() {
    return !!this.state.qmol && this.state.qmol.is_valid();
  }

  getMolDetails() {
    if (this.isValidMol() && this.isValidQMol()) {
      const extraMolDetails = JSON.parse(
        this.state.mol.get_substruct_match(this.state.qmol)
      );
      return JSON.stringify({
        ...this.MOL_DETAILS,
        ...extraMolDetails,
      });
    } else {
      return JSON.stringify(this.MOL_DETAILS);
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

  componentDidUpdate(prevProps, prevState) {
    const rdkitStateChanged = prevState.rdKitLoaded !== this.state.rdKitLoaded;
    const structureChanged = prevProps.structure !== this.props.structure;

    if (rdkitStateChanged || structureChanged) {
      let oldMol = this.state.mol || {};
      this.setState({ mol: this.RDKit.get_mol(this.props.structure) }, () =>
        this.draw()
      );
      /**
       * attempt at forcing old mol objects
       * to be garbage collected
       */
      if (typeof oldMol === "object") {
        oldMol = null;
      }
    }
  }

  componentWillUnmount() {
    if (this.state.mol) {
      this.state.mol.delete();
    }

    if (this.state.qmol) {
      this.state.qmol.delete();
    }
  }

  render() {
    if (this.state.rdKitError) {
      return "Error loading renderer.";
    }
    if (!this.state.rdKitLoaded) {
      return "Loading renderer...";
    }

    let compound = null;
    if (!this.isValidMol()) {
      compound = (
        <span title={`Cannot render structure: ${this.props.structure}`}>
          Render Error.
        </span>
      );
    } else if (this.props.svgMode) {
      compound = (
        <div
          title={this.props.structure}
          className={"molecule-structure-svg " + (this.props.className || "")}
          style={{ width: this.props.width, height: this.props.height }}
          dangerouslySetInnerHTML={{ __html: this.state.svg }}
        ></div>
      );
    } else {
      compound = (
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

    return compound;
  }
}

MoleculeStructure.propTypes = {
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
};

export default MoleculeStructure;
