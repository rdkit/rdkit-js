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
    });

    const structure =
      typeof this.props.structure === "string" ? this.props.structure : "";
    this.state = {
      svg: undefined,
      mol: this.RDKit && this.RDKit.get_mol(structure),
      rdKitLoaded: !!this.RDKit,
      rdKitError: false,
    };
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
    const hasRdkitStateChanged =
      prevState.rdKitLoaded !== this.state.rdKitLoaded;
    const hasStructureChanged = prevProps.structure !== this.props.structure;
    if (hasRdkitStateChanged || hasStructureChanged) {
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

  draw() {
    const isValidMol = this.isValidMol();
    if (isValidMol && this.props.svgMode) {
      const svg = this.state.mol.get_svg_with_highlights(this.MOL_DETAILS);
      this.setState({ svg });
    } else if (isValidMol) {
      const canvas = document.getElementById(this.props.id);
      this.state.mol.draw_to_canvas_with_highlights(canvas, this.MOL_DETAILS);
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
        <span title={this.props.structure}>
          {this.props.structure.substring(0, 6)} ...
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
        <canvas
          title={this.props.structure}
          id={this.props.id}
          width={this.props.width}
          height={this.props.height}
        ></canvas>
      );
    }

    return compound;
  }

  isValidMol() {
    return !!this.state.mol && this.state.mol.is_valid();
  }
}

MoleculeStructure.propTypes = {
  id: PropTypes.string.isRequired,
  structure: PropTypes.string.isRequired,
  className: PropTypes.string,
  svgMode: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default MoleculeStructure;
