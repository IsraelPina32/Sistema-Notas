import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useStorage } from './UseStorage';

const defaultNotes = ref([
    { id: 1, title: 'Primeira Nota neste WebSite!', content: 'Pode me apagar ou deixar sua linda nota aqui!', createdAt: '2025-05-28' 

}])

const MAX_TRASH_ITEMS = 12;

export function useNotes() {

    const notes = useStorage('notes', defaultNotes)
    const trash = useStorage('trash', [])
    const newNote = ref({ title: '', content: '' })
    const isEditing = ref(false)
    const editId = ref(null)
    const toast = useToast();
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
                toast.success('Nota atualizada com sucesso!', {timeout: 2000})
            }
            isEditing.value = false
            editId.value = null
        } else {
            notes.value.push({
                id: Date.now(),
                title: noteData.title,
                content: noteData.content,
                createdAt: new Date().toISOString().slice(0, 10),
                favorite: false
            })
            toast.success('Nota adicionada com sucesso!', {timeout: 2000})
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

        if (trash.value.length >= MAX_TRASH_ITEMS) {
            toast.error('A lixeira está cheia! Exclua algumas notas permanentemente antes de adicionar mais!', {timeout: 3000});
            return;
        }

        trash.value.push(note)

        notes.value = notes.value.filter(n => n.id !== note.id)

        saveNotes()

        toast.warning('Nota movida para a lixeira!', {timeout: 2000})
    }

    const restoreFromTrash = (noteID) => {
        const index = trash.value.findIndex(n => n.id === noteID)
        if (index !== -1) {
            const note = trash.value.splice(index, 1)[0]
            if (typeof note.favorite === 'undefined') note.favorite = false;
            notes.value.push(note)
            saveNotes()
        }
        toast.success('Nota restaurada com sucesso!', {timeout: 2000})
    }

    const permanentlyDeleteNote = (noteId) => {
        trash.value = trash.value.filter(n => n.id !== noteId)
        saveNotes()
        toast.error('Nota excluída permanentemente!', {timeout: 2000})
    }

    const saveNotes = () => {
        localStorage.setItem('notes', JSON.stringify(notes.value));
        localStorage.setItem('trash', JSON.stringify(trash.value));
    }

    const toggleFavorite = (noteId) => {
        const note = notes.value.find(n => n.id === noteId);
        if (note) {
            note.favorite = !note.favorite;
            saveNotes();
        }
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
        toggleFavorite,
    }
}