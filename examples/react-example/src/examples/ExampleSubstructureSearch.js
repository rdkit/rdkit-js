import React from "react";
import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";
import { SMILES_LIST } from "../utils/smiles";

class ExampleList extends React.Component {
  state = {
    matches: SMILES_LIST,
    searchValue: "",
  };

  render() {
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
                  placeholder="Enter a SMARTS or SMILES string here..."
                  value={this.state.searchValue}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="columns is-multiline" style={{ margin: "12px" }}>
          {this.state.matches.slice(0, 50).map((smiles) => (
            <div className="column" key={smiles}>
              <MoleculeStructure
                id={smiles}
                structure={smiles}
                height={100}
                width={100}
                svgMode
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ExampleList;
