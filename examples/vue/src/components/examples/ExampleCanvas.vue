<template>
  <div id="component-example-canvas" class="container">
    <section class="hero">
      <div class="hero-body">
        <p class="title">Canvas rendering</p>
        <p class="subtitle">
          You can also render molecules using the HTML Canvas API.
        </p>
      </div>
    </section>
  </div>
  <div class="columns is-desktop">
    <div class="column" v-for="(mol, idx) in molecules">
      <MoleculeStructure
        :id="`structure-example-canvas-${idx}`"
        :structure="mol"
        :width="350"
        :height="300"
      ></MoleculeStructure>
    </div>
  </div>
</template>

<script setup lang="ts">
import MoleculeStructure from "../MoleculeStructure.vue";

const molecules = ["CN1C=NC2=C1C(=O)N(C(=O)N2C)", "CC(=O)Oc1ccccc1C(=O)O"];
</script>
