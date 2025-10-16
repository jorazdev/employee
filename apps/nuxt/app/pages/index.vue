<script setup lang="ts">
import Button from '~/components/form/Button.vue'

</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen w-full p-4 bg-[#F1F1F1]">
        <div class="w-full max-w-7xl rounded-lg p-6 
            flex flex-col items-center justify-center space-y-4">
            <h1 class="text-5xl font-bold ">Welcome to employee absence management</h1>
            <NuxtLink to="/login">
                <Button icon="login" title="Login" className="px-5 py-1 bg-[#D3FF2A] rounded-2xl"/>
            </NuxtLink>
        </div>
    </div>
    
</template>

<style lang="css" scoped>

</style>