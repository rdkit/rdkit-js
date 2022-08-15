**Note 1**: The types provided with rdkit-js are manually maintained, but are intended to match and map all of its functionalities as much as possible. Please log any issue or bug if you encounter problems while using them.

**Note 2**: This is still very early stage. Types from RDKit.js should be considered experimental.

# Example usage

The following is a walkthrough on how to setup RDKit.js in Typescript.

## Step 1 - Declare the RDKitModule property

Declare where your final RDKit module will reside on your window object (or other object).

This is usually done at the root of your project.

```typescript
declare global {
    interface Window {
        RDKit: RDKitModule
    }
}

```

Here we chose `RDKit` as the window property, but you can choose any name you want.

## Step 2 - Load the RDKit module with window.initRDKitModule

Window is extended with the initRDKitModule property, typed as a Promise returning an RDKitModule.

```typescript
window
.initRDKitModule()
.then((instance: RDKitModule) => {
    // window.RDKit is loaded and will be typed as RDKitModule
    window.RDKit = instance;
    return instance;
})
```

## Step 3 - Manipulating typed molecules

Now, calling `window.RDKit.get_mol` will return a molecule object typed as `JSMol`.

```typescript
const smiles = "CC(=O)Oc1ccccc1C(=O)O";

// The type of mol will be JSMol because of the signature of `get_mol` in our TypeScript definitions.
const firstMolecule = window.RDKit.get_mol(smiles);

// You can assign the type explicitly to the mol object if you want
const secondMolecule: JSMol = window.RDKit.get_mol(smiles);
```

## Step 4 - Instantiating a substructure library

Instantiating a substructure library with `new window.RDKit.SubStructLibrary` will also return an object of type `SubstructLibrary`.

```typescript

// The type of sslib will be SubstructLibrary because we declared a constructor interface for the SubstructLibrary interface in our TypeScript definitions.
const sslib = new window.RDKit.SubstructLibrary();

// You can assign the type explicitly to the substructure library object if you want
const sslib2: SubstructLibrary = new window.RDKit.SubstructLibrary();
```

# Full type definitions

You can see all type definitions at [docs.rdkitjs.com](https://docs.rdkitjs.com).
