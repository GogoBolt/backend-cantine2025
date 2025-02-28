declare module '#imports' {
  export { useRouter, useRoute } from 'vue-router'
  export { 
    useNuxtApp,
    defineNuxtPlugin,
    useRuntimeConfig,
    navigateTo,
    useAsyncData,
    useFetch,
    useHead,
    useState,
    useCookie,
    defineNuxtRouteMiddleware
  } from '#app'

  export type NavigationGuard = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized
  ) => NavigationGuardReturn | Promise<NavigationGuardReturn>

  export type NavigationGuardReturn =
    | void
    | Error
    | RouteLocationRaw
    | boolean
    | undefined
}
