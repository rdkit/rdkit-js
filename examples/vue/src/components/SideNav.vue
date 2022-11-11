<template>
  <template v-for="section of sections">
    <p class="menu-label">{{ section.name }}</p>
    <ul class="menu-list">
      <li v-for="child of section.children">
        <a
          :href="child.id"
          :class="activeLink === child.id ? 'is-active' : undefined"
          @click="activeLink = child.id"
          >{{ child.name }}</a
        >
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue";

let activeLink = ref("#component-introduction");

const sections = [
  {
    name: "General",
    children: [
      {
        id: "#component-introduction",
        name: "Introduction"
      },
      {
        id: "#component-example-list",
        name: "Overview"
      }
    ]
  },
  {
    name: "Components",
    children: [
      {
        id: "#component-example-moleculestructure",
        name: "MoleculeStructure"
      }
    ]
  },
  {
    name: "Examples",
    children: [
      {
        id: "#component-example-svg",
        name: "SVG Rendering"
      },
      {
        id: "#component-example-canvas",
        name: "Canvas Rendering"
      },
      {
        id: "#component-example-substruct",
        name: "Substructure Highlighting"
      },
      {
        id: "#component-example-multi-substruct",
        name: "Multi-Substructure Highlighting"
      },
      {
        id: "#component-example-substruct-search",
        name: "Substructure Search"
      },
      {
        id: "#component-example-drawing-options",
        name: "Additional Options"
      }
    ]
  },
  {
    name: "Other",
    children: [
      {
        id: "#other-examples-vanilla-js",
        name: "JavaScript Examples"
      },
      {
        id: "#other-examples-react",
        name: "React Examples"
      },
      {
        id: "#other-examples-angular",
        name: "Angular Examples"
      },
      {
        id: "#other-examples-legacy",
        name: "Legacy Examples"
      }
    ]
  }
];
</script>
