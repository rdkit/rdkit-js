<template>
  <div id="component-example-svg" class="container">
    <section class="hero">
      <div class="hero-body">
        <p class="title">SVG rendering</p>
        <p class="subtitle">You can render molecules using svg.</p>
      </div>
    </section>
  </div>
  <div class="columns is-desktop">
    <div class="column" v-for="(mol, idx) in molecules">
      <MoleculeStructure
        :id="`structure-example-svg-${idx}`"
        :structure="mol"
        :width="350"
        :height="300"
        svg-mode
      ></MoleculeStructure>
    </div>
  </div>
</template>

<script setup lang="ts">
import MoleculeStructure from "../MoleculeStructure.vue";

const molecules = ["CN1C=NC2=C1C(=O)N(C(=O)N2C)", "CC(=O)Oc1ccccc1C(=O)O"];
</script>
