/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NUXT_PUBLIC_NHOST_SUBDOMAIN?: string
    NUXT_PUBLIC_NHOST_REGION?: string
    NUXT_PUBLIC_NHOST_BACKEND_URL?: string
    NUXT_PUBLIC_NHOST_AUTH_URL?: string
    NUXT_PUBLIC_NHOST_STORAGE_URL?: string
    NUXT_PUBLIC_NHOST_FUNCTIONS_URL?: string
    NUXT_PUBLIC_NHOST_DASHBOARD_URL?: string
    NUXT_PUBLIC_NHOST_HASURA_GRAPHQL_JWT_SECRET?: string
    NUXT_PUBLIC_NHOST_MAILHOG_URL?: string
    NUXT_PUBLIC_NHOST_POSTGRES_URL?: string
    APP_TITLE?: string
    APP_DESCRIPTION?: string
    APP_LOGO?: string
    BASE_URL?: string
    PORT?: string
  }
}
