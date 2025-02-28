// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  plugins: [
    '~/plugins/toastify.ts',
    '~/plugins/nhost.ts',
    '~/plugins/dayjs.ts',
    '~/plugins/qrcode-reader.ts'
  ],
  runtimeConfig: {
    public: {
      NHOST_SUBDOMAIN: process.env.NUXT_PUBLIC_NHOST_SUBDOMAIN,
      NHOST_REGION: process.env.NUXT_PUBLIC_NHOST_REGION,
      NHOST_BACKEND_URL: process.env.NUXT_PUBLIC_NHOST_BACKEND_URL,
      NHOST_AUTH_URL: process.env.NUXT_PUBLIC_NHOST_AUTH_URL,
      NHOST_STORAGE_URL: process.env.NUXT_PUBLIC_NHOST_STORAGE_URL,
      NHOST_FUNCTIONS_URL: process.env.NUXT_PUBLIC_NHOST_FUNCTIONS_URL,
      NHOST_DASHBOARD_URL: process.env.NUXT_PUBLIC_NHOST_DASHBOARD_URL,
      NHOST_POSTGRES_URL: process.env.NUXT_PUBLIC_NHOST_POSTGRES_URL,
    },
  },
  build: {
    transpile: ['@headlessui/vue', 'dayjs', 'vue-router', 'vue3-toastify', 'vue-qrcode-reader', '@nhost/nhost-js', 'qrcode.vue']
  },
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false,
    tsConfig: {
      compilerOptions: {
        paths: {
          '@headlessui/vue': ['./node_modules/@headlessui/vue'],
          'dayjs': ['./node_modules/dayjs', './types/dayjs'],
          'vue-router': ['./node_modules/vue-router'],
          'vue3-toastify': ['./node_modules/vue3-toastify', './types/vue3-toastify'],
          'vue-qrcode-reader': ['./node_modules/vue-qrcode-reader', './types/vue-qrcode-reader'],
          '@nhost/nhost-js': ['./node_modules/@nhost/nhost-js', './types/nhost-js']
        }
      }
    }
  },
  vite: {
    optimizeDeps: {
      include: ['@headlessui/vue', 'dayjs', 'vue', 'vue-router', 'vue3-toastify', 'vue-qrcode-reader', '@nhost/nhost-js']
    },
    resolve: {
      alias: {
        '@headlessui/vue': '@headlessui/vue',
        'dayjs': 'dayjs',
        'vue-router': 'vue-router',
        'vue3-toastify': 'vue3-toastify',
        'vue-qrcode-reader': 'vue-qrcode-reader',
        '@nhost/nhost-js': '@nhost/nhost-js'
      }
    }
  },
  css: [
    'vue3-toastify/dist/index.css'
  ]
})
