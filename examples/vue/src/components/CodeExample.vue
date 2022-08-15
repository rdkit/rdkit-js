<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">Code example</p>
        </header>
        <div class="card-content">
            <pre>
                <code>{{ source_code }}</code>
            </pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';


const props = defineProps<{
    component_name: string
}>()

let source_code = ref('')

onBeforeMount(async () => {
    // load default export of component as a string
    try
    {
        let { default: value } = await import(`./examples/${props.component_name}.vue?raw`)
        source_code.value = value
    }
    catch
    {
        let { default: value } = await import(`./${props.component_name}.vue?raw`)
        source_code.value = value
    }
})

</script>

<style>
.pointer-on-hover{
    cursor: pointer;
}
</style>