<template>
  <div class="container">
    <button
      class="button is-primary is-light is-large is-fullwidth"
      aria-label="more options"
      @click="toggleCollapsible"
    >
      See Code example
    </button>
  </div>
  <div class="container">
    <div class="is-collapsible p-0" ref="collapsible">
      <highlightjs autodetect :code="source_code"></highlightjs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

const props = defineProps<{
  component_name: string;
}>();

let source_code = ref("");
let collapsible = ref<HTMLDivElement | null>(null);

onBeforeMount(async () => {
  // load default export of component as a string
  try {
    let { default: value } = await import(
      `./examples/${props.component_name}.vue?raw`
    );
    source_code.value = value;
  } catch {
    let { default: value } = await import(`./${props.component_name}.vue?raw`);
    source_code.value = value;
  }
});

function toggleCollapsible() {
  let style = collapsible.value?.style;

  if (style) {
    if (style.maxHeight) {
      style.maxHeight = "";
    } else {
      style.maxHeight = `${collapsible.value?.scrollHeight}px`;
    }
  }
}
</script>

<style>
.is-collapsible {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.p-0 pre {
  padding: 0;
}
</style>
