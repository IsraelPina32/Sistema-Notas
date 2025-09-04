<template>
    <h1 class="text-xl font-bold mt-6 dark:text-gray-400 text-gray-500 ">Lixeira</h1>
    <div v-if="trash.length === 0" class="dark:text-gray-400 text-gray-500">Sem notas na sua Lixeira.

    </div>
    <div v-else class="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        <div v-for="note in trash.slice(0, 12)" :key="note.id"
            class="p-5 mt-2 rounded-2xl bg-neutral-100 border border-neutral-300 shadow-sm transition md:shadow-md flex justify-center items-center flex-col">
            <h3 class="font-bold text-neutral-700 break-words">{{ note.title }}</h3>
            <p class="text-neutral-700 break-words">{{ note.content }}</p>

            <div class="flex flex-col gap-2 mt-3 w-full">
                <button @click="emit('restore', note.id)"
                    class="w-full bg-neutral-100 border border-neutral-300 text-neutral-700  p-2 sm:p-1.5 rounded-2xl text-sm hover:bg-neutral-300 transition shadow-sm">Restaurar
                    Nota</button>
                <button @click="emit('permanent-delete', note.id)"
                    class=" w-full bg-neutral-100 border border-neutral-300 text-neutral-700  p-2 sm:p-1.5 rounded-3xl text-sm hover:bg-neutral-300 transition shadow-sm">Excluir
                    Permanentemente</button>
            </div>
        </div>
    </div>

    <p v-if="trash.length > 12" class="text-sm font-bold dark:text-gray-400 text-gray-500 mt-4">
        Só podem ser exibidas apenas 12 notas recentes da Lixeira.
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