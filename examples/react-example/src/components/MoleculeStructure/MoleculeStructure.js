import React, { Component } from "react";
import "./MoleculeStructure.css";
import PropTypes from "prop-types";

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
  };

  static defaultProps = {
    subStructure: "",
    className: "",
    width: 250,
    height: 200,
    svgMode: false,
    extraDetails: {},
  };

  constructor(props) {
    super(props);

    this.RDKit = window.RDKit;

    this.MOL_DETAILS = JSON.stringify({
      width: this.props.width,
      height: this.props.height,
      bondLineWidth: 1,
      addStereoAnnotation: true,
      ...this.props.extraDetails,
    });

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

    if (rdkitStateChanged) {
      let oldMol, oldQMol;
      const shouldUpdateMol = prevProps.smiles !== this.props.smiles;
      const shouldUpdateQMol =
        prevProps.subStructure !== this.props.subStructure;
      const updateObject = {};

      if (shouldUpdateMol) {
        oldMol = this.state.mol || undefined;
        updateObject.mol = window.RDKit.get_mol(this.props.smiles);
      }

      if (shouldUpdateQMol) {
        oldQMol = this.state.mol || undefined;
        updateObject.qmol = window.RDKit.get_qmol(this.props.subStructure);
      }

      if (shouldUpdateMol || shouldUpdateQMol) {
        this.setState({ ...updateObject }, () => this.draw());
      }

      /**
       * Delete C++ mol objects manually
       * https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#memory-management
       */
      if (oldMol) {
        oldMol.delete();
      }

      if (oldQMol) {
        oldQMol.delete();
      }
    }
  }

  componentWillUnmount() {
    /**
     * Delete C++ mol objects manually
     * https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#memory-management
     */

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
