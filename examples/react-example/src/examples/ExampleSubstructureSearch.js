import React from "react";
import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";
import { SMILES_LIST } from "../utils/smiles";

class ExampleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: props.smilesList,
    };
  }

  state = {
    matches: [],
  };

  render() {
    return (
      <div id="component-example-list" className="container">
        <section className="hero">
          <div className="hero-body">
            <p className="title">Substructure match</p>
            <p className="subtitle">
              You can perform client-side substructure match.
            </p>
          </div>
        </section>
        <div
          className="columns is-desktop"
          style={{ margin: "12px", overflowX: "scroll" }}
        >
          {SMILES_LIST.map((smiles) => (
            <div className="column" key={smiles}>
              <MoleculeStructure
                id={smiles}
                structure={smiles}
                height={200}
                width={200}
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
