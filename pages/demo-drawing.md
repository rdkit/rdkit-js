---
layout: playground
title: "Drawing Molecules with RDKit.js"
permalink: /demo/drawing/
---

RDKit version: <strong id="rdkit-version">loading...</strong>

All examples use `get_svg_with_highlights(JSON.stringify(options))`. Even without highlighting,
this is the correct way to pass drawing options.

---

## Size and layout

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  width: 250,    // output SVG width in pixels (default: 250)
  height: 200,   // output SVG height in pixels (default: 200)
  padding: 0.05, // fraction of canvas used as padding around the molecule (default: 0.05)
  rotate: 45,    // rotate molecule clockwise in degrees (default: 0)
}));
mol.delete();
</pre>
{% endraw %}

## Bond style

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  bondLineWidth: 2,          // bond line width in pixels (default: 2)
  multipleBondOffset: 0.15,  // double/triple bond line separation as fraction of bond length (default: 0.15)
  scaleBondWidth: false,     // scale bond width proportionally with molecule scale (default: false)
  fixedBondLength: 0,        // fix bond length in pixels; 0 = disabled, scales to fit canvas (default: 0)
  fixedScale: 0,             // fix scale factor directly; 0 = disabled (default: 0)
  splitBonds: true,          // split bond color at midpoint between atom colors (default: false)
}));
mol.delete();
</pre>
{% endraw %}

## Kekulé and wedge bonds

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('C[C@@H](F)c1ccccc1');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  kekulize: true,       // draw Kekulé form with alternating single/double bonds (default: true)
  wedgeBonds: true,     // draw stereo wedge/dash bonds (default: true)
  singleColourBonds: false, // draw all bonds in symbolColour instead of element colors (default: false)
}));
mol.delete();
</pre>
{% endraw %}

## Atom labels and indices

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  addAtomIndices: true,           // draw RDKit atom index next to each atom (default: false)
  addBondIndices: false,          // draw RDKit bond index next to each bond (default: false)
  noAtomLabels: false,            // suppress all atom labels entirely (default: false)
  atomLabels: { '0': 'Me' },     // override label for specific atoms, keyed by string index (default: {})
  additionalAtomLabelPadding: 0,  // extra whitespace padding around atom labels as fraction of atom radius (default: 0)
}));
mol.delete();
</pre>
{% endraw %}

## Isotope labels

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('[2H]C([14C])(F)Cl');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  isotopeLabels: true,            // show isotope labels on non-dummy atoms (default: true)
  atomLabelDeuteriumTritium: true, // use D/T symbols for [2H]/[3H] (default: false)
}));
mol.delete();
</pre>
{% endraw %}

## Explicit methyl and attachment points

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('*C(=O)NCC(C)(C)C');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  explicitMethyl: true,         // draw terminal CH3 explicitly (default: false)
  dummiesAreAttachments: true,  // render * atoms as wavy attachment bonds (default: false)
  includeRadicals: true,        // draw radical dot annotations (default: true)
}));
mol.delete();
</pre>
{% endraw %}

## Font sizing

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  minFontSize: -1,    // minimum atom label font size in pixels; -1 = no minimum (default: -1)
  maxFontSize: -1,    // maximum atom label font size in pixels; -1 = no maximum (default: -1)
  fixedFontSize: 14,  // fixed atom label font size, ignores min/max; -1 = disabled (default: -1)
  baseFontSize: 0.6,  // base font size as fraction of bond length before scaling (default: 0.6)
}));
mol.delete();
</pre>
{% endraw %}

## Stereo annotations

`addStereoAnnotation` requires a molecule with defined stereocenters or double bond geometry.

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('C[C@@H](F)[C@H](Cl)Br');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  addStereoAnnotation: true,    // draw R/S and E/Z labels (default: false)
  annotationFontScale: 0.5,     // annotation text size relative to atom labels (default: 0.5)
  annotationColour: [0.2, 0.2, 0.8], // annotation text color as [r,g,b] (default: [0.5,0.5,0.5])
}));
mol.delete();
</pre>
{% endraw %}

## Comic mode

Draws bonds and labels with a hand-drawn style.

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  comicMode: true, // hand-drawn comic book style (default: false)
}));
mol.delete();
</pre>
{% endraw %}

## Background

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
var out = document.getElementById('output');
out.style.background = 'linear-gradient(135deg, #e8f5e9, #bbdefb)';
out.innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  backgroundColour: [1, 1, 1], // background fill color as [r,g,b] values 0–1 (default: [1,1,1])
  clearBackground: false,      // draw background rect; false = transparent SVG (default: true)
}));
mol.delete();
</pre>
{% endraw %}

## Colour palette

Apply a named palette or supply a custom per-element mapping. Named presets: `"default"`, `"avalon"`, `"cdk"`, `"darkmode"`, `"bw"`.

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
var out = document.getElementById('output');

// Named preset
out.innerHTML = '<b>CDK palette</b>' +
  mol.get_svg_with_highlights(JSON.stringify({ atomColourPalette: 'cdk' }));

// Custom mapping: override oxygen (8) to purple, nitrogen (7) to orange
out.innerHTML += '<b>Custom palette</b>' +
  mol.get_svg_with_highlights(JSON.stringify({
    atomColourPalette: { '8': [0.6, 0.1, 0.8], '7': [1.0, 0.5, 0.0] }
  }));

mol.delete();
</pre>
{% endraw %}

## Legend

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
var out = document.getElementById('output');

// Bottom (default)
out.innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  legend: 'Aspirin',               // text drawn near the molecule (default: '')
  legendFontSize: 18,              // legend font size in pixels (default: 16)
  legendColour: [0.1, 0.45, 0.1], // legend text color as [r,g,b]
  legendFraction: 0.15,            // fraction of height reserved for legend (default: 0.1)
  legendPosition: 'Bottom',        // 'Bottom' | 'Top' | 'Left' | 'Right' (default: 'Bottom')
}));

