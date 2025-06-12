<template>
    <h1 class="text-xl font-bold mt-6 dark:text-gray-400 text-gray-500 ">Lixeira</h1>
    <div v-if="trash.length === 0" class="dark:text-gray-400 text-gray-500">Sem notas na sua Lixeiras.</div>
        <div v-for="note in trash" :key="note.id" class="p-4 mt-2 rounded-2xl bg-neutral-100 border border-neutral-300 shadow-sm transition md:shadow-md flex justify-center items-center flex-col w-md">
            <h3 class="font-bold text-neutral-700 ">{{ note.title }}</h3>
            <p class="text-neutral-700 ">{{ note.content }}</p>
            <button @click="emit('restore', note.id)" class="bg-neutral-100 border border-neutral-300 text-neutral-700  mb-2 p-1 rounded-2xl">Restaurar Nota</button>
            <button @click="emit('permanent-delete', note.id)" class="bg-neutral-100 border border-neutral-300 text-neutral-700  mb-2 p-1 rounded-2xl">Excluir Permanentemente</button>
        </div>

        <p v-if="trash.length > 10" class="text-xm font-bold dark:text-gray-400 text-gray-500 mt-4">
            Só podem ser exibidas apenas 10 notas recentes da Lixeira.
        </p>
 
</template>

<script setup>
    defineProps({
        trash: {
            type: Array,
            required: true
        }
    })

    const emit = defineEmits(['restore', 'permanent-delete'])
</script>