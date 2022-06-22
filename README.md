<br />
<p align="center">
  <a href="https://github.com/michelml/rdkit-js">
    <img src="rdkitjs_logo.png" alt="rdkit.js - Project Logo">
  </a>
  </p>
<br />
 
```
Please ⭐ this repo to show interest and support ongoing development!
```

# RDKit for JavaScript (Official)

[![Build Status](https://dev.azure.com/michmoreaul/rdkit-js/_apis/build/status/MichelML.rdkit-js?branchName=master)](https://dev.azure.com/michmoreaul/rdkit-js/_build/latest?definitionId=1&branchName=master)
[![Documentation Status](https://readthedocs.org/projects/rdkit/badge/?version=latest)](https://unpkg.com/@rdkit/rdkit/Code/MinimalLib/dist/GettingStartedInJS.html)
[![License](https://img.shields.io/github/license/rdkit/rdkit)](https://github.com/rdkit/rdkit/blob/master/license.txt)
[![DOI](https://zenodo.org/badge/10009991.svg)](https://zenodo.org/badge/latestdoi/10009991)  
[![NPM Latest Version](https://img.shields.io/npm/v/@rdkit/rdkit)](https://www.npmjs.com/package/@rdkit/rdkit)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/@rdkit/rdkit)](https://www.npmjs.com/package/@rdkit/rdkit)
[![NPM Monthly Downloads](https://img.shields.io/npm/dm/@rdkit/rdkit)](https://www.npmjs.com/package/@rdkit/rdkit)
[![NPM Yearly Downloads](https://img.shields.io/npm/dy/@rdkit/rdkit)](https://www.npmjs.com/package/@rdkit/rdkit)
[![NPM Total Downloads](https://img.shields.io/npm/dt/@rdkit/rdkit?label=total%20downloads)](https://www.npmjs.com/package/@rdkit/rdkit)

## Table of contents

- [RDKit for JavaScript (Official)](#rdkit-for-javascript-official)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Install](#install)
  - [Using the RDKit package assets](#using-the-rdkit-package-assets)
    - [Option 1: Use the npm package distribution files](#option-1-use-the-npm-package-distribution-files)
    - [Option 2: Use the remote distribution files from unpkg.com](#option-2-use-the-remote-distribution-files-from-unpkgcom)
  - [Running RDKit in your JavaScript code](#running-rdkit-in-your-javascript-code)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Releases](#releases)

## Introduction

**Note: This package should be considered experimental. The API is not yet stable and may change from release to release.**

RDKit-JS is the JavaScript distribution of cheminformatics functionality from the [RDKit](https://github.com/rdkit/rdkit) - a C++ library for cheminformatics.

The project is leveraging web assembly to rollout a subset of the RDKit functionality that is relevant in any javascript context. The WASM module bundled with this package is compiled directly from the RDKit source code.

The functionality included in RDKit-JS is decided by the RDKit community, thus if you use this package, your voice matters.

## Install

```bash
npm i @rdkit/rdkit
```

## Using the RDKit package assets

### Option 1: Use the npm package distribution files

Once you have the RDKit package installed in your node modules, copy the following distribution files anywhere in your deployed assets.

- `node_modules/@rdkit/rdkit/CodeMinimalLib/dist/RDKit_minimal.js`
- `node_modules/@rdkit/rdkit/CodeMinimalLib/dist/RDKit_minimal.wasm`

**NOTE: Both files must be copied at the same location in your deployed assets for the library to work properly.**

### Option 2: Use the remote distribution files from [unpkg.com](https://unpkg.com/)

- `https://unpkg.com/@rdkit/rdkit/Code/MinimalLib/dist/RDKit_minimal.js`
- `https://unpkg.com/@rdkit/rdkit/Code/MinimalLib/dist/RDKit_minimal.wasm`

## Running RDKit in your JavaScript code

To use RDKit, load the javascript file and instantiate the wasm module inside the `head` tag of your `index.html`, before you run your application code:

```html
<head>
  <!-- ...other files and HTML tags... -->
  <!-- Load the RDKit JS file -->
  <script src="https://unpkg.com/@rdkit/rdkit/Code/MinimalLib/dist/RDKit_minimal.js"></script>

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

## Usage

It is recommended to go through all the JavaScript examples available on the official website [rdkitjs.com](https://rdkitjs.com).

If you are using React.js, several additional examples using React.js are available at [react.rdkitjs.com](https://react.rdkitjs.com).

## Contributing

You are welcome to contribute to [any GitHub issue](https://github.com/MichelML/rdkit-js/issues) currently open.

You are also welcome to [log any issue](https://github.com/MichelML/rdkit-js/issues/new/choose) or [start a discussion](https://github.com/MichelML/rdkit-js/discussions/new) on any topic related to RDKit-JS.

To contribute to the plain javascript examples, read this (TBD).

To contribute to the React.js examples, read this (TBD).

## Releases

Npm releases are currently semi-automated with the following azure pipeline:

[https://dev.azure.com/michmoreaul/rdkit-js/\_build?definitionId=1](https://dev.azure.com/michmoreaul/rdkit-js/_build?definitionId=1)

Here are the guidelines to respect when releasing a new version of the package:

1. Always release a new package from the master branch
2. Use the following commit message format: "RDKit release \<version of the main rdkit release\>"

> Example commit message: "RDKit release 2022.3.3"

3. In Azure pipeline parameters, specify the RDKit version with underscores seperating major, minor, and patch version

> Example: 2022_03_3

4. If you are releasing an official release, do not forget to uncheck the **Is beta?** checkbox in the Azure pipeline parameters.
