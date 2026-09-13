---
layout: page
title: Getting Started with RDKit.js
permalink: /demo/
---

<script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script>

<p>Demo is using RDKit version: <strong id="rdkit-version">loading...</strong></p>

<h2>Molecule Drawing</h2>

<div id="drawing"></div>
<div id="can_smiles"></div>
<br>

SMILES: <input id="smiles_input" type="text" value="CC(=O)Oc1ccccc1C(=O)O" onkeyup="callback(this.value,true)">

<h3>Canvas</h3>
<canvas id="rdkit-canvas" width="400" height="300" style="border:1px solid #444;"></canvas>

<h3>Computed values</h3>
<div id="descrs"></div>

<h2>Substructure Search</h2>

SMARTS: <input id="smarts_input" type="text" value="" onkeyup="sma_callback(this.value)" placeholder="e.g. c1ccccc1">

<h2>Reactions</h2>

...

<h2>SubstructLibrary</h2>

...

<h2>R-Group Decomposition</h2>

https://github.com/rdkit/rdkit/blob/master/Code/MinimalLib/demo/rgd_demo.html

<script>
  var RDKitModule;

  function drawMolecule(mol, details) {
    details = details || {};
    var tdetails = JSON.stringify(details);
    var svg = mol.get_svg_with_highlights(tdetails);
    if (svg) {
      var ob = document.getElementById("drawing");
      ob.outerHTML = "<div id='drawing'>" + svg + "</div>";
    }
    var canvas = document.getElementById("rdkit-canvas");
    mol.draw_to_canvas_with_highlights(canvas, tdetails);
  }

  function callback(text, update_descrs) {
    var mol = RDKitModule.get_mol(text);
    if (mol.is_valid()) {
      drawMolecule(mol);
      var ob = document.getElementById("can_smiles");
      ob.outerHTML = "<div id='can_smiles'>" + mol.get_smiles() + "</div>";
      if (update_descrs) {
        var descrs = JSON.parse(mol.get_descriptors());
        var db = document.getElementById("descrs");
        db.outerHTML = "<div id='descrs'>" +
          "<b>AMW:</b> " + descrs.amw +
          "<br><b>MolLogP:</b> " + descrs.CrippenClogP +
          "<br><b>MFP2:</b> " + mol.get_morgan_fp(2, 128) +
          "</div>";
      }
    }
    mol.delete();
  }

  function sma_callback(text) {
    var qmol = RDKitModule.get_qmol(text);
    var mol = RDKitModule.get_mol(document.getElementById("smiles_input").value);
    if (mol.is_valid() && qmol.is_valid()) {
      var mdetails = mol.get_substruct_match(qmol);
      var match = JSON.parse(mdetails);
      if (match.atoms && match.atoms.length) drawMolecule(mol, match);
    }
    mol.delete();
    qmol.delete();
  }

  initRDKitModule().then(function(instance) {
    RDKitModule = instance;
    document.getElementById("rdkit-version").textContent = RDKitModule.version();
    callback("CC(=O)Oc1ccccc1C(=O)O");
  });
</script>
