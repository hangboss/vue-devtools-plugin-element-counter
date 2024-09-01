import { createApp } from 'vue'
import type { ObjectPlugin } from 'vue'
import ElementCounterVue3 from 'vue-devtools-plugin-element-counter'
import IframeApp from './IframeApp.vue'

const app = createApp(IframeApp)
app.use(ElementCounterVue3 as ObjectPlugin)
app.mount('#app')
