---
layout: playground
title: "Substructure Search"
permalink: /demo/substructures/
---

RDKit version: <strong id="rdkit-version">loading...</strong>

Substructure queries use SMARTS patterns via `get_qmol()`. Matches return atom and bond
indices that can be passed directly to `get_svg_with_highlights()`.

If you want to learn more about SMARTS syntax you can visit

- [Daylight - SMARTS theory](https://www.daylight.com/dayhtml/doc/theory/theory.smarts.html)
- [RDKit - Book Reference](https://www.rdkit.org/docs/RDKit_Book.html#smarts-reference)
- [SMARTS101 - How to use SMARTS](https://smarts101.dev/how-to-smarts)

## Example

`get_substruct_match()` returns the first matching set of atom and bond indices.

{% raw %}
<pre class="rdkit-example">
var mol  = RDKitModule.get_mol('CC(=O)Oc1ccccc1C(=O)O');
var qmol = RDKitModule.get_qmol('C(=O)O'); // carboxylic acid / ester SMARTS

var match = JSON.parse(mol.get_substruct_match(qmol));
console.log('Matched atoms:', match.atoms);
console.log('Matched bonds:', match.bonds);

document.getElementById('output').innerHTML =
  mol.get_svg_with_highlights(JSON.stringify(match));

mol.delete();
qmol.delete();
</pre>
{% endraw %}

