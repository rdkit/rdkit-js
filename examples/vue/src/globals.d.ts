import { RDKitModule } from "../../../typescript";

export {};

declare global {
  interface Window {
    RDKit: RDKitModule;
  }
}
