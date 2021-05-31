import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";

function ExampleCanvas() {
  const caffeine = "CN1C=NC2=C1C(=O)N(C(=O)N2C)";
  const aspirin = "CC(=O)Oc1ccccc1C(=O)O";

  return (
    <div id="component-example-canvas" className="container">
      <section className="hero">
        <div className="hero-body">
          <p className="title">Canvas rendering</p>
          <p className="subtitle">
            You can also render molecules using the HTML Canvas API and specify
            height and width.
          </p>
        </div>
      </section>
      <div className="columns is-desktop">
        <div className="column">
          <MoleculeStructure
            width={350}
            height={300}
            structure={caffeine}
            id="structure-example-canvas-caffeine"
          />
        </div>
        <div className="column">
          <MoleculeStructure
            width={350}
            height={300}
            structure={aspirin}
            id="structure-example-canvas-aspirin"
          />
        </div>
      </div>
    </div>
  );
}

export default ExampleCanvas;
