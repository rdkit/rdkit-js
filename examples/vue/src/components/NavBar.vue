<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img alt="logo" src="/rdkitjs_cropped_200.png" />
      </a>

      <a
        role="button"
        :class="`navbar-burger ${burgerActiveClass}`"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        href="#/"
        @click="toggleBurger"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" :class="`navbar-menu ${burgerActiveClass}`">
      <div class="navbar-start">
        <a
          class="navbar-item"
          href="https://github.com/rdkit/rdkit-js/tree/master/examples/javascript"
          >Source code</a
        >
        <a class="navbar-item" href="https://docs.rdkitjs.com/">API Docs</a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="#/">Examples</a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="https://rdkitjs.com">Javascript</a>
            <a class="navbar-item" href="https://react.rdkitjs.com">React</a>
            <a class="navbar-item is-active" href="https://vue.rdkitjs.com"
              >Vue</a
            >
            <a class="navbar-item" href="https://angular.rdkitjs.com"
              >Angular</a
            >
            <hr class="navbar-divider" />
            <a
              class="navbar-item"
              href="https://github.com/rdkit/rdkit-js#contributing"
              >Contribute</a
            >
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a
              data-tooltip="Go to main RDKit project"
              class="button has-tooltip-bottom is-white is-big"
              href="https://github.com/rdkit/rdkit"
            >
              <span class="icon">
                <img alt="RDKit Logo" src="/rdkit.png" />
              </span>
            </a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a
              data-tooltip="Go to RDKit.js"
              class="button has-tooltip-bottom is-white is-big"
              href="https://github.com/rdkit/rdkit-js"
            >
              <span class="icon">
                <i class="fab fa-github fa-2x"></i>
              </span>
            </a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="buttons mr-6">
            <a
              data-tooltip="Go to NPM package"
              class="button has-tooltip-bottom is-white is-big"
              href="https://www.npmjs.com/package/@rdkit/rdkit"
            >
              <span class="icon">
                <i class="fab fa-npm fa-2x"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

let burgerActive = ref(false);

let burgerActiveClass = computed(() => {
  return burgerActive ? "is-active" : "";
});

function toggleBurger() {
  burgerActive.value = !burgerActive.value;
}
</script>

<style scoped>
.navbar {
  padding: 12px 0;
}

.navbar-brand {
  padding: 6px;
}
</style>
