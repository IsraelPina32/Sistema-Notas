<template>
    <div
        class="bg-neutral-100 border border-neutral-300  rounded-2xl p-7 mb-6 shadow-sm transition md:shadow-md flex justify-center items-center w-md">
        <div class="flex-1 p-1">
            <h2 class="text-lg font-semibold text-neutral-700  break-words">
                {{ note.title }}.
            </h2>
            <p class="text-neutral-700">{{ note.content }}</p>
            <p class="text-xs text-neutral-700 font-mono ">{{ note.createdAt }}</p>
        </div>
        <div class="flex flex-col gap-2 p-2">
            <button @click="$emit('edit', note)" class="text-stone-500">Editar</button>
            <button @click="$emit('delete', note)" class="text-stone-500">Excluir</button>
            <button class="relative flex items-center justify-center w-10 h-10" @click="$emit('favorite', note.id)"
                :arial-label="note.favorite ? 'Desfavoritar' : 'Favoritar'">
                <Transition name="scale">
                    <svg v-if="note.favorite" key="filled" xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 fill-yellow-500 stroke-yellow-500 drop-shadow-md animate-ping-short"
                        viewBox="0 0 24 24">
                        <path
                            d="M12 .587l3.668 7.568L24 9.75l-6 5.85 1.416 8.25L12 19.77l-7.416 4.08L6 15.6 0 9.75l8.332-1.595z" />
                    </svg>

                    <svg v-else key="empty" xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 stroke-stone-600 fill-none hover:scale-110 transition-transform duration-200"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01z" />
                    </svg>
                </Transition>
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    note: {
        type: Object,
        required: true,
    }
})
defineEmits(['edit', 'delete', 'favorite'])
import { Transition } from 'vue';
</script>

<style scoped>
@keyframes ping-short {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.3);
        opacity: 0.7;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-ping-short {
    animation: ping-short 0.4s ease-in-out;
}

.scale-enter-active,
.scale-leave-active {
    transition: transform 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
    transform: scale(0.8);
    opacity: 0;
}
</style>