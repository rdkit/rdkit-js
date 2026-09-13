---
layout: page
title: Using RDKit.js with React
menu: React
permalink: /examples/react/
---

RDKit + React + Vite needs a fix to treat `.wasm` as an asset, import it with `?url`, and pass that URL via `locateFile`.

```bash
npm create vite@latest rdkit-react -- --template react
cd rdkit-react
npm install
npm install @rdkit/rdkit
```

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.wasm"],
});
```

```jsx
// src/App.jsx
import { useEffect, useState } from "react";
import initRDKitModule from "@rdkit/rdkit";
import wasmUrl from "@rdkit/rdkit/RDKit_minimal.wasm?url";

export default function App() {
  const [text, setText] = useState("Loading...");

  useEffect(() => {
    initRDKitModule({ locateFile: () => wasmUrl }).then((RDKit) => {
      const lines = [`RDKit version: ${RDKit.version()}`];
      const mol = RDKit.get_mol("CCO");
      if (!mol) {
        lines.push("Failed to parse SMILES");
      } else {
        lines.push(`SMILES: ${mol.get_smiles()}`);
        lines.push(`Atoms: ${mol.get_num_atoms()}`);
        lines.push(`MW: ${JSON.parse(mol.get_descriptors()).amw}`);
        mol.delete();
      }
      setText(lines.join("\n"));
    });
  }, []);

  return <pre>{text}</pre>;
}
```
