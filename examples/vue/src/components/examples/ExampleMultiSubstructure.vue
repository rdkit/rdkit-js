<template>
  <div id="component-example-multi-substruct" class="container">
    <section class="hero">
      <div class="hero-body">
        <p class="title">Multi-substructure Highlight</p>
        <p class="subtitle">
          You can also highlight multiple substructures of molecules with
          SMILES, SMARTS and a combination of the two with dot notation.
        </p>
      </div>
    </section>
    <div class="columns is-desktop">
      <div class="column" v-for="({ mol, qmol }, idx) in molecules">
        <MoleculeStructure
          :id="`structure-example-multisubstruct-svg-${idx}`"
          :structure="mol"
          :subStructure="qmol"
          :width="350"
          :height="300"
          svgMode
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
    qmol: "[N,n,o,O]"
  },
  {
    mol: "CC(=O)Oc1ccccc1C(=O)O",
    qmol: "[O,o].c1ccccc1"
  }
];
</script>
