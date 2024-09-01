import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({}) => {
  return {
    plugins: [vue()],
    base: '/target',
    build: {
      rollupOptions: {
        input: {
          target: resolve(__dirname, 'target.html'),
        },
      },
    },
    define: {
      __VUE_PROD_DEVTOOLS__: 'true',
    },
    server: {
      port: 3001,
      open: 'http://localhost:3001',
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
      port: 4001,
      open: 'http://localhost:4001',
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
