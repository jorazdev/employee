<script setup lang="ts">

import Input from '~/components/form/Input.vue'
import useUser from '~/composables/user'
import Button from '~/components/form/Button.vue'

const { signupForm, onSignup } = useUser()
const { data }:any = await useFetch('https://randomuser.me/api/?results=1')
// https://fakestoreapi.com/products
//console.log(data)
signupForm.value.firstName = data.value.results[0].name.first 
signupForm.value.lastName = data.value.results[0].name.last 
signupForm.value.email = data.value.results[0].email
signupForm.value.avatarUrl = data.value.results[0].picture.large
signupForm.value.password = "123"
</script>

<template>
    <div class="mt-10">
        <div class="flex flex-col items-center justify-center mb-5 space-y-3">
            <h1 class="text-4xl text-center">Sign up</h1>
            <img :src="signupForm.avatarUrl" class="w-20 h-20 bg-cover rounded-full border-2 border-black">
        </div>
        <form class="flex flex-col space-y-4 w-full" 
            @submit.prevent="onSignup">
            <Input v-model="signupForm.firstName" title="First Name" />
            <Input v-model="signupForm.lastName" title="Last Name"/>
            <Input v-model="signupForm.email" title="Email"/>
            <Input v-model="signupForm.password" title="Password" type="password"/>  
            <h1 class="text-[12px] font-bold text-red-400">Default password: 123</h1>
            <Button type="submit"
                icon="send"
                title="Send"
                class="px-4 py-2 rounded-lg bg-lime-400 font-bold mt-3"/>
        </form>
    </div>
</template>

<style lang="scss" scoped>

</style>