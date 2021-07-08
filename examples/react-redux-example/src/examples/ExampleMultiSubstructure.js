import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";

function ExampleMultiSubstructure() {
  const caffeine = "CN1C=NC2=C1C(=O)N(C(=O)N2C)";
  const caffeineSubStruct = "[N,n,o,O]";

  const aspirin = "CC(=O)Oc1ccccc1C(=O)O";
  const aspirinSubStruct = "[O,o].c1ccccc1";

  return (
    <div id="component-example-multi-substruct" className="container">
      <section className="hero">
        <div className="hero-body">
          <p className="title">Multi-substructure Highlight</p>
          <p className="subtitle">
            You can also highlight multiple substructures of molecules with
            SMILES, SMARTS and a combination of the two with dot notation.
          </p>
        </div>
      </section>
      <div className="columns is-desktop">
        <div className="column">
          <MoleculeStructure
            id="structure-example-multisubstruct-svg-caffeine"
            structure={caffeine}
            subStructure={caffeineSubStruct}
            width={350}
            height={300}
            svgMode
          />
        </div>
        <div className="column">
          <MoleculeStructure
            id="structure-example-multisubsctruct-canvas-aspirin"
            structure={aspirin}
            subStructure={aspirinSubStruct}
            width={350}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}

export default ExampleMultiSubstructure;
