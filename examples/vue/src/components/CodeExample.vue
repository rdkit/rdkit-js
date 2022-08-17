<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">Code example</p>
            <button class="card-header-icon" aria-label="more options" @click="toggleCollapsible">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </header>
        <div class="card-content">
            <div class="content is-collapsible" ref="collapsible">
                <highlightjs
                    autodetect
                    :code="source_code"
                ></highlightjs>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';


const props = defineProps<{
    component_name: string
}>()

let source_code = ref('')
let collapsible = ref<HTMLDivElement | null>(null)

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

function toggleCollapsible()
{
    let style = collapsible.value?.style

    if (style)
    {
        if (style.maxHeight)
        {
            style.maxHeight = '';
        }
        else
        {
            style.maxHeight = `${collapsible.value?.scrollHeight}px`
        }
    }
}

</script>

<style>
.is-collapsible{
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
}
</style>