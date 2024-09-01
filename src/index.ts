import { setupDevtools } from './devtools'
import { isVue2 } from 'vue-demi'

const shouldInstall =
  process.env.NODE_ENV === 'development' || __VUE_PROD_DEVTOOLS__

let PluginInstall = {}

if (isVue2) {
  PluginInstall = {
    install(Vue: SafeAny) {
      shouldInstall &&
        Vue.mixin({
          beforeCreate() {
            setupDevtools(this)
          },
        })
    },
  }
} else {
  PluginInstall = {
    install(app: any) {
      shouldInstall && setupDevtools(app)
    },
  }
}

export default PluginInstall
