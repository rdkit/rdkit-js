---
layout: playground
title: "Drawing Options"
permalink: /demo/drawing/
---

RDKit version: <strong id="rdkit-version">loading...</strong>

All examples use `get_svg_with_highlights(JSON.stringify(options))`. Even without highlighting, this is the correct way to pass drawing options.

---

## Size and layout

<script type="text/rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  width: 250,    // default: 250
  height: 200,   // default: 200
  padding: 0.05, // fraction of canvas used as padding around the molecule
  rotate: 0,     // rotate molecule clockwise in degrees
}));
mol.delete();
</script>

## Bond appearance

<script type="text/rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  bondLineWidth: 2,          // width of bond lines in pixels
  multipleBondOffset: 0.15,  // separation of double/triple bond lines as fraction of bond length
  scaleBondWidth: false,     // scale line width with molecule scale instead of fixed pixels
  fixedBondLength: 0,        // fix bond length in pixels; 0 = disabled, scales to fit canvas
  fixedScale: 0,             // fix the scale factor directly; 0 = disabled
}));
mol.delete();
</script>

## Atom labels and indices

<script type="text/rdkit-example">
var mol = RDKitModule.get_mol('[2H]C([3H])(F)Cl');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  addAtomIndices: false,             // draw RDKit atom index next to each atom
  addBondIndices: false,             // draw RDKit bond index next to each bond
  atomLabels: { '0': 'D*' },        // override label for specific atom indices, keyed by string index
  explicitMethyl: false,             // draw terminal CH3 explicitly instead of a line stub
  atomLabelDeuteriumTritium: true,   // use D/T symbols for [2H]/[3H] isotopes
  minFontSize: -1,                   // minimum atom label font size in pixels; -1 = no minimum
  maxFontSize: -1,                   // maximum atom label font size in pixels; -1 = no maximum
}));
mol.delete();
</script>

## Stereo annotations

<script type="text/rdkit-example">
var mol = RDKitModule.get_mol('C[C@@H](F)[C@H](Cl)Br');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  addStereoAnnotation: false,  // draw R/S and E/Z labels
  annotationFontScale: 0.5,    // size of annotation text relative to atom labels
}));
mol.delete();
</script>

## Misc atom options

<script type="text/rdkit-example">
var mol = RDKitModule.get_mol('*C(=O)N[CH3]');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  dummiesAreAttachments: false, // render * atoms as wavy attachment bonds instead of * label (default: false)
  includeRadicals: true,        // draw radical dot annotations on radical atoms (default: true)
  explicitMethyl: false,        // draw terminal CH3 explicitly instead of a line stub (default: false)
}));
mol.delete();
</script>

## Background

<script type="text/rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
var out = document.getElementById('output');
out.style.background = 'linear-gradient(135deg, #e8f5e9, #bbdefb)';
out.innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  backgroundColour: [1, 1, 1], // background fill color as [r, g, b], values 0–1 (default: [1,1,1])
  clearBackground: false,      // draw background rectangle; false = transparent
}));
mol.delete();
</script>

## Legend

<script type="text/rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  legend: 'Aspirin',               // text drawn below the molecule
  legendFontSize: 16,              // legend font size in pixels; only applies when legend is set
  legendColour: [0.0, 0.0, 0.0],   // legend text color as [r, g, b]; only applies when legend is set
}));
mol.delete();
</script>

## Highlighting atoms and bonds

Pass `atoms` and `bonds` index lists to highlight specific parts of the molecule.

<script type="text/rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  atoms: [6, 7, 8, 9, 10, 11],      // atom indices to highlight
  bonds: [6, 7, 8, 9, 10, 11],      // bond indices to highlight
  highlightColour: [1, 0.498, 0.498],// default highlight color as [r, g, b]
  highlightRadius: 0.3,              // radius of highlight circle around each atom
  fillHighlights: true,              // fill highlight shapes; false = outline only
  continuousHighlight: true,         // draw a continuous band through highlighted bonds
  highlightBondWidthMultiplier: 8,   // how much wider highlighted bonds are vs normal
  scaleHighlightBondWidth: false,    // scale highlight bond width with molecule scale
}));
mol.delete();
</script>

## Substructure match highlighting

Use `get_substruct_match()` to get atom/bond indices, then pass them directly to the draw call.

<script type="text/rdkit-example">
var mol  = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
var qmol = RDKitModule.get_qmol('c1ccccc1');           // SMARTS query

var match = JSON.parse(mol.get_substruct_match(qmol)); // returns { atoms: [...], bonds: [...] }
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify(match));

mol.delete();
qmol.delete();
</script>
