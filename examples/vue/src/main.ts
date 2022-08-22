import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "highlight.js/styles/a11y-dark.css";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";

createApp(App).use(hljsVuePlugin).mount("#app");
