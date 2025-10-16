// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined'
        }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/fonts', '@nuxtjs/apollo'],
  devServer: {
    port:  5300, // Use environment variable or default to 3003
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  apollo: {
    autoImports: true,
    authType: 'Bearer',
    authHeader: 'Authorization',
    tokenStorage: 'cookie',
    clients: {
      default: {
        httpEndpoint: 'http://localhost:9300/graphql'// https://spacex-production.up.railway.app, https://sqlite-872a.onrender.com/graphql
      }
    },
  },
  runtimeConfig: {
    public: {
      graphql: {
        endpoint: 'http://localhost:9300/graphql', //https://apollo.vuejs.org/guide-composable/mutation.html
        schema: {
          dev: process.env.NUXT_PUBLIC_GRAPHQL_SCHEMA_DEV || '',
        },
      },
    }
  }
})