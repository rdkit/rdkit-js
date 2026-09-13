---
layout: page
title: Using RDKit.js with Vue
menu: Vue
permalink: /examples/vue/
---

RDkit + Vue 3 + Vite needs to fix the `.wasm` with `?url`, then pass that URL to `initRDKitModule` via `locateFile` so the binary is fetchable after bundling.

```bash
npm create vite@latest rdkit-vue -- --template vue
cd rdkit-vue
npm install
npm install @rdkit/rdkit
```

```vue
{% raw %}
<!-- src/App.vue -->
<script setup>
import { ref, onMounted } from "vue";
import initRDKitModule from "@rdkit/rdkit";
import wasmUrl from "@rdkit/rdkit/RDKit_minimal.wasm?url";

const text = ref("Loading...");

onMounted(async () => {
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

  text.value = lines.join("\n");
});
</script>

<template>
  <pre>{{ text }}</pre>
</template>
{% endraw %}
```
