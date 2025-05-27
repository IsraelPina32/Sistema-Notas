<template>
    <div class="bg-neutral-100 border border-neutral-300  rounded-2xl p-7 mb-6 shadow-sm transition md:shadow-md flex justify-center items-center w-md">
        <div class="flex-1 p-1">
            <h2 class="text-lg font-semibold text-neutral-700 dark:text-neutral-100 break-words">
                {{ note.title }} :
            </h2>
            <p class="text-neutral-700">{{ note.content }}</p>
            <p class="text-xs text-neutral-700 font-mono ">{{ note.createdAt }}</p>
        </div>
        <div class="flex flex-col gap-2 p-2">
            <button @click="$emit('edit', note)" class="text-stone-500">Editar</button>
             <button @click="$emit('delete', note)" class="text-stone-500">Excluir</button>
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
    defineEmits(['edit', 'delete'])
</script>