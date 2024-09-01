import Vue from 'vue'
import type { PluginObject } from 'vue'
import App from './App.vue'
import ElementCounterVue2 from 'vue-devtools-plugin-element-counter'

Vue.use(ElementCounterVue2 as PluginObject<never>)
new Vue({
  render: h => h(App),
}).$mount('#app')
