<template>
    <div
        class="cursor-pointer bg-neutral-100 border border-neutral-300  rounded-2xl p-7 mb-6 shadow-sm transition md:shadow-md grid justify-center items-center grid-cols-1 sm:grid-cols-[1fr_max-content] gap-4 w-full max-w-3xl mx-auto" 
        @click="handleCardClick">
        <div class="p-1">
            <h2 class="text-lg font-semibold text-neutral-700 break-words p-1">
                {{ note.title }}.
            </h2>
            <p class="text-neutral-700 font-normal p-1" >{{ note.content }}</p>
            <p class="text-sm text-neutral-700 font-mono p-1">{{ note.createdAt }}</p>
        </div>
        <div class="flex flex-col justify-center items-center gap-2 p-2">
            <button @click.stop="$emit('edit', note)" class="text-base text-stone-600">Editar</button>
            <button @click.stop="$emit('delete', note)" class="text-base text-stone-600">Excluir</button>
            <button class="relative flex  items-center justify-center w-10 h-10" @click.stop="$emit('favorite', note.id)"
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
const props = defineProps({
    note: {
        type: Object,
        required: true,
    }
})
const emit = defineEmits(['edit', 'delete', 'favorite', 'open'])

const handleCardClick = () =>  emit('open', props.note)

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