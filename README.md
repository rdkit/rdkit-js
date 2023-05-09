<br />
<br />
<p align="center">
  <a href="https://www.rdkitjs.com/">
    <img src="rdkitjs_logo.png" alt="rdkit.js - Project Logo">
  </a>
  </p>
      <p align="center">
    A powerful cheminformatics and molecule rendering toolbelt for JavaScript</p>
    <br/>
<div align="center">

[![NPM Latest Version](https://img.shields.io/npm/v/@rdkit/rdkit)](https://www.npmjs.com/package/@rdkit/rdkit)
<br />
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/@rdkit/rdkit)](https://www.npmjs.com/package/@rdkit/rdkit)
[![NPM Monthly Downloads](https://img.shields.io/npm/dm/@rdkit/rdkit)](https://www.npmjs.com/package/@rdkit/rdkit)
[![NPM Yearly Downloads](https://img.shields.io/npm/dy/@rdkit/rdkit)](https://www.npmjs.com/package/@rdkit/rdkit)
[![NPM Total Downloads](https://img.shields.io/npm/dt/@rdkit/rdkit?label=total%20downloads)](https://www.npmjs.com/package/@rdkit/rdkit)
<br />
[![Build Status](https://dev.azure.com/rdkit-js/rdkit-js/_apis/build/status/rdkit.rdkit-js?branchName=master)](https://dev.azure.com/rdkit-js/rdkit-js/_build/latest?definitionId=1&branchName=master)
[![License](https://img.shields.io/github/license/rdkit/rdkit)](https://github.com/rdkit/rdkit-js/blob/master/LICENSE)
[![DOI](https://zenodo.org/badge/10009991.svg)](https://zenodo.org/badge/latestdoi/10009991)

</div>
<p align="center">
    <br />
    <a href="https://www.rdkitjs.com/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/rdkit/rdkit-js/issues">Report Bug</a>
    ·
    <a href="https://github.com/rdkit/rdkit-js/issues">Request Feature</a>
        ·
        <a href="https://github.com/rdkit/rdkit-js/stargazers">Star Repository</a>
  </p>
<br />

<div align="center">

| Resources           | URL                                                                           | Contributor(s)                                                                                |
| :------------------ | :---------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| JavaScript Examples | [rdkitjs.com](https://www.rdkitjs.com/)                                       | [@greglandrum](https://github.com/greglandrum) , [@MichelML](https://github.com/MichelML)     |
| React.js Examples   | [react.rdkitjs.com](https://react.rdkitjs.com/)                               | [@MichelML](https://github.com/MichelML)                                                      |
| Vue.js Examples     | [vue.rdkitjs.com](https://vue.rdkitjs.com/)                                   | [@adam-of-barrot](https://github.com/adam-of-barot), [@MichelML](https://github.com/MichelML) |
| Angular.js Examples | [angular.rdkitjs.com](https://angular.rdkitjs.com/)                           | [@Phil-DS](https://github.com/Phil-DS)                                                        |
| Next.js Examples    | [source code](https://github.com/rdkit/rdkit-js/tree/master/examples/nextjs)  | [@bugzpodder](https://github.com/bugzpodder)                                                  |
| Node.js Examples    | [source code](https://github.com/rdkit/rdkit-js/tree/master/examples/node)    | [@adam-of-barrot](https://github.com/adam-of-barot)                                           |
| API Docs            | [docs.rdkitjs.com](https://docs.rdkitjs.com/)                                 | [@adam-of-barrot](https://github.com/adam-of-barot), [@MichelML](https://github.com/MichelML) |
| WASM Module         | [see source code](https://github.com/rdkit/rdkit/tree/master/Code/MinimalLib) | [@ptosco](https://github.com/ptosco)                                                          |

</div>

<br/>

<div align="center">

| ![space-1.jpg](examples.png)  |
| :---------------------------: |
| _Molecule Rendering Examples_ |

</div>

## Table of contents <!-- omit in toc -->

- [Introduction](#introduction)
- [Install](#install)
- [Usage](#usage)
- [Usage in TypeScript](#usage-in-typescript)
- [Contributing](#contributing)
- [Release process](#release-process)
- [Website deployment](#website-deployment)
- [Maintainers](#maintainers)

## Introduction

RDKit.js is a powerful cheminformatics and molecule rendering toolbelt for JavaScript.

It is the official JavaScript distribution of cheminformatics functionality from the [RDKit](https://github.com/rdkit/rdkit) - a C++ library for cheminformatics.

The project is leveraging web assembly to rollout a subset of the RDKit functionality that is relevant in any javascript context. The WASM module bundled with this package is compiled directly from the RDKit source code.

The functionality included in RDKit.js is decided by the RDKit core team and its community. Thus, if you use this package, your voice matters.

### What is the scope of this repository

This repository is currently dedicated to:

1. NPM builds and releases of the RDKit core wasm module
2. Website deployment of examples using the RDKit core wasm module in JavaScript and web frameworks
3. Any additional functionalities built **on top of** the RDKit core wasm module.

The scope of the project may change over time.

### What is NOT the scope of this repository

Any changes to the core RDKit wasm module (also known as RDKit's MinimalLib) is out of scope of this project.

To contribute or keep track of the changes to the core RDKit wasm module, go [here](https://github.com/rdkit/rdkit/tree/master/Code/MinimalLib).

## Install

```bash
npm i @rdkit/rdkit
# or yarn add @rdkit/rdkit
```

## Usage

### Using RDKit.js package assets

#### Option 1: Use the npm package distribution files

Once you have the RDKit package installed in your node modules, copy the following distribution files anywhere in your deployed assets.

- `node_modules/@rdkit/rdkit/dist/RDKit_minimal.js`
- `node_modules/@rdkit/rdkit/dist/RDKit_minimal.wasm`

**NOTE: Both files must be copied at the same location in your deployed assets for the library to work properly.**

#### Option 2: Use the remote distribution files from [unpkg.com](https://unpkg.com/)

- `https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js`
- `https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.wasm`

### Running RDKit.js in your JavaScript code

To use RDKit.js, load the javascript file and instantiate the wasm module inside the `head` tag of your `index.html`, before you run your application code:

```html
<head>
  <!-- ...other files and HTML tags... -->
  <!-- Load the RDKit JS file -->
  <script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script>

  <!-- Instantiate the WASM module. The inline script below could live elsewhere inside your application code. -->
  <script>
    window
      .initRDKitModule()
      .then(function (RDKit) {
        console.log("RDKit version: " + RDKit.version());
        window.RDKit = RDKit;
        /**
         * The RDKit module is now loaded.
         * You can use it anywhere.
         */
      })
      .catch(() => {
        // handle loading errors here...
      });
  </script>
  <!-- ...your application code goes here... -->
</head>
```

### Using RDKit.js with JavaScript

It is recommended to go through all the JavaScript examples available on the official website [rdkitjs.com](https://rdkitjs.com).

[Source code](https://github.com/rdkit/rdkit-js/tree/master/examples/javascript)

### Using RDKit.js with React.js

If you are using React.js, several additional examples using React.js are available at [react.rdkitjs.com](https://react.rdkitjs.com).

[Source code](https://github.com/rdkit/rdkit-js/tree/master/examples/react)

### Using RDKit.js with Next.js

If you are using Next.js, you can use a modified webpack config to build your app.

[Source code](https://github.com/rdkit/rdkit-js/tree/master/examples/nextjs)

### Using RDKit.js with Vue.js

If you are using Vue.js, several additional examples using Vue.js are available at [vue.rdkitjs.com](https://vue.rdkitjs.com).

[Source code](https://github.com/rdkit/rdkit-js/tree/master/examples/vue)

### Using RDKit.js with Angular

If you are using Angular, several additional examples using Angular are available at [angular.rdkitjs.com](https://angular.rdkitjs.com).

[Source code](https://github.com/rdkit/rdkit-js/tree/master/examples/angular)

## Usage in TypeScript

To see how to use RDKit.js with TypeScript, please go through the walkthrough [here](https://github.com/rdkit/rdkit-js/tree/master/typescript).

The full documentation related to type definitions is at [docs.rdkitjs.com](https://docs.rdkitjs.com/).

**Note**: This is still at an experimental stage.

## Contributing

You are welcome to contribute to [any GitHub issue](https://github.com/rdkit/rdkit-js/issues) currently open.

You are also welcome to [log any issue](https://github.com/rdkit/rdkit-js/issues/new/choose) or [start a discussion](https://github.com/rdkit/rdkit-js/discussions/new) on any topic related to RDKit.js.

To contribute to the plain javascript examples, read [this sub-repository README](https://github.com/rdkit/rdkit-js/tree/master/examples/javascript).

To contribute to the React.js examples, read [this sub-repository README](https://github.com/rdkit/rdkit-js/tree/master/examples/react).

To contribute to the Vue.js examples, read [this sub-repository README](https://github.com/rdkit/rdkit-js/tree/master/examples/vue).

To contribute to the Angular.js examples, read [this sub-repository README](https://github.com/rdkit/rdkit-js/tree/master/examples/angular).

## Release process

NPM releases are currently semi-automated with the following azure pipeline:

[https://dev.azure.com/rdkit-js/rdkit-js/\_build?definitionId=1](https://dev.azure.com/rdkit-js/rdkit-js/_build?definitionId=1)

Here are the guidelines to respect when releasing a new version of the package:

1. Always release a new package from the master branch
2. Use the following commit message format: "RDKit release \<version of the main rdkit release\>"

> Example commit message: "RDKit release 2022.3.3-1.0.0"

3. In Azure pipeline parameters, specify the RDKit version with underscores seperating major, minor, and patch version

> Example: 2022_03_3

4. In Azure pipeline parameters, specify the semver version with dots seperating major, minor, and patch version

> Example: 1.0.0

5. If you are releasing an official release, do not forget to uncheck the **Is beta?** checkbox in the Azure pipeline parameters.

### Important note on npm versioning

The scope of this repository goes beyond the release of the RDKit wasm core module. Other utilities may eventually be included on top of the core module in the RDKit.js npm release.

Because of that, we need a versioning system that will keep track of

1. The RDKit wasm core module version (exact match with its parent RDKit release)
2. Multiple npm release versions that can be published on top of a same wasm core module version.

With this in mind, we will attempt the following versioning scheme of the package:

1. For each RDKit release, a new version of the npm package will be released as <rdkit version>-<initial semver version>.
   > Example: when the 2022.03.3 version of RDKit is released, its first NPM release will be `2022.03.3-1.0.0`.
2. On each subsequent npm release using the same core module, only the semver version will be modified according to semver conventions.
   > Example: when a bug fix is made in a React component built on top of RDKit for version 2022.03.3, a new npm release `2022.03.3-1.0.1` will be published.
   > Example: when a new React component is built on top of RDKit for version 2022.03.3, a new npm release `2022.03.3-1.1.0` will be published.

## Website deployment

Website deployments for [rdkitjs.com](https://rdkitjs.com) are automated via [Vercel](https://vercel.com/) for each commit merged or pushed to the master branch.

Live demo URLs are also generated on each pull requests made to easily visualize changes before merging.

## Maintainers

- Michel Moreau [@MichelML](https://github.com/MichelML) & the RDKit community
