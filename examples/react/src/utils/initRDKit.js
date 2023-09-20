// /**
//  * Pure JS context
//  */
// import {initRDKit} from '@rdkit/rdkit';

// initRDKit().then((RDKit) => {
//   // ...start using RDKit...

// });


// /**
//  * React context
//  */
// import {MoleculeStructure} from '@rdkit/rdkit';

// ...start using RDKit...

/**
 * Utility function ensuring there's only one call made to load RDKit
 * It returns a promise with the resolved RDKit API as value on success,
 * and a rejected promise with the error on failure.
 *
 * The RDKit API is also attached to the global object on successful load.
 */
const initRDKit = (() => {
  let globalObject = typeof window !== 'undefined' ? window : global;
  let rdkitLoadingPromise;

  return ({ parentObject, wasmLocation, disableRemoteLoading, refresh } = {}) => {
    if (!rdkitLoadingPromise || refresh) {
      rdkitLoadingPromise = new Promise((resolve, reject) => {
        const resolveRDKit = (RDKit) => {
          if (parentObject) {
            parentObject.RDKit = RDKit;
          } else {
            globalObject.RDKit = RDKit;
          }
          resolve(RDKit);
        };

        globalObject.initRDKitModule(wasmLocation ? { locateFile: () => wasmLocation } : undefined)
          .then(resolveRDKit)
          .catch(() => {
            if (!disableRemoteLoading) {
              globalObject
                .initRDKitModule({
                  locateFile: (defaultWasmLocation) => `https://unpkg.com/@rdkit/rdkit@2023.3.3-1.0.0/dist/RDKit_minimal.wasm`,
                })
                .then(resolveRDKit)
                .catch(reject);
            } else {
              reject(new Error('RDKit could not be loaded'));
            }
          });
      });
    }

    return rdkitLoadingPromise;
  };
})();

export default initRDKit;
