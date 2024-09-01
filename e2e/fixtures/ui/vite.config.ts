import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({}) => {
  return {
    plugins: [vue(), vueJsx()],
    base: '/target',
    build: {
      rollupOptions: {
        input: {
          target: resolve(__dirname, 'target.html'),
          targetIframe: resolve(__dirname, 'target-iframe.html'),
        },
      },
    },
    define: {
      __VUE_PROD_DEVTOOLS__: 'true'
    },
    server: {
      port: 3000,
      open: 'http://localhost:3000',
      proxy: {
        '/': {
          target: 'http://localhost:50709',
          bypass: req => {
            if (req?.url?.startsWith('/target')) {
              return req.url
            }
          },
        },
      },
    },
    preview: {
      port: 4000,
      open: 'http://localhost:4000',
      proxy: {
        '/': {
          target: 'http://localhost:50709',
          bypass: req => {
            if (req?.url?.startsWith('/target')) {
              return req.url
            }
          },
        },
      },
    },
  }
})
