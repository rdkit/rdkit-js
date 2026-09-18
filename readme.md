---
layout: page
title: RDKit.js Documentation
permalink: /
---

[![NPM Latest Version](https://img.shields.io/npm/v/@rdkit/rdkit)](https://www.npmjs.com/package/@rdkit/rdkit)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/@rdkit/rdkit)](https://www.npmjs.com/package/@rdkit/rdkit)
[![NPM Monthly Downloads](https://img.shields.io/npm/dm/@rdkit/rdkit)](https://www.npmjs.com/package/@rdkit/rdkit)
[![NPM Yearly Downloads](https://img.shields.io/npm/dy/@rdkit/rdkit)](https://www.npmjs.com/package/@rdkit/rdkit)
[![NPM Total Downloads](https://img.shields.io/npm/dt/@rdkit/rdkit?label=total%20downloads)](https://www.npmjs.com/package/@rdkit/rdkit)

RDKit.js is the official JavaScript distribution of cheminformatics functionality from the [RDKit](https://rdkit.org), C++ library for cheminformatics.

The core WASM module comes from RDKit's [MinimalLib](https://github.com/rdkit/rdkit/tree/master/Code/MinimalLib).
MinimalLib wraps a subset of RDKit's API so it can be compiled to WebAssembly and used from JavaScript.
The package is built and published from RDKit main repository, while JavaScript documentation lives here.

The package is only three files, with zero dependencies:

- `RDKit_minimal.js` - Emscripten JavaScript glue that loads the WASM module
- `RDKit_minimal.wasm` - compiled RDKit MinimalLib binary
- `RDKit_minimal.d.ts` - TypeScript types generated at compile time

High-level UI components are not included, as these are usually framework specific.
You will need to implement those yourself.

## Install

```bash
npm i @rdkit/rdkit
# yarn add @rdkit/rdkit
# pnpm i @rdkit/rdkit
```

Or via CDN:

```html
<script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script>
```

## Loading the WASM module

`initRDKitModule()` initializes the WASM module and returns a `Promise` for the RDKit library object.

```js
const RDKit = await initRDKitModule();
console.log("RDKit version:", RDKit.version());
```

Or with `.then`:

```js
initRDKitModule().then((RDKit) => {
  console.log("RDKit version:", RDKit.version());
});
```

Loading is asynchronous.

For bundlers most friction is not related to RDKit, but how Emscripten-compiled modules ship compiled module.
Most common issues are

> Making `.wasm` fetchable after bundling.
> After bundling, the glue JS usually no longer sits next to `RDKit_minimal.wasm`.

> There is a code branch in the `.js` file that checks for `ENVIRONMENT_IS_NODE` env variable, which has `node:` function calls.
> Although these are never executed outside explicitly `nodejs`, some static analysis fails at build time, because the functions does not exist.

Both requires framework specific fixes.

## Getting started

```js
const RDKit = await initRDKitModule();
console.log(RDKit.version());

const mol = RDKit.get_mol("CCO");
if (!mol) throw new Error("Failed to parse SMILES");

console.log(mol.get_smiles());
console.log(mol.get_num_atoms());
console.log(JSON.parse(mol.get_descriptors()).amw);

mol.delete();
```

## Examples being used with different frameworks

- [RDKit.js + Vanilla JS]({{ '/examples/vanilla-js/' | relative_url }})
- [RDKit.js + React (Vite)]({{ '/examples/react/' | relative_url }})
- [RDKit.js + Vue (Vite)]({{ '/examples/vue/' | relative_url }})
- [RDKit.js + Angular]({{ '/examples/angular/' | relative_url }})
- [RDKit.js + Svelte (Vite)]({{ '/examples/svelte/' | relative_url }})
- [RDKit.js + Next.js]({{ '/examples/nextjs/' | relative_url }})
- [RDKit.js + Node.js]({{ '/examples/node/' | relative_url }})

## Using RDKit.js Pro Tips

- The module can also run inside a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) so heavy work does not block the UI thread
- Always call `mol.delete()` when you dont need the molecule anymore, to free some memory. See [WASM Memory management](https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#memory-management).
- You can make your molecule SVG transparent with `.molecule-structure-svg svg rect:first-of-type {fill: transparent !important;}`
- The package is compiled with emscripten `-fwasm-exceptions`, e.i. [WebAssembly.Exception](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Exception).
- Have fun!

## Note on versions

Previously versions was formatted as "RDKit release 2022.3.3-1.0.0",
noting the version of RDKit and iteration of JavaScript.

But from 2026 and onwards there will only be the RDKit version,
as it is published from the main repository. E.i. "2022.3.3".

Old versions are kept of course.

## License

BSD 3-Clause (same as RDKit).

## Citation

See [rdkit.org](https://rdkit.org). Note the installed version when citing.
