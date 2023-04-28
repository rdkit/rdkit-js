import initRDKitModule from "@rdkit/rdkit";

let rdkit = await initRDKitModule();
let smiles = "CC(=O)Oc1ccccc1C(=O)O";
let mol = rdkit.get_mol(smiles);
let smarts = "O=C";
let qmol = rdkit.get_qmol(smarts);

let mdetails = {};
mdetails["atoms"] = [0, 1, 10];
mdetails["explicitMethyl"] = true;
mdetails["addAtomIndices"] = true;
mdetails["legend"] = "aspirin";

let mdetails2 = JSON.parse(mol.get_substruct_match(qmol));
mdetails2["highlightColour"] = [1, 0, 1];
mdetails2["legend"] = "aspirin";

let svg1 = mol.get_svg_with_highlights(JSON.stringify(mdetails));
let svg2 = mol.get_svg_with_highlights(JSON.stringify(mdetails2));
console.log(svg1);
console.log(svg2);
