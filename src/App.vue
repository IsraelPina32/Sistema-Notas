<template>
    <section class="max-w-2xl mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4 text-neutral-800">Minhas Notas</h1>

        <NoteForm :note="newNote" :isEditing="isEditing" @submit="addNote"/>
     
        <NoteList
            :notes="notes"
            @edit="handleEdit"
            @delete="handleDelete"
        />
        <TrashBin :trash="trash" @restore="restoreFromTrash" @permanent-delete="permanentlyDeleteNote"/>
    </section>
</template>

<script setup>
import NoteForm from './components/NoteForm.vue'
import NoteList from './components/NoteList.vue'
import TrashBin from './components/TrashBin.vue'
import { useNotes} from './composables/useNotes.js'

const {
    notes,
    trash,
    newNote,
    isEditing,
    addNote,
    handleEdit,
    handleDelete,
    restoreFromTrash,
    permanentlyDeleteNote
} = useNotes();
</script>