import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";

function ExampleSubstructure() {
  const caffeine = "CN1C=NC2=C1C(=O)N(C(=O)N2C)";
  const caffeineSubStruct = "[N,n,O;!H0]";

  const aspirin = "CC(=O)Oc1ccccc1C(=O)O";
  const aspirinSubStruct = "CC(=O)Oc1ccccc1C";

  return (
    <div id="component-example-substruct" className="container">
      <section className="hero">
        <div className="hero-body">
          <p className="title">Substructure Highlight</p>
          <p className="subtitle">
            You can also highlight substructure of molecules with both the SVG
            and Canvas APIs.
          </p>
        </div>
      </section>
      <div className="columns is-desktop">
        <div className="column">
          <MoleculeStructure
            width={350}
            height={300}
            svgMode
            structure={caffeine}
            subStructure={caffeineSubStruct}
            id="structure-example-substruct-svg-caffeine"
          />
        </div>
        <div className="column">
          <MoleculeStructure
            width={350}
            height={300}
            structure={aspirin}
            subStructure={aspirinSubStruct}
            id="structure-example-subsctruct-canvas-aspirin"
          />
        </div>
      </div>
    </div>
  );
}

export default ExampleSubstructure;
