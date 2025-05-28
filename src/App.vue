<template>
    <section class="max-w-2xl mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4 text-neutral-800">Minhas Notas</h1>

        <form @submit.prevent="addNote">
            <div>
                <label class="block text-neutral-700 mb-2">Titulo da Nota</label>
                <input v-model="newNote.title" type="text" class="border p-1 w-full text-neutral-700 bg-neutral-100 border-neutral-300  mb-2" placeholder="Digite a sua nota">
            </div>
            <div>
                <label class="block text-neutral-700  mb-2">Conteúdo da Nota</label>
                <textarea v-model="newNote.content" class="border p-1 w-full bg-neutral-100  border-neutral-300 text-neutral-700 mb-2 rounded-2xl"></textarea>
            </div>
            <button type="submit" class="bg-neutral-100 border border-neutral-300 text-neutral-700  mb-2 p-1 rounded-2xl">
                {{  isEditing ? 'Salvar' : 'Adicionar' }}
            </button>
        </form>

        <NoteCard v-for="note in notes" :note="note" :key="note.id" @edit="handleEdit" @delete="handleDelete" />
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NoteCard from './components/NoteCard.vue'


const notes = ref([
    { id: 1, title: 'Primeira Nota neste WebSite!', content: 'Pode me apagar ou deixar sua linda nota aqui!', createdAt: '2025-05-28'}])
const newNote = ref({ title: '', content: '' })
const isEditing = ref(false)
const editId = ref(null)

const addNote = () => {
    if (!newNote.value.title || !newNote.value.content) return

    if (isEditing.value) {
        const index = notes.value.findIndex(note => note.id === editId.value)
        if (index !== -1) {
            notes.value[index] = {
                ...notes.value[index],
                title: newNote.value.title,
                content: newNote.value.content,
            }
        }
        isEditing.value = false
        editId.value = null
    } else {
        notes.value.push({
            id: Date.now(),
            title: newNote.value.title,
            content: newNote.value.content,
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
    const trash = JSON.parse(localStorage.getItem('trash') || '[]')
    trash.push(note)
    localStorage.setItem('trash', JSON.stringify(trash))


    notes.value = notes.value.filter(n => n.id !== note.id)
    saveNotes()
}

const restoreFromTrash = (noteID) => {
    const trash = JSON.parse(localStorage.getItem('trash') || '[]')
    const note = trash.find(n => n.id === noteID)
    if(note) {
        notes.value.push(note)
        saveNotes()
        localStorage.setItem('trash', JSON.stringify(trash.filter(n => n.id !== noteID)))
    }
}

const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes.value))
}

onMounted(() => {
    const  saved = localStorage.getItem('notes')
    if (saved) {
        notes.value = JSON.parse(saved)
    }
})

</script>