<template>
  <div id="component-example-substruct" class="container">
    <section class="hero">
      <div class="hero-body">
        <p class="title">Substructure Highlight</p>
        <p class="subtitle">
          You can also highlight substructure of molecules with both the SVG and
          Canvas APIs.
        </p>
      </div>
    </section>
    <div class="columns is-desktop">
      <div class="column" v-for="({ mol, qmol, svgMode }, idx) in molecules">
        <MoleculeStructure
          :id="`structure-example-multisubstruct-svg-${idx}`"
          :structure="mol"
          :subStructure="qmol"
          :width="350"
          :height="300"
          :svgMode="svgMode"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MoleculeStructure from "../MoleculeStructure.vue";

const molecules = [
  {
    mol: "CN1C=NC2=C1C(=O)N(C(=O)N2C)",
    qmol: "[N,n,O;!H0]",
    svgMode: true
  },
  {
    mol: "CC(=O)Oc1ccccc1C(=O)O",
    qmol: "CC(=O)Oc1ccccc1C",
    svgMode: false
  }
];
</script>
