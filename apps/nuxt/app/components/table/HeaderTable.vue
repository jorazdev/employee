<script setup lang="ts">
const model = defineModel<boolean>()

type props = {
    monthDates: string[]
}
defineProps<props>()

const formatHeader = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
}
</script>

<template>
    <thead class=" text-black uppercase text-xs" 
        :class="{ 'sticky top-0 z-40 bg-gray-300': !model }">
        <tr>
            <th
                class="px-6 py-3 font-bold min-w-[180px] bg-gray-300 "
                :class="{ 'bg-gray-300 sticky left-0 z-30': !model }">
                First Name
            </th>
            <th
                class="px-6 py-3 font-semibold min-w-[180px] bg-gray-300 "
                :class="{ 'bg-gray-300 sticky left-[180px] z-30': !model }">
                Last Name
            </th>
            <th
                class="px-6 py-3 font-semibold min-w-[180px] bg-gray-300 "
                :class="{ 'bg-gray-300 sticky left-[360px] z-20': !model }">
                Personnel number
            </th>
            <th
                v-for="date in monthDates"
                :key="date"
                class="px-6 py-3 font-semibold text-center text-xs min-w-[60px] w-[60px] bg-gray-300">
                {{ formatHeader(date) }}
            </th>
        </tr>
    </thead>
</template>

<style lang="css" scoped>

</style>