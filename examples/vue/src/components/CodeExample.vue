<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">See code example</p>
            <a href="#collapsible-card" data-action="collapse" class="card-header-icon">
                <span class="icon">
                    <i class="fas fa-angle-down"></i>
                </span>
            </a>
        </header>
        <div id="collapsible-card" class="is-collapsible">
            <div class="card-content">
                <ssh-pre language="js" label="Vue template" reactive copy-button>
                    <template #copy-button>
                        <span class="pointer-on-hover">
                            <i class="fas fa-copy"></i> Copy
                        </span>
                    </template>
                    {{ source_code }}
                </ssh-pre>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
// load syntax highlighter js and css
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
// load collapsible js and css
import bulmaCollapsible from '@creativebulma/bulma-collapsible';
import '@creativebulma/bulma-collapsible/dist/css/bulma-collapsible.min.css';


const props = defineProps<{
    component_name: string
}>()

let source_code = ref('')
let collapsibles: any;

onMounted(() => {
    // instantiate collapsible instances
    collapsibles = bulmaCollapsible.attach()
})

onBeforeMount(async () => {
    // load default export of component as a string
    let { default: value } = await import(`./examples/${props.component_name}.vue?raw`)
    source_code.value = value
})

</script>

<style>
.pointer-on-hover{
    cursor: pointer;
}
</style>