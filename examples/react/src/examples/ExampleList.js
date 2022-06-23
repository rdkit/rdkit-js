import React from "react";
import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";
import { SMILES_LIST } from "../utils/smiles";

class ExampleList extends React.Component {
  render() {
    return (
      <div id="component-example-list" className="container">
        <section className="hero">
          <div className="hero-body">
            <p className="title">Overview</p>
            <p className="subtitle">
              You can draw any molecule from SMILES dynamically with RDKit.js .
            </p>
          </div>
        </section>
        <div
          id="structure-list"
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
