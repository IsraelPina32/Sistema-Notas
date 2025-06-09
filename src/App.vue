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
import { ref, onMounted } from 'vue'
import NoteForm from './components/NoteForm.vue'
import NoteList from './components/NoteList.vue'
import TrashBin from './components/TrashBin.vue'

const trash = ref([])

const notes = ref([
    { id: 1, title: 'Primeira Nota neste WebSite!', content: 'Pode me apagar ou deixar sua linda nota aqui!', createdAt: '2025-05-28'}])
const newNote = ref({ title: '', content: '' })
const isEditing = ref(false)
const editId = ref(null)

const addNote = (noteData) => {
    if (!noteData.title || !noteData.content) return

    if (isEditing.value) {
        const index = notes.value.findIndex(note => note.id === editId.value)
        if (index !== -1) {
            notes.value[index] = {
                ...notes.value[index],
                title: noteData.title,
                content: noteData.content,
            }
        }
        isEditing.value = false
        editId.value = null
    } else {
        notes.value.push({
            id: Date.now(),
            title: noteData.title,
            content: noteData.content,
            createdAt: new Date().toISOString().slice(0, 10),
        })
    }

    newNote.value = { title: '', content: ''}
    saveNotes()
}
const handleEdit = (note) => {
    newNote.value = {
        title: note.title,
        content: note.content
    }
    editId.value = note.id
    isEditing.value = true
}

const handleDelete = (note) => {

    trash.value.push(note)
    localStorage.setItem('trash', JSON.stringify(trash.value))

    notes.value = notes.value.filter(n => n.id !== note.id)
    saveNotes()
}

const restoreFromTrash = (noteID) => {
    const index = trash.value.findIndex(n => n.id === noteID)
    if(index !== -1) {
        const note = trash.value.splice(index, 1)[0]
        notes.value.push(note)
        saveNotes()
    }
}

const permanentlyDeleteNote = (noteId) => {
    trash.value = trash.value.filter(n => n.id !== noteId)
    saveNotes()
}

const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes.value));
    localStorage.setItem('trash', JSON.stringify(trash.value));
}

onMounted(() => {
    const saved = localStorage.getItem('notes')

    const trashData = localStorage.getItem('trash');
    if (saved) notes.value = JSON.parse(saved)
    if (trashData) trash.value = JSON.parse(trashData)
})

</script>