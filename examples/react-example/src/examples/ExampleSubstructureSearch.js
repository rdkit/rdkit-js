import React from "react";
import _ from "lodash";
import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";
import { SMILES_LIST } from "../utils/smiles";

class ExampleList extends React.Component {
  state = {
    matches: SMILES_LIST,
    searchValue: "",
    searching: false
  };

  render() {
    const matches = this.state.matches.slice(0, 50);
    return (
      <div id="component-example-substruct-search" className="container">
        <section className="hero">
          <div className="hero-body">
            <p className="title">Substructure match</p>
            <p className="subtitle">
              You can perform client-side substructure match.
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
        <div className="columns is-multiline" style={{ margin: "12px" }}>
          {matches.length > 0
            ? matches.slice(0, 40).map((smiles) => (
                <div className="column" key={smiles}>
                  <MoleculeStructure
                    id={smiles}
                    structure={smiles}
                    subStructure={this.state.searchValue}
                    height={200}
                    width={200}
                    svgMode
                  />
                </div>
              ))
            : "Input is either invalid or no matches were found."}
        </div>
      </div>
    );
  }

  handleSearchChange = _.debounce((e) => {
    this.setState({ searching: true });

    setTimeout(() => {
      const noMatchLength = 2;
      const currentVal = e.target.value;
      this.setState({ searchValue: currentVal });
      if (!currentVal) {
        this.setState({ smilesList: SMILES_LIST });
      } else {
        const qmol = window.RDKit.get_qmol(currentVal);
        const matches = SMILES_LIST.filter((smiles) => {
          const mol = window.RDKit.get_mol(smiles);
          const hasMatch = mol.get_substruct_match(qmol).length > noMatchLength;
          mol.delete();
          return hasMatch;
        });
        this.setState({ matches });
        if (qmol.is_valid()) {
        } else {
          this.setState({ matches: [] });
        }
        qmol.delete();
      }

      this.setState({ searching: false });
    }, 100);
  }, 300);

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

export default ExampleList;
