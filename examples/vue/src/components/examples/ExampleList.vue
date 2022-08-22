<template>
  <div id="component-example-list" class="container">
    <section class="hero">
      <div class="hero-body">
        <p class="title">Overview</p>
        <p class="subtitle">
          You can draw any molecule from SMILES dynamically with RDKit.js.
        </p>
      </div>
    </section>
    <div id="structure-list" class="columns is-desktop">
      <div class="column" v-for="smiles in SMILES_LIST">
        <MoleculeStructure
          :id="smiles"
          :structure="smiles"
          :height="200"
          :width="200"
          svg-mode
        ></MoleculeStructure>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MoleculeStructure from "../MoleculeStructure.vue";
import { SMILES_LIST } from "../../utils/smiles";
</script>

<style scoped>
#structure-list {
  margin: 12px;
  overflow-x: scroll;
}
</style>
