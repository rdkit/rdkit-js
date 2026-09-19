---
layout: playground
title: "Reactions"
permalink: /demo/reactions/
---

RDKit version: <strong id="rdkit-version">loading...</strong>

Reactions are parsed from reaction SMARTS via `get_rxn()` and can be rendered as SVG or applied to molecules with `run_reactants()`.

For in-depth understanding of reactions read [RDKit book on reaction handling](https://www.rdkit.org/docs/RDKit_Book.html#chemical-reaction-handling).

## Basic reaction rendering

Parse a reaction SMARTS and render it as an SVG diagram.

<script type="text/rdkit-example">
// Reaction SMARTS: reactants >> products
// Atom-mapped atoms carry the same number on both sides
var rxn = RDKitModule.get_rxn('[CH3:1][OH:2]>>[CH2:1]=[OH0:2]');
document.getElementById('output').innerHTML = rxn.get_svg();
rxn.delete();
</script>

## Highlight by reactant

`highlightByReactant: true` colors each reactant's atoms distinctly in the SVG and optionally per-reactant colors with `highlightColorsReactants`.

<script type="text/rdkit-example">
var rxn = RDKitModule.get_rxn(
  '[C:1](=[O:2])[OH:3].[NH2:4][C:5]>>[C:1](=[O:2])[NH:4][C:5].[OH2:3]'
);
document.getElementById('output').innerHTML =
  rxn.get_svg_with_highlights(JSON.stringify({
    width: 600, height: 200,
    highlightByReactant: true, // color atoms by which reactant they belong to
    highlightColorsReactants: [
      [0.2, 0.6, 1.0],  // reactant 1 — blue
      [1.0, 0.5, 0.1],  // reactant 2 — orange
    ],
  }));
rxn.delete();
</script>

## Run reactants

`run_reactants(molList, maxProducts)` applies the reaction to a set of reactant molecules
and returns a list of product sets.

<script type="text/rdkit-example">
var rxn = RDKitModule.get_rxn('[C;H3:1].[Cl:2]>>[*:1][*:2]');

var reactants = new RDKitModule.MolList();
reactants.append(RDKitModule.get_mol('NCCC'));
reactants.append(RDKitModule.get_mol('Cl'));

// run_reactants returns a JSMolListList — a list of product sets
var results = rxn.run_reactants(reactants, 1); // 1 = max products to generate

var out = document.getElementById('output');
out.innerHTML = '<b>' + results.size() + ' product sets</b><br>';

for (var i = 0; i < results.size(); i++) {
  var productSet = results.get(i);
  for (var j = 0; j < productSet.size(); j++) {
    var product = productSet.at(j);
    console.log('Product', i, j, ':', product.get_smiles());
    out.innerHTML += product.get_svg_with_highlights(
      JSON.stringify({ width: 150, height: 120,})
    );
  }
}

reactants.delete();
rxn.delete();
</script>

