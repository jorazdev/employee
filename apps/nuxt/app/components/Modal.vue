<script setup lang="ts">
const model = defineModel<boolean>()
const emit = defineEmits(['onClose'])
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div class="w-full h-full bg-black/30 fixed inset-0 flex flex-col justify-center items-center" 
                v-if="model">
                <section class="w-[600px] h-[400px] bg-white rounded-2xl relative">
                    <button class="absolute right-2 top-2 cursor-pointer" 
                        @click="emit('onClose')">
                        <span class="material-symbols-outlined">
                        close
                        </span>
                    </button>
                    <slot></slot>
                </section>
            </div>
        </Transition>
    </Teleport>
    
</template>

<style lang="css" scoped>
.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}
</style>