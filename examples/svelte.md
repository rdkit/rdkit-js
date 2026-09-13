---
layout: page
title: Using RDKit.js with Svelte
menu: Svelte
permalink: /examples/svelte/
---

RDKit + Svelte + Vite needs to treat `.wasm` as an asset, import it with `?url`, and pass that URL via `locateFile` so the binary is fetchable after bundling.

```bash
npm create vite@latest rdkit-svelte -- --template svelte
cd rdkit-svelte
npm install
npm install @rdkit/rdkit
```

```js
// vite.config.js
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  assetsInclude: ["**/*.wasm"],
});
```

```svelte
<!-- src/App.svelte -->
<script>
  import { onMount } from "svelte";
  import initRDKitModule from "@rdkit/rdkit";
  import wasmUrl from "@rdkit/rdkit/RDKit_minimal.wasm?url";

  let text = $state("Loading...");

  onMount(async () => {
    const RDKit = await initRDKitModule({ locateFile: () => wasmUrl });
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

    text = lines.join("\n");
  });
</script>

<pre>{text}</pre>
```
