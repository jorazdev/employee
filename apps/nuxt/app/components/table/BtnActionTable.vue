<script setup lang="ts">
import Button from '~/components/form/Button.vue'

const model = defineModel<any>({
  required: true
})

const  nextMonth = () => {
    model.value = new Date(model.value.getFullYear(), model.value.getMonth() + 1, 1)
}
const prevMonth = () => {
    model.value = new Date(model.value.getFullYear(), model.value.getMonth() - 1, 1)
}

</script>

<template>
    <div class="flex justify-between items-center mb-4">
        <Button icon="arrow_left_alt" 
          title="Previous month" 
          className="bg-lime-400" 
          @onclick="prevMonth"/>
        <h2 class="text-lg font-semibold">
            Visual summary — {{ model.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) }}
        </h2>
        <Button icon="arrow_right_alt" 
          title="Next month" 
          :rightIcon="true"
          className="bg-lime-400" 
          @onclick="nextMonth"/>
    </div>
</template>

<style lang="css" scoped>

</style>