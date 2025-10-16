<script setup lang="ts">
const model = defineModel()

type props = {
    title: string
    type?: string
}

withDefaults(defineProps<props>(), {
    type: "text"
})
</script>

<template>
    <div>
        <h1 class="text-[12px] font-bold">{{ title }}</h1>
        <input :type 
            v-model="model"
            class="bg-gray-100 w-full p-2 rounded-md text-sm">
    </div>
</template>

<style lang="less" scoped>

</style>