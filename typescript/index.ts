import initRDKitModuleOriginal, {
  RDKitLoaderOptions,
  RDKitModule,
} from "./generated/RDKit_minimal_esm";

export type * from "./generated/RDKit_minimal_esm";

let rdkitModule: RDKitModule | null = null;
let rdkitError: any = null;

export default function initRDKitModule(options?: RDKitLoaderOptions): Promise<RDKitModule> {
  if (rdkitModule) {
      // Module is already initialized, return it
      return Promise.resolve(rdkitModule);
  } else if (rdkitError) {
      // Previous initialization attempt failed, return the error
      return Promise.reject(rdkitError);
  } else {
      // Initialize the RDKit module. 
    return initRDKitModuleOriginal(options)
      .then((module) => {
        rdkitModule = module;
        return rdkitModule;
      })
      .catch((error) => {
        rdkitError = error;
        throw error;
      });
  }
};


