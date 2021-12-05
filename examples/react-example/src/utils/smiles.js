/**
 * Taken from https://github.com/reymond-group/smilesDrawer/blob/master/example/drugbank.js
 */

export const SMILES_LIST = [
  "CC[C@H](C)[C@H](NC(=O)[C@H](CCC(O)=O)NC(=O)[C@H](CCC(O)=O)NC(=O)[C@H](CC1=CC=CC=C1)NC(=O)[C@H](CC(O)=O)NC(=O)CNC(=O)[C@H](CC(N)=O)NC(=O)CNC(=O)CNC(=O)CNC(=O)CNC(=O)[C@@H]1CCCN1C(=O)[C@H](CCCNC(N)=N)NC(=O)[C@@H]1CCCN1C(=O)[C@H](N)CC1=CC=CC=C1)C(=O)N1CCC[C@H]1C(=O)N[C@@H](CCC(O)=O)C(=O)N[C@@H](CCC(O)=O)C(=O)N[C@@H](CC1=CC=C(O)C=C1)C(=O)N[C@@H](CC(C)C)C(O)=O",
  "CC(C)C[C@H](NC(=O)[C@@H](COC(C)(C)C)NC(=O)[C@H](CC1=CC=C(O)C=C1)NC(=O)[C@H](CO)NC(=O)[C@H](CC1=CNC2=CC=CC=C12)NC(=O)[C@H](CC1=CN=CN1)NC(=O)[C@@H]1CCC(=O)N1)C(=O)N[C@@H](CCCN=C(N)N)C(=O)N1CCC[C@H]1C(=O)NNC(N)=O",
  "NC(=O)CC[C@@H]1NC(=O)[C@H](CC2=CC=CC=C2)NC(=O)[C@H](CC2=CC=C(O)C=C2)NC(=O)CCSSC[C@H](NC(=O)[C@H](CC(N)=O)NC1=O)C(=O)N1CCC[C@H]1C(=O)N[C@@H](CCCNC(N)=N)C(=O)NCC(N)=O",
  "CC(C)C[C@H](NC(=O)[C@@H](CCCNC(N)=O)NC(=O)[C@H](CC1=CC=C(O)C=C1)NC(=O)[C@H](CO)NC(=O)[C@@H](CC1=CN=CC=C1)NC(=O)[C@@H](CC1=CC=C(Cl)C=C1)NC(=O)[C@@H](CC1=CC2=CC=CC=C2C=C1)NC(C)=O)C(=O)N[C@@H](CCCNC(N)=N)C(=O)N1CCC[C@H]1C(=O)N[C@H](C)C(N)=O",
  "CC[C@@H]1NC(=O)[C@H]([C@H](O)[C@H](C)CC=CC)N(C)C(=O)[C@H](C(C)C)N(C)C(=O)[C@H](CC(C)C)N(C)C(=O)[C@H](CC(C)C)N(C)C(=O)[C@@H](C)NC(=O)[C@H](C)NC(=O)[C@H](CC(C)C)N(C)C(=O)[C@@H](NC(=O)[C@H](CC(C)C)N(C)C(=O)CN(C)C1=O)C(C)C",
  "NCCCC[C@H](NC(=O)[C@@H]1CCCN1C(=O)[C@@H]1CSSC[C@H](N)C(=O)N[C@@H](CC2=CC=CC=C2)C(=O)N[C@@H](CC2=CC=CC=C2)C(=O)N[C@@H](CCC(N)=O)C(=O)N[C@@H](CC(N)=O)C(=O)N1)C(=O)NCC(N)=O",
  "[H][C@]1(NC(=O)[C@H](CCCCN)NC(=O)[C@@H](CC2=CNC3=C2C=CC=C3)NC(=O)[C@H](CC2=CC=CC=C2)NC(=O)[C@H](CSSC[C@H](NC1=O)C(=O)N[C@H](CO)[C@@H](C)O)NC(=O)[C@H](N)CC1=CC=CC=C1)[C@@H](C)O",
  "OC[C@H]1O[C@@H]([C@H](O)[C@@H]1OP(O)(=O)O[C@]([H])(C)CNC(=O)CC[C@]1(C)[C@@H](CC(=O)N)[C@@]2([H])N([Co]C#N)C1=C(C)/C1=N/C(=CC3=NC(=C(C)/C4=N[C@]2(C)[C@@](C)(CC(=O)N)[C@@H]4CCC(=O)N)[C@@](C)(CC(=O)N)[C@@H]3CCC(=O)N)/C(C)(C)[C@@H]1CCC(=O)N)N1C=NC2=CC(C)=C(C)C=C12",
  "C[C@H](CCCC(C)(C)O)[C@@]1([H])CC[C@@]2([H])C(CCC[C@]12C)=CC=C1C[C@@H](O)C[C@H](O)C1=C",
  "CC(C=CC=C(/C)C=CC1C(C)=CC(O)CC1(C)C)=C/C=C/C=C(C)/C=C/C=C(C)/C=C/C1=C(C)CC(O)CC1(C)C",
  "C[C@H](CCCC(C)(C)O)[C@@]1([H])CC[C@@]2([H])C(CCC[C@]12C)=CC=C1C[C@@H](O)CCC1=C",
  "CC(C)[C@@H](C)C=C[C@@H](C)[C@@]1([H])CC[C@@]2([H])C(CCC[C@]12C)=CC=C1C[C@@H](O)CCC1=C",
  "NC(=O)C1=CN(C=CC1)[C@@H]1O[C@H](CO[P@](O)(=O)O[P@](O)(=O)OC[C@H]2O[C@H]([C@H](O)[C@@H]2O)N2C=NC3=C(N)N=CN=C23)[C@@H](O)[C@H]1O",
  "CC(C)CCC[C@@H](C)[C@@]1([H])CC[C@@]2([H])C(CCC[C@]12C)=CC=C1C[C@@H](O)CCC1=C",
  "NC1=NC=NC2=C1N=CN2[C@@H]1O[C@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)[C@@H](O)[C@H]1O",
  "[H][C@]12[C@H](C[C@H](O)C=C1C=C[C@H](C)[C@@H]2CC[C@@H](O)C[C@@H](O)CC(O)=O)OC(=O)[C@@H](C)CC",
  "[H][C@@]12CCC[C@]1([H])N([C@@H](C2)C(O)=O)C(=O)[C@H](C)N[C@@H](CCC1=CC=CC=C1)C(=O)OCC",
  "[H][C@@]12C[C@@]3([H])[C@]4([H])C[C@H](F)C5=CC(=O)C=C[C@]5(C)[C@@]4([H])[C@@H](O)C[C@]3(C)[C@@]1(OC(C)(C)O2)C(=O)CO",
  "CSCC[C@H](NC(=O)[C@H](CC1=CNC2=C1C=CC=C2)NC(=O)CCNC(=O)OC(C)(C)C)C(=O)N[C@@H](CC(O)=O)C(=O)N[C@@H](CC1=CC=CC=C1)C(N)=O",
  "CC[C@H]1OC(=O)[C@H](C)[C@@H](O[C@H]2C[C@@](C)(OC)[C@@H](O)[C@H](C)O2)[C@H](C)[C@@H](O[C@@H]2O[C@H](C)C[C@@H]([C@H]2O)N(C)C)[C@](C)(O)C[C@@H](C)C(=O)[C@H](C)[C@@H](O)[C@]1(C)O",
  "[H]O[Co+]N1C2=C(C)/C3=N/C(=CC4=NC(=C(C)/C5=N[C@@](C)([C@@]1([H])[C@H](CC(=O)N)[C@@]2(C)CCC(=O)NC[C@@H](C)OP(=O)([O-])O[C@H]1[C@@H](O)[C@H](O[C@@H]1CO)N1C=NC2=CC(C)=C(C)C=C12)[C@@](C)(CC(N)=O)[C@@H]5CCC(=O)N)[C@@](C)(CC(=O)N)[C@@H]4CCC(=O)N)/C(C)(C)[C@@H]3CCC(=O)N",
];
