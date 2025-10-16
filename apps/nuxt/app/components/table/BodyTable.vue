<script setup lang="ts">
import type { TEmployee } from '~/types/absence';

const model = defineModel<boolean>()

type props = {
    employees: TEmployee[]
    monthDates: string[]
}

defineProps<props>()
const emit = defineEmits(['onSelect'])

const isAbsent = (emp: { absences: { begin: string; end: string }[] }, date: string): boolean => {
  return emp.absences.some(a => date >= a.begin && date <= a.end)
}

const isWeekend = (date: string): boolean => {
  const d = new Date(date)
  const day = d.getDay() // 0 = Dimanche, 6 = Samedi
  return day === 0 || day === 6
}

const getCellClass = (emp: TEmployee, date: string): string => {
  const classes = ['border', 'p-2', 'text-center', 'min-w-[60px]', 'w-[60px]', 'z-10']
  
  if (isAbsent(emp, date)) {
    classes.push('bg-red-200', 'text-black', 'font-bold')
  } else if (isWeekend(date)) {
    classes.push('bg-slate-100')
  }
  
  return classes.join(' ')
}

</script>

<template>
    <tbody>
      <tr v-for="emp in employees"
        :key="emp.firstName + emp.lastName"
        class="cursor-pointer hover:bg-gray-100"
        @click="emit('onSelect', emp)">
        <td class="p-2 min-w-[120px] border-2 border-slate-300 sticky left-0 z-30 bg-white"
          v-if="!model">
          {{ emp.firstName }}
        </td>
        <td v-else class="p-2 min-w-[120px] border-2 border-slate-300">
          {{ emp.firstName }}
        </td>
        <td class="p-2 min-w-[170px] border-2 border-slate-300 sticky left-[180px] z-30 bg-white"
          v-if="!model">
          {{ emp.lastName }}
        </td>
        <td v-else class="p-2 min-w-[170px] border-2 border-slate-300">
          {{ emp.lastName }}
        </td>

        <td class="p-2 min-w-[120px] border-2 border-slate-300 sticky left-[360px] z-30 bg-white shadow-sm"
          v-if="!model">
          {{ emp.personnelNumber }}
        </td>
        <td v-else class="p-2 min-w-[120px] border-2 border-slate-300">
          {{ emp.personnelNumber }}
        </td>

        <td v-for="date in monthDates"
          :key="date"
          class="p-2 text-center min-w-[60px] w-[60px] border-2 border-slate-300 z-10"
          :class="getCellClass(emp, date)">
          {{ isAbsent(emp, date) ? 'A' : '' }}
        </td>
      </tr>
    </tbody>

</template>

<style lang="css" scoped>

</style>