---
layout: playground
title: Getting Started with RDKit.js
permalink: /demo/
---

Demo is using RDKit version: <strong id="rdkit-version">loading...</strong>

## Draw a molecule

Render a molecule as SVG from a SMILES string. See [all drawing options](/demo/drawing/).

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg();
mol.delete();
</pre>
{% endraw %}

## Getting Properties

`get_descriptors()` returns a JSON string with computed molecular properties.

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
var d = JSON.parse(mol.get_descriptors());

console.log('AMW:         ', d.amw.toFixed(2));
console.log('ClogP:       ', d.CrippenClogP.toFixed(2));
console.log('TPSA:        ', d.tpsa.toFixed(2));
console.log('HBA:         ', d.NumHBA);
console.log('HBD:         ', d.NumHBD);
console.log('RotBonds:    ', d.NumRotatableBonds);
console.log('Rings:       ', d.RingCount);
console.log('FractionCSP3:', d.FractionCSP3.toFixed(2));

mol.delete();
</pre>
{% endraw %}

Compute molecular fingerprints as bit strings. Useful for similarity and machine learning.

{% raw %}
<pre class="rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
console.log('Morgan (r=2, 64bit):', mol.get_morgan_fp(JSON.stringify({ radius: 2, nBits: 64 })));
console.log('RDKit FP (64bit):   ', mol.get_rdkit_fp(JSON.stringify({ nBits: 64 })));
console.log('MACCS (166bit):     ', mol.get_maccs_fp());
mol.delete();
</pre>
{% endraw %}

## Molecule Format Reading

RDKit.js can read and write SMILES, SMARTS, molblock (V2000/V3000), and JSON.

{% raw %}
<pre class="rdkit-example">
var smiles = 'CC(=O)Oc1ccccc1C(=O)O';
var mol = RDKitModule.get_mol(smiles);

// Write to V2000 molblock
var molblock = mol.get_molblock();
// Round-trip: read back from molblock
var mol2 = RDKitModule.get_mol(molblock);
// RDKit JSON interchange format
var json = mol.get_json();
// and back
var mol3 = RDKitModule.get_mol(json)

document.getElementById('output').innerHTML = mol3.get_svg();
mol.delete();
mol2.delete();
</pre>
{% endraw %}

## Substructure search

Find atoms and bonds matching a SMARTS pattern. See [all substructure examples](/demo/substructures/).

{% raw %}
<pre class="rdkit-example">
var mol  = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
var qmol = RDKitModule.get_qmol('c1ccccc1');  // SMARTS: benzene ring

var match = JSON.parse(mol.get_substruct_match(qmol));
console.log('Matched atoms:', match.atoms);
console.log('Matched bonds:', match.bonds);

document.getElementById('output').innerHTML =
  mol.get_svg_with_highlights(JSON.stringify(match));

mol.delete();
qmol.delete();
</pre>
{% endraw %}

## Reactions

Parse and render reaction SMARTS. See [all reaction examples](/demo/reactions/).

{% raw %}
<pre class="rdkit-example">
var rxn = RDKitModule.get_rxn('[CH3:1][OH:2]>>[CH2:1]=[OH0:2]');
document.getElementById('output').innerHTML = rxn.get_svg();
rxn.delete();
</pre>
{% endraw %}

## R-Group Decomposition

Decompose a set of molecules against a core scaffold. See [full R-group examples](/demo/r-group-decomposition/).

