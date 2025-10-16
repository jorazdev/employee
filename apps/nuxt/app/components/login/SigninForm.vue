<script setup lang="ts">

import Input from '~/components/form/Input.vue'
import useUser from '~/composables/user';
import Button from '~/components/form/Button.vue'
const { signinForm, onSignin} = useUser()
</script>

<template>
    <div class="mt-10 w-full">
        <h1 class="text-4xl text-center mb-10">Sign in</h1>
        <form class="flex flex-col space-y-4 mt-10" 
            @submit.prevent="onSignin">
            <Input v-model="signinForm.email" title="Identity"/>
            <Input v-model="signinForm.password" title="Password" type="password"/>
            <Button type="submit"
                icon="key"
                title="Login"
                class="px-4 py-2 rounded-lg bg-lime-400 font-bold mt-3"/>
        </form>
    </div>
</template>

<style lang="scss" scoped>

</style>