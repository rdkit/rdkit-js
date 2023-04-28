import initRDKitModule from "@rdkit/rdkit";

let rdkit = await initRDKitModule();
let smiles = "c1cnc(C)nc1C(=O)O";
var mol = rdkit.get_mol(smiles);
var template = `
    Mrv2014 10192005332D          
  
    0  0  0     0  0            999 V3000
  M  V30 BEGIN CTAB
  M  V30 COUNTS 6 6 0 0 0
  M  V30 BEGIN ATOM
  M  V30 1 C -5.7917 2.5817 0 0
  M  V30 2 N -7.1253 1.8117 0 0
  M  V30 3 C -7.1253 0.2716 0 0
  M  V30 4 C -5.7917 -0.4984 0 0
  M  V30 5 C -4.458 0.2716 0 0
  M  V30 6 N -4.458 1.8117 0 0
  M  V30 END ATOM
  M  V30 BEGIN BOND
  M  V30 1 1 1 2
  M  V30 2 2 2 3
  M  V30 3 1 3 4
  M  V30 4 2 4 5
  M  V30 5 1 5 6
  M  V30 6 2 1 6
  M  V30 END BOND
  M  V30 END CTAB
  M  END
  `;
let qmol = RDKitModule.get_mol(template);
mol.generate_aligned_coords(qmol, true);
let tdetails = mol.get_substruct_match(qmol);
let svg = mol.get_svg_with_highlights(tdetails);
console.log(svg);
