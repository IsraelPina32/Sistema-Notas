<template>
     <section class="max-w-2xl mx-auto p-4">
         <h1 class="text-2xl font-bold mb-4  text-neutral-800 dark:">Minhas Notas</h1>

    <form @subtmit.prevent="addNote" class="">
        <div>
            <label class="block">Titulo</label>
        </div>
    </form>
 
     <NoteCard
         v-for="note in notes"
         :note="note"
         :key="note.id"
         @edit="handleEdit"
         @delete="handleDelete"
     />
     </section>
 </template>
 
 
 <script setup>
 import NoteCard from './components/NoteCard.vue'


 const notes = [
    { id: 1, title: 'Aprender Vue.js', content: 'Estudar componentes e eventos', createdAt: '2025-04-17' },
    { id: 2, title: 'Revisar JavaScript', content: 'Conceitos com classes, async/await e promises', createdAt: '2025-04-16'},
    {id: 3, title: 'Aprender FluterFlow', content: "Estudar componentes e eventos", createdAt: "2025-04-15"}]

const handleEdit = (notes) => {
    console.log("Editando nota:", notes);
    
}
 </script>