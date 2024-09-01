import { createApp } from 'vue'
import type { ObjectPlugin } from 'vue'
import ElementCounterVue3 from 'vue-devtools-plugin-element-counter'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementCounterVue3 as ObjectPlugin)
app.mount('#app')
