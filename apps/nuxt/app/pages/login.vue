<script setup lang="ts">
import LoginRight from '~/components/login/LoginRight.vue';
definePageMeta({
  middleware: (to, from) => {
    const token = useCookie<string>('token')
    if(token.value){
      return navigateTo('/dashboard')
    }
  }
})

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full h-screen bg-[#EAEAE0]/20">
        <section class="grid grid-cols-2 w-full h-full">
          <div class="flex flex-col items-center justify-center bg-[#2B2B2B] space-y-5">
            <h1 class="text-5xl font-bold text-center text-white">Welcome to employee absence management</h1>
            <h1 class="text-5xl font-bold text-center text-[#D3FF2A]">Nuxt 4 & GraphQL(NestJS)</h1>
          </div>
            <LoginRight/>
        </section>
    </div>
</template>

<style lang="css" scoped>

</style>