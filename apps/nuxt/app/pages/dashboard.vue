<script setup lang="ts">
import { onMounted } from 'vue'
import useAbscence from '~/composables/absence';
import Button from '~/components/form/Button.vue'
import type { TUser } from '~/types/user.type';

definePageMeta({
    middleware: ['auth']
})


const { absences } = useAbscence()

const tokenCo = useCookie<string>('token')
const userCo = useCookie<TUser>('user')

const onLogout = () => {
    tokenCo.value = ''
    window.location.reload()
}
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen w-full p-4 bg-[#EAEAE0]/20">
        <div class="w-full  max-w-7xl h-20 bg-[#2B2B2B] rounded-2xl mb-5 
            flex items-center justify-between p-2">
            <div class="flex items-center justify-center gap-2">
                <div>
                    <div v-if="!userCo" class="w-16 h-16 bg-slate-50 rounded-full border-2 border-black"></div>
                    <img v-else :src="userCo.avatarUrl" alt="" class="w-16 h-16 rounded-full border-2 border-lime-400">
                </div>
                <div v-if="userCo">
                    <h1 class="text-2xl text-white font-semibold">{{ userCo.firstName }}</h1>
                    <h1 class="text-lg text-white font-semibold">{{ userCo.lastName }}</h1>
                    <h1 class="text-[10px] text-lime-500 font-semibold">{{ userCo.email }}</h1>
                </div>
            </div>
            <Button icon="logout" 
                title="Sign out"
                className="text-white" 
                @onclick="onLogout()"/>
        </div>
        <div class="w-full max-w-7xl bg-white rounded-lg shadow-lg p-6">
            <TableAbsence v-if="absences && absences.length > 0" 
                :absences/>

        </div>
    </div>
</template>

<style lang="css" scoped>

</style>