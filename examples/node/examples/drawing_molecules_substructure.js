import initRDKitModule from "@rdkit/rdkit";

let rdkit = await initRDKitModule();
let smiles = "CC(=O)Oc1ccccc1C(=O)O";
let mol = rdkit.get_mol(smiles);
let smarts = "Oc1[c,n]cccc1";
let qmol = rdkit.get_qmol(smarts);
let mdetails = mol.get_substruct_match(qmol);
let svg = mol.get_svg_with_highlights(mdetails);
console.log(svg);
