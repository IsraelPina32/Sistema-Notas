<template>
    <div class="bg-neutral-100 border border-neutral-300  rounded-2xl p-5 mb-5 shadow-sm transition md:shadow-md flex justify-center items-center">
        <div class="flex p-2 min-w-full   justify-between items-center gap-2">
            <h2 class="text-lg font-semibold text-neutral-700 dark:text-neutal-100 break-words">
                {{ note.title }} :
            </h2>
            <p class="text-neutral-700">{{ note.content }}</p>
            <p class="text-xs text-neutral-700">{{ note.createdAt }}</p>
        </div>
        <div class="flex gap-2 ">
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