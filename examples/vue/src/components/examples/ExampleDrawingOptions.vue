<template>
  <div id="component-example-drawing-options" class="container">
    <section class="hero">
      <div class="hero-body">
        <p class="title">Additional Drawing Options</p>
        <p class="subtitle column is-two-thirds pl-0">
          RDKit.js provides you a lot of options for drawing molecules. Checkout
          the
          <a href="https://rdkitjs.com#drawing-molecules-all-options">
            JavaScript examples
          </a>
          for the full list of available options.
        </p>
      </div>
    </section>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Main structure</label>
          <div class="control">
            <input
              v-model="userInput.mainStructureInput"
              class="input"
              placeholder="Enter a SMILES string here..."
            />
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Substructure</label>
          <div class="control">
            <input
              v-model="userInput.subStructureInput"
              class="input"
              placeholder="Enter a SMILES or SMARTS string here..."
            />
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Legend</label>
          <div class="control">
            <input
              v-model="userInput.legend"
              class="input"
              placeholder="Add a legend here..."
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Legend font size</label>
          <div class="control">
            <input
              v-model.number="userInput.legendFontSize"
              class="input"
              type="number"
              placeholder="Add a font size..."
            />
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Width</label>
          <div class="control">
            <input
              v-model.number="userInput.width"
              class="input"
              type="number"
              placeholder="Width"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Height</label>
          <div class="control">
            <input
              v-model.number="userInput.height"
              class="input"
              type="number"
              placeholder="Height"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Bond line width</label>
          <div class="control">
            <input
              v-model.number="userInput.bondLineWidth"
              class="input"
              type="number"
              placeholder="Bond line width"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Annotation font scale</label>
          <div class="control">
            <input
              v-model.number="userInput.annotationFontScale"
              class="input"
              type="number"
              step="0.1"
              placeholder="Annotation font scale"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Rotate</label>
          <div class="control">
            <input
              v-model.number="userInput.rotate"
              class="input"
              type="number"
              step="0.5"
              placeholder="Rotate"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Stereo-annotation</label>
          <div class="control">
            <input
              v-model="userInput.addStereoAnnotation"
              class="checkbox"
              type="checkbox"
              placeholder="Stereo-annotation"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Atom indices</label>
          <div class="control">
            <input
              v-model="userInput.addAtomIndices"
              class="checkbox"
              type="checkbox"
              placeholder="Atom Indices"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Bond indices</label>
          <div class="control">
            <input
              v-model="userInput.addBondIndices"
              class="checkbox"
              type="checkbox"
              placeholder="Bond Indices"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Explicit Methyl</label>
          <div class="control">
            <input
              v-model="userInput.explicitMethyl"
              class="checkbox"
              type="checkbox"
              placeholder="Explicit Methyl"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Scale bond width</label>
          <div class="control">
            <input
              v-model="userInput.scaleBondWidth"
              class="checkbox"
              type="checkbox"
              placeholder="Scale bond width"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Center molecule</label>
          <div class="control">
            <input
              v-model="userInput.centreMoleculesBeforeDrawing"
              class="checkbox"
              type="checkbox"
              placeholder="Center molecule"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Comic mode</label>
          <div class="control">
            <input
              v-model="userInput.comicMode"
              class="checkbox"
              type="checkbox"
              placeholder="Comic mode"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Highlight Colour</label>
          <div class="control">
            <input
              v-model="userInput.highlightColour"
              class="input"
              type="color"
              placeholder="Highlight Colour"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Background Colour (canvas only)</label>
          <div class="control">
            <input
              v-model="userInput.backgroundColour"
              class="input"
              type="color"
              placeholder="Background Colour"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Legend Colour</label>
          <div class="control">
            <input
              v-model="userInput.legendColour"
              class="input"
              type="color"
              placeholder="Legend Colour"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Symbol Colour</label>
          <div class="control">
            <input
              v-model="userInput.symbolColour"
              class="input"
              type="color"
              placeholder="Symbol Colour"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">
            SVG/Canvas Rendering (Uncheck for canvas rendering)
          </label>
          <div class="control">
            <input
              v-model="userInput.svgMode"
              class="checkbox"
              type="checkbox"
              placeholder="SVG mode"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column" :style="{ margin: '12px 12px' }">
        <div
          :style="{
            width: width + 12,
            height: height + 12,
            border: '1px solid rgba(0,0,0,.1)',
            borderRadius: '2px'
          }"
        >
          <MoleculeStructure
            id="structure-example-drawing-options"
            :structure="userInput.mainStructureInput"
            :subStructure="userInput.subStructureInput"
            :drawingDelay="200"
            :width="width"
            :height="height"
            :svg-mode="userInput.svgMode"
            :extraDetails="rendering"
          ></MoleculeStructure>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import MoleculeStructure from "../MoleculeStructure.vue";
