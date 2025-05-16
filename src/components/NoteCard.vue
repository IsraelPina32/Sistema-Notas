<template>
    <div class="bg-neutral-100 border border-neutral-300  rounded-2xl p-4 mb-4 shadow-sm transition md:shadow-md">
        <div class="flex justify-between items-start">
            <h2 class="text-lg font-semibold text-neutral-700 dark:text-neutal-100 break-words">
                {{ note.title }}
            </h2>
            <div class="flex gap-2">
                <button @click="$emit('edit', note.id)"
                    class="text-gray-800 pl-2"
                    title="Editar"
                >
                    +
                </button>
            </div>
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
</script>