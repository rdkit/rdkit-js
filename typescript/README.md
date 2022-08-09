**Note**: The types provided with rdkit-js are manually maintained, but are intended to match and map all of its functionalities as much as possible. Please log any issue or bug if you encounter problems while using them.

# Example usage

## Initializing the RDKit module

```typescript
// Window is extended with the initRDKitModule<RDKitLoader> property
// the promise returns an RDKitModule type object

window
.initRDKitModule()
.then((instance: RDKitModule) => {
    // it is advised to assign the instance to window.RDKit
    window.RDKit = instance;
    return instance;
})

console.debug(window.RDKit.version());
```

## Declaring a custom named module on the Window object

```typescript
// initialize.ts
window
.initRDKitModule()
.then((instance: RDKitModule) => {
    window.MyCustomRDKit = instance;
    return instance;
})

// some_other_file.ts
declare global {
    interface Window {
        MyCustomRDKit: RDKitModule
    }
}

console.debug(window.MyCustomRDKit.version());
```

## Typing molecules

```typescript
let mol: JSMol;

// Window is by default extended with the RDKit<RDKitModule> property
// this can vary by implementation however, so it should not be depended on too much

if (window.RDKit)
{
    let smiles = "CC(=O)Oc1ccccc1C(=O)O";
    mol = window.RDKit.get_mol(smiles);
}

```

## Typing the Substructure Library

```typescript
let sslib: SubstructLibrary;

if (window.RDKit)
{
    sslib = new window.RDKit.SubstructLibrary();
}
```