import hexRgb from "hex-rgb";

// initial values, linked to input fields
let userInput = reactive({
  mainStructureInput:
    "CSCC[C@H](NC(=O)[C@H](CC1=CNC2=C1C=CC=C2)NC(=O)CCNC(=O)OC(C)(C)C)C(=O)N[C@@H](CC(O)=O)C(=O)N[C@@H](CC1=CC=CC=C1)C(N)=O",
  subStructureInput: "[n,O]",
  legend: "Legend Text",
  legendFontSize: 16,
  width: 500,
  height: 450,
  bondLineWidth: 1,
  scaleBondWidth: false,
  addStereoAnnotation: true,
  addAtomIndices: true,
  addBondIndices: false,
  explicitMethyl: true,
  centreMoleculesBeforeDrawing: false,
  highlightColour: "#fd5c63",
  legendColour: "#000000",
  symbolColour: "#000000",
  backgroundColour: "#ffffff",
  rotate: 0.0,
  annotationFontScale: 0.5,
  comicMode: false,
  svgMode: true
});

// computed values with sane default values used for rendering
let width = computed(() => userInput.width || 250);
let height = computed(() => userInput.height || 250);

// object to be injected as extra details
let rendering = reactive({
  // set sane default for some values
  bondLineWidth: computed(() => userInput.bondLineWidth || 1),
  rotate: computed(() => userInput.rotate || 0.0),
  annotationFontScale: computed(() => userInput.annotationFontScale || 0.5),
  legend: computed(() => userInput.legend || ""),
  legendFontSize: computed(() => userInput.legendFontSize || 16),
  // calculate color values
  highlightColour: computed(() => convertHexToRgb(userInput.highlightColour)),
  legendColour: computed(() => convertHexToRgb(userInput.legendColour)),
  backgroundColour: computed(() => convertHexToRgb(userInput.backgroundColour)),
  symbolColour: computed(() => convertHexToRgb(userInput.symbolColour)),
  // boolean values
  addStereoAnnotation: computed(() => userInput.addStereoAnnotation || false),
  addAtomIndices: computed(() => userInput.addAtomIndices || false),
  addBondIndices: computed(() => userInput.addBondIndices || false),
  explicitMethyl: computed(() => userInput.explicitMethyl || false),
  centreMoleculesBeforeDrawing: computed(
    () => userInput.centreMoleculesBeforeDrawing || false
  ),
  scaleBondWidth: computed(() => userInput.scaleBondWidth || false),
  svgMode: computed(() => userInput.svgMode || false),
  comicMode: computed(() => userInput.comicMode || false),
  clearBackground: true
});

/**
 * the RDKit parser expects a 3 value number array for color
 * use this to convert the hex values
 * @param hex a hex string
 */
function convertHexToRgb(hex: string) {
  let numberArray = hexRgb(hex, { format: "array" }).map((value) => {
    return parseFloat((value / 255).toFixed(2));
  });
  return numberArray.slice(0, 3);
}
</script>

<style>
.columns {
  margin: 12px 0;
}
</style>
