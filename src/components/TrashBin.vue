<template>
    <h1 class="text-xl font-bold mt-6">Lixeira</h1>
    <div v-if="trash.legth === 0" class="text-neutral-500">Sem notas na Lixeiras.</div>
        <div v-for="note in trash" :key="note.id" class="border p-4 mt-2 rounded">
            <h3 class="font-bold">{{ note.title }}</h3>
            <p>{{ note.content }}</p>
            <button @click="restoreFromTrash(note)" class="text-stone-500">Restaurar Nota</button>
        </div>
 
</template>