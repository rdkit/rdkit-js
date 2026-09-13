---
layout: page
title: Using RDKit.js with Angular
menu: Angular
permalink: /examples/angular/
---

RDKit + Angular needs a few fixes.
We need to treat `.wasm` as a file asset, and we need to mark `node:*` so the bundler doesnt die on the Node-branch.

```bash
npx @angular/cli new rdkit-angular --style=css --routing=false --skip-git --skip-tests --ssr=false
cd rdkit-angular
npm install @rdkit/rdkit
```

```jsonc
// angular.json → projects.<name>.architect.build.options
{
  "loader": { ".wasm": "file" },
  "externalDependencies": ["node:module", "node:fs", "node:crypto"],
}
```

```jsonc
// angular.json → projects.<name>.architect.serve.options
{
  "prebundle": { "exclude": ["@rdkit/rdkit"] },
}
```

```ts
// src/wasm.d.ts
declare module "*.wasm" {
  const url: string;
  export default url;
}
```

```ts
{% raw %}
// src/app/app.ts
import { Component, OnInit, signal } from "@angular/core";
import wasmUrl from "@rdkit/rdkit/RDKit_minimal.wasm";

@Component({
  selector: "app-root",
  standalone: true,
  template: `<pre>{{ text() }}</pre>`,
})
export class App implements OnInit {
  protected readonly text = signal("Loading...");

  async ngOnInit() {
    const factory = (await import("@rdkit/rdkit")).default;
    const RDKit = await factory({
      locateFile: () => wasmUrl,
    });

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
    this.text.set(lines.join("\n"));
  }
}
{% endraw %}
```
