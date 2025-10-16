
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie<string>('token')
    
    if (!token.value) {
      return navigateTo('/login')
    }
  })
  