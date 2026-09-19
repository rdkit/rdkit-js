---
layout: playground
title: Getting Started with RDKit.js
permalink: /demo
---

## Draw a molecule

Render a molecule as SVG from a SMILES string. `get_svg()` returns an SVG string you can set directly as `innerHTML`.

<script type="text/rdkit-example">
var mol = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
document.getElementById('output').innerHTML = mol.get_svg();
mol.delete();
</script>
