---
layout: page
title: Using RDKit.js with Node.js
menu: Node.js
permalink: /examples/node/
---

RDKit + Node.js >= 18. It is straight forward.

```bash
npm init -y
npm install @rdkit/rdkit
```

Use ESM (`"type": "module"`):

```jsonc
// package.json
{
  "name": "rdkit-node-example",
  "type": "module",
  "scripts": { "start": "node index.js" },
}
```

```js
// index.js
import initRDKit from "@rdkit/rdkit";

const RDKit = await initRDKit();
console.log("RDKit version:", RDKit.version());

const mol = RDKit.get_mol("CCO");
if (!mol) {
  console.error("Failed to parse SMILES");
  process.exit(1);
}

console.log("SMILES:", mol.get_smiles());
console.log("Atoms:", mol.get_num_atoms());
console.log("MW:", JSON.parse(mol.get_descriptors()).amw);

mol.delete();
```
