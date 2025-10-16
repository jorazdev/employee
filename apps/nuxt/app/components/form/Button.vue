<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
type props = {
    icon: string
    title: string
    className?: string
    rightIcon?: boolean
}

withDefaults(defineProps<props>(), {
    rightIcon: false
})
const emit = defineEmits(['onclick'])
</script>

<template>
    <button @click="emit('onclick')"
        type="button" 
      :class="twMerge(`px-3 py-1 rounded text-sm 
        font-bold cursor-pointer
        flex items-center justify-center
         gap-2 min-w-auto`, className)">
        <span 
            class="material-symbols-outlined text-base leading-none" 
            v-if="!rightIcon">
            {{ icon }}
        </span>
        <span class="whitespace-nowrap">{{ title }}</span>
        <span 
            class="material-symbols-outlined text-base leading-none" 
            v-if="rightIcon">
            {{ icon }}
        </span>
    </button>
</template>

<style lang="css" scoped>

</style>