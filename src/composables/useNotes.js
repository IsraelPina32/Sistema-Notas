import { ref, onMounted } from 'vue';
import { useStorage } from './UseStorage';

const defaultNotes = ref([
    { id: 1, title: 'Primeira Nota neste WebSite!', content: 'Pode me apagar ou deixar sua linda nota aqui!', createdAt: '2025-05-28' }])

export function useNotes() {

    const notes = useStorage('notes', defaultNotes)
    const trash = useStorage('trash', [])
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

        newNote.value = { title: '', content: '' }
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
        if (index !== -1) {
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

    return {
        notes,
        trash,
        newNote,
        isEditing,
        addNote,
        handleEdit,
        handleDelete,
        restoreFromTrash,
        permanentlyDeleteNote,
    }
}