import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { setContext } from '@apollo/client/link/context'


export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const httpLink = createHttpLink({
    uri: import.meta.client
         ? config.public.graphql.endpoint  // navigateur
         : 'http://nest_backend:9300/graphql' // SSR dans conteneur
  })

  const authLink = setContext((_, { headers }) => {
    const token = useCookie<string>('token')
    
    return {
      headers: {
        ...headers,
        Authorization: token.value ? `Bearer ${token.value}` : '',
      },
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
