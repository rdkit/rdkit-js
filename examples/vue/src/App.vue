<template>
  <!-- Try to stick as close to the react example design as possible -->
  <div id="app">
    <div id="navbar">
      <!-- Put navbar component here -->
      <NavBar/>
    </div>
    <section id="page-content" class="main-content columns is-fullheight">
      <aside id="side-navigation" class="menu has-background-white-bis is-narrow-mobile is-fullheight section is-hidden-mobile">
      <!-- Put side navigation component here -->
      <SideNav/>
      </aside>
      <div class="container column is-10">
        <!-- Put main components here -->
        <Introduction/>
        <template v-for="e in examples">
          <component :is="e.component"></component>
          <CodeExample :component_name="e.name"></CodeExample>
        </template>
        <section class="hero">
          <div class="hero-body">
            <p class="title" id="other-examples">Where to go next</p>
            <p id="other-examples-vanilla-js" class="subtitle column is-two-thirds pl-0">
              You can visit the JavaScript examples
              <a href="https://rdkitjs.com">here</a>, which presents the
              low-level API of RDKit.js.
            </p>
            <p id="other-examples-legacy" class="subtitle column is-two-thirds pl-0">
              You can also checkout the legacy
              <a href="https://unpkg.com/@rdkit/rdkit/dist/GettingStartedInJS.html">getting started</a>
              and
              <a href="https://unpkg.com/@rdkit/rdkit/dist/demo.html">demo</a>.
            </p>
          </div>
        </section>
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>RDKit.js</strong> by
          <a href="https://github.com/rdkit/rdkit">Greg Landrum and the RDKit contributors</a>. The source code is licensed
          <a href="https://github.com/rdkit/rdkit/blob/master/license.txt">BDS-3</a>.
        </p>
      </div>
    </footer>
    <a class="back_to_top" href="#navbar">&uarr;</a>
  </div>
</template>

<script setup lang="ts">
import Introduction from './components/Introduction.vue';
import SideNav from './components/SideNav.vue';
import NavBar from './components/NavBar.vue';
import ExampleList from './components/examples/ExampleList.vue';
import CodeExample from './components/CodeExample.vue';
import ExampleMoleculeStructure from './components/examples/ExampleMoleculeStructure.vue';

const examples = [
  {
    name: 'ExampleList',
    component: ExampleList
  },
  {
    name: 'MoleculeStructure',
    component: ExampleMoleculeStructure
  }
]

</script>

<style>

#page-content {
  padding-left: 12px;
}

#side-navigation {
  position: sticky;
  display: inline-block;
  max-height: 100vh;
  top: 0;
  box-shadow: 3px 0px 0 0 #f5f5f5;
}

.back_to_top {
  position: fixed;
  bottom: 80px;
  right: 40px;
  z-index: 9999;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #f5f5f5;
  color: #444;
  cursor: pointer;
  border-radius: 2px;
  display: block;
}

.back_to_top:hover {
  background: #e9ebec;
}

</style>
