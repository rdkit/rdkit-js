import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {                                                                                                                                                                            
    fs: {                                                                                                                                                                              
      // We need to tell vite, that it is allowed to serve the RDKit wasm file from the parent 
      // directory. Otherwise, it would lead to an error like "The request url 
      // "{PATH}/rdkit-js/dist/esm/RDKit_minimal.wasm" is outside of Vite serving allow list.".
      // This is only needed for the dev server and production will work fine without this.                                                                                                           
      allow: ["../.."]
    }
  },
  build: {
    target: "esnext"
  }
});
