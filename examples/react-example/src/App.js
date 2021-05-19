import "./App.css";
import MoleculeStructure from "./MoleculeStructure";

function App() {
  const caffeine = "CN1C=NC2=C1C(=O)N(C(=O)N2C)";
  return (
    <div className="App">
      <MoleculeStructure
        width={350}
        height={300}
        structure={caffeine}
        id="structure-example-1"
      />
    </div>
  );
}

export default App;
