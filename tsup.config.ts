import fs from "fs";
import { defineConfig } from "tsup";

export default defineConfig(
  [
    {
      entry: ["typescript/index.ts", "typescript/es.ts"],
      format: ["esm"],
      tsconfig: "tsconfig.esm.json",
      dts: true,
      shims: true,
      clean: true,
      sourcemap: true,
      outDir: "dist/esm",
      async onSuccess() {
        fs.copyFileSync(
          "typescript/generated/RDKit_minimal.wasm",
          "dist/esm/RDKit_minimal.wasm"
        );
      }
    },
    {
      entry: ["typescript/index.ts"],
      format: ["cjs"],
      tsconfig: "tsconfig.cjs.json",
      dts: true,
      shims: true,
      clean: true,
      sourcemap: true,
      outDir: "dist",
      async onSuccess() {
        fs.copyFileSync(
          "typescript/generated/RDKit_minimal.wasm",
          "dist/RDKit_minimal.wasm"
        );
      }
    }
  ]
);
