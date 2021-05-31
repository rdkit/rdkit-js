import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";

function ExampleSVG() {
  const caffeine = "CN1C=NC2=C1C(=O)N(C(=O)N2C)";
  const aspirin = "CC(=O)Oc1ccccc1C(=O)O";

  return (
    <div id="component-example-svg" className="container">
      <section className="hero">
        <div className="hero-body">
          <p className="title">SVG Rendering</p>
          <p className="subtitle">
            You can render molecules using svg and specify height and width.
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
            id="structure-example-svg-caffeine"
          />
        </div>
        <div className="column">
          <MoleculeStructure
            width={350}
            height={300}
            svgMode
            structure={aspirin}
            id="structure-example-svg-aspirin"
          />
        </div>
      </div>
    </div>
  );
}

export default ExampleSVG;