// Left with vertical text
out.innerHTML += mol.get_svg_with_highlights(JSON.stringify({
  legend: 'Aspirin',
  legendPosition: 'Left',
  legendVerticalText: true,        // rotate legend text 90°; useful for Left/Right (default: false)
}));

mol.delete();
</pre>
{% endraw %}

## Highlight: atoms and bonds

Default highlight color is `[1, 0.498, 0.498]` (`#FF7F7F`).

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  atoms: [6, 7, 8, 9, 10, 11],         // atom indices to highlight (default: [])
  bonds: [6, 7, 8, 9, 10, 11],         // bond indices to highlight (default: [])
  highlightColour: [0.4, 0.8, 1.0],    // uniform highlight color as [r,g,b] (default: [1, 0.498, 0.498])
  highlightRadius: 0.3,                // atom highlight circle radius (default: 0.3)
  fillHighlights: true,                // fill highlight shapes; false = outline only (default: true)
  continuousHighlight: true,           // draw continuous band through highlighted bonds (default: true)
  highlightBondWidthMultiplier: 8,     // highlighted bond width multiplier vs normal (default: 8)
  atomHighlightsAreCircles: false,     // force circles regardless of atom label shape (default: false)
  scaleHighlightBondWidth: false,      // scale highlight bond width with molecule (default: false)
  standardColoursForHighlightedAtoms: false, // use element colors even when highlighted (default: false)
}));
mol.delete();
</pre>
{% endraw %}

## Per-atom and per-bond highlight colors

Override color individually for each highlighted atom or bond.

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg_with_highlights(JSON.stringify({
  atoms: [0, 1, 2, 6, 7, 8, 9, 10, 11],
  bonds: [0, 1, 6, 7, 8, 9, 10, 11],
  highlightAtomColors: {   // per-atom color overrides as {atomIdx: [r,g,b]}
    '0': [1.0, 0.4, 0.4],
    '1': [1.0, 0.7, 0.2],
    '2': [0.4, 0.8, 0.4],
    '6': [0.3, 0.6, 1.0], '7': [0.3, 0.6, 1.0], '8': [0.3, 0.6, 1.0],
    '9': [0.3, 0.6, 1.0], '10': [0.3, 0.6, 1.0], '11': [0.3, 0.6, 1.0],
  },
  highlightBondColors: {   // per-bond color overrides as {bondIdx: [r,g,b]}
    '0': [1.0, 0.4, 0.4],
    '1': [1.0, 0.7, 0.2],
    '6': [0.3, 0.6, 1.0], '7': [0.3, 0.6, 1.0], '8': [0.3, 0.6, 1.0],
    '9': [0.3, 0.6, 1.0], '10': [0.3, 0.6, 1.0], '11': [0.3, 0.6, 1.0],
  },
  highlightAtomRadii: {    // per-atom radius overrides as {atomIdx: float}
    '0': 0.5, '1': 0.4, '2': 0.3,
  },
}));
mol.delete();
</pre>
{% endraw %}

## Multi-color highlighting

Highlight atoms and bonds with multiple colors simultaneously using `highlightAtomMultipleColors`
and `highlightBondMultipleColors`. Style is controlled by `multiColourHighlightStyle`.

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
var out = document.getElementById('output');

// Lasso style
out.innerHTML = '<b>Lasso</b>' + mol.get_svg_with_highlights(JSON.stringify({
  highlightAtomMultipleColors: {  // {atomIdx: [[r,g,b], [r,g,b], ...]}
    '6': [[0.4, 0.8, 1.0], [1.0, 0.4, 0.4]],
    '7': [[0.4, 0.8, 1.0], [1.0, 0.4, 0.4]],
    '8': [[0.4, 0.8, 1.0]],
    '9': [[1.0, 0.4, 0.4]],
  },
  highlightBondMultipleColors: {  // {bondIdx: [[r,g,b], [r,g,b], ...]}
    '6': [[0.4, 0.8, 1.0], [1.0, 0.4, 0.4]],
    '7': [[0.4, 0.8, 1.0]],
    '8': [[1.0, 0.4, 0.4]],
  },
  multiColourHighlightStyle: 'Lasso', // 'Lasso' | 'CircleAndLine' (default: 'Lasso')
}));

// CircleAndLine style
out.innerHTML += '<b>CircleAndLine</b>' + mol.get_svg_with_highlights(JSON.stringify({
  highlightAtomMultipleColors: {
    '6': [[0.4, 0.8, 1.0], [1.0, 0.4, 0.4]],
    '7': [[0.4, 0.8, 1.0], [1.0, 0.4, 0.4]],
    '8': [[0.4, 0.8, 1.0]],
    '9': [[1.0, 0.4, 0.4]],
  },
  highlightBondMultipleColors: {
    '6': [[0.4, 0.8, 1.0], [1.0, 0.4, 0.4]],
    '7': [[0.4, 0.8, 1.0]],
    '8': [[1.0, 0.4, 0.4]],
  },
  multiColourHighlightStyle: 'CircleAndLine',
}));

mol.delete();
</pre>
{% endraw %}

## Substructure match highlighting

Use `get_substruct_match()` to get indices, pass them directly to the draw call.

{% raw %}
<pre class="rdkit-example">
var mol  = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
var qmol = RDKitModule.get_qmol('c1ccccc1');

var match = JSON.parse(mol.get_substruct_match(qmol)); // { atoms: [...], bonds: [...] }
document.getElementById('output').innerHTML =
  mol.get_svg_with_highlights(JSON.stringify(match));

mol.delete();
qmol.delete();
</pre>
{% endraw %}
