import initRDKitModule from "@rdkit/rdkit";

let rdkit = await initRDKitModule();
let smiles = "CC(=O)Oc1ccccc1C(=O)O";
let mol = rdkit.get_mol(smiles);
let svg = mol.get_svg();
console.log(svg);
