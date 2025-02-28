declare module '#imports' {
  export * from '@nuxt/schema'
  export { useNuxtApp, navigateTo } from 'nuxt/app'
}

declare module '#app' {
  export * from '@nuxt/schema'
}

declare module 'nuxt/app' {
  export * from '@nuxt/schema'
}
