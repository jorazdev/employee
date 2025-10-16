<script setup lang="ts">
import useLogin from '~/composables/login';

const { componentFormSelected, titleSelected, onSelectForm } = useLogin()

//const component = computed(() => componentFormSelected.value)

watch(() => titleSelected, value => {
    console.log('value')
})
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <section class="flex gap-2">
            <button class="text-white px-4 py-2 rounded-lg cursor-pointer" 
                :class="titleSelected === 'Sign in' ? 'bg-blue-400': 'bg-black'" 
                @click="onSelectForm('Sign in')">
                Sign in
            </button>
            <button class="text-white px-4 py-2 rounded-lg cursor-pointer" 
                :class="titleSelected === 'Sign up' ? 'bg-blue-400': 'bg-black'" 
                @click="onSelectForm('Sign up')">
                Sign up
            </button>
            
        </section>
        <section v-if="componentFormSelected"
            class="relative w-full px-[20%]">
            <FadeTransition>
                <component :is="componentFormSelected"/>
            </FadeTransition>
        </section>
    </div>
</template>
