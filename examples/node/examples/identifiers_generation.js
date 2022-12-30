import initRDKitModule from "@rdkit/rdkit";

let rdkit = await initRDKitModule();
let smiles = "CC(=O)Oc1ccccc1C(=O)O";
let mol = rdkit.get_mol(smiles);
let identifiers = [
  "smiles",
  "cxsmiles",
  "inchi",
  "inchikey",
  "morgan_fp",
  "pattern_fp",
  "aromatic_form",
  "kekule_form",
  "molblock",
  "v3Kmolblock"
];

identifiers.forEach((identifier) => {
  let val =
    identifier === "inchikey"
      ? rdkit.get_inchikey_for_inchi(mol.get_inchi())
      : mol[`get_${identifier}`]();
  console.log(`${identifier}: ${val}`);
});
