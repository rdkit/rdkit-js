<template>
  <div id="component-example-substruct-search" class="container">
    <section class="hero">
      <div class="hero-body">
        <p class="title">Substructure match</p>
        <p class="subtitle">You can perform client-side substructure match.</p>
      </div>
    </section>
    <div class="columns" :style="{ margin: '12px 0' }">
      <div class="column">
        <div class="field">
          <div class="control has-icons-left">
            <input
              class="input"
              type="email"
              placeholder="Enter a SMARTS or SMILES string here..."
              v-model="searchValue"
            />
            <span key="search-input-icon" class="icon is-small is-left">
              <i
                :class="
                  searching ? 'fas fa-circle-notch fa-spin' : 'fas fa-search'
                "
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-multiline" :style="{ margin: '12px' }">
      <template v-if="matches.length > 0">
        <div class="column" v-for="smiles in matches">
          <MoleculeStructure
            :id="smiles"
            :structure="smiles"
            :subStructure="searchValue"
            :height="200"
            :width="200"
            svg-mode
          ></MoleculeStructure>
        </div>
      </template>
      <p v-else>Input is either invalid or no matches were found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import MoleculeStructure from "../MoleculeStructure.vue";
import { SMILES_LIST } from "../../utils/smiles";
import { reactive, ref, watch } from "vue";
import debounce from "debounce";
import { JSMol } from "../../../../../typescript";

let searching = ref(false);
let searchValue = ref("");
let matches = reactive<string[]>([...SMILES_LIST]);

const noMatchLength = 2;

function updateMatches(list: string[]) {
  matches.length = 0;
  matches.push(...list);
}

function performSearch() {
  // start search
  searching.value = true;

  if (!searchValue.value) {
    searching.value = false;
    updateMatches(SMILES_LIST);
    return;
  }

  const qmol = window.RDKit.get_qmol(searchValue.value);
  let results: string[] = [];
  if (!!qmol) {
    // if the query is a valid SMARTS, we can use the substructure search
    const results = SMILES_LIST.filter((smiles: string) => {
      // only return those from the list that match the query
      const mol = window.RDKit.get_mol(smiles);
      const hasMatch = !!mol && mol.get_substruct_match(qmol).length > 0;
      mol?.delete();
      return hasMatch;
    });

    qmol?.delete();

    // replace search results
    updateMatches(results);

    // finish search
    searching.value = false;
  } else {
    results = []
  }

  qmol?.delete();

  // replace search results
  updateMatches(results);

  // finish search
  searching.value = false;
}

const debouncedSearch = debounce(performSearch, 300);

watch(searchValue, debouncedSearch);
</script>
