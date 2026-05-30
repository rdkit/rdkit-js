import initRDKitModule from "./index";

export type * from "./generated/RDKit_minimal_esm";

export const RDKit = await initRDKitModule();