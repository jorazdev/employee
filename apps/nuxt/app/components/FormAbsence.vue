<script setup lang="ts">
import type { TAbsence } from '~/types/absence';
import Input from '~/components/form/Input.vue'
import Button from '~/components/form/Button.vue'

type props = {
  action: 'add'|'edit'
}

const model = defineModel<TAbsence>({
  required: true
})
const props = withDefaults(defineProps<props>(), {
  action: 'add'
})

const emit = defineEmits(['onClose', 'onUpdateAbsence'])
</script>

<template>
  
    <form action="" class="p-10 space-y-2 z-50">
        <h1 class="text-2xl text-center font-bold">{{ action.toUpperCase() }} Absence </h1>
        <Input title="First name" v-model="model.firstName"/>
        <Input title="Last name" v-model="model.lastName"/>
        <Input type="date" title="Start date" v-model="model.startDate"/>
        <Input type="date" title="End date" v-model="model.endDate"/>

        <Button icon="save" 
          title="Save" 
          className="w-full px-5 py-1 bg-lime-300 rounded-2xl mt-5 cursor-pointer" 
          @onclick="emit('onUpdateAbsence'); emit('onClose')"/>
        
    </form>
</template>

<style lang="css" scoped>

</style>