---
layout: page
title: Using RDKit.js with Vanilla JavaScript
menu: Vanilla JS
permalink: /examples/vanilla-js/
---

One HTML file, no bundler. The CDN loads the Emscripten glue; the matching `.wasm` is fetched from the same package URL.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>RDKit.js</title>
    <script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script>
  </head>
  <body>
    <pre id="out">Loading...</pre>
    <script>
      initRDKitModule().then((RDKit) => {
        const lines = [];
        lines.push("RDKit version: " + RDKit.version());

        const mol = RDKit.get_mol("CCO");
        if (!mol) {
          lines.push("Failed to parse SMILES");
        } else {
          lines.push("SMILES: " + mol.get_smiles());
          lines.push("Atoms: " + mol.get_num_atoms());
          lines.push("MW: " + JSON.parse(mol.get_descriptors()).amw);
          mol.delete();
        }

        document.getElementById("out").textContent = lines.join("\n");
      });
    </script>
  </body>
</html>
```
