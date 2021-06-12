import React from "react";
import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";
import { SMILES_LIST } from "../utils/smiles";

class ExampleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: SMILES_LIST,
    };
  }

  state = {
    matches: [],
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
        <div className="columns is-multiline" style={{ margin: "12px" }}>
          {this.state.matches.slice(0, 30).map((smiles) => (
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
