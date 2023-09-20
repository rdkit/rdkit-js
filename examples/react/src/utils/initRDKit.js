const initRDKit = (() => {
  let globalObject = typeof window !== 'undefined' ? window : global;
  let rdkitLoadingPromise;
  let fallbackRemotePath = "https://unpkg.com/@rdkit/rdkit@2023.3.3";
  let packageVersion = "2023.3.3-1.0.0";
  
  return ({ parentObject, wasmLocation, disableRemoteLoading, reload } = {}) => {
    if (!rdkitLoadingPromise || reload) {
      rdkitLoadingPromise = new Promise((resolve, reject) => {
        const resolveRDKit = (RDKit) => {
          if (parentObject) {
            parentObject.RDKit = RDKit;
          } else {
            globalObject.RDKit = RDKit;
          }
          resolve(RDKit);
        };

        let locateFile = wasmLocation ? () => wasmLocation : undefined;
        let defaultLocateFile = () => `${fallbackRemotePath}@${packageVersion}/dist/RDKit_minimal.wasm`;
        globalObject
          .initRDKitModule({ locateFile })
          .then(resolveRDKit)
          .catch(() => {
            if (!disableRemoteLoading) {
              globalObject
                .initRDKitModule({locateFile})
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
