<template>
    <div class="fixed top-4 left-1/2 z-50 mb-4 w-full max-w-lg px-4 -translate-x-1/2 transform">
        <div class="relative">
            <input
                   ref="searchInput"
                   v-model="searchQuery"
                   type="text"
                   placeholder="🔍 Buscar sua nota por título, conteúdo ou data"
                   class="w-full p-2 rounded-xl border-neutral-300 mb-4 bg-neutral-100 text-gray-800 shadow-md  transition focus:ring-2 focus-ring-gray-500"
               />
            <span class="text-xs text-gray-400 dark:text-neutral-500 absolute right-5 top-1/3 -translate-y-1.75">
                Ctrl + K
            </span>
        </div>

    </div>
    <div class="fixed  top-4 right-90 z-50">
       
        <button @click="toogleDark" class="flex items-center gap-2 p-2">
            <Transition name="fade" mode="out-in">
                <SunIcon v-if="!isDark" key="sun" />
                <MoonIcon v-else key="moon" />
            </Transition>
        </button>
    </div>

    <section class="max-w-full mx-auto p-4">

        <h1 class="text-3xl font-bold m-2 text-gray-600 dark:text-neutral-200">Minhas Notas</h1>

        <NoteForm :note="newNote" :isEditing="isEditing" @submit="addNote" />
        <NoteList :notes="filteredNotes" @edit="handleEdit" @delete="handleDelete" />
        <TrashBin :trash="trash" @restore="restoreFromTrash" @permanent-delete="permanentlyDeleteNote" />
    </section>
</template>

<script setup>
import NoteForm from './components/NoteForm.vue'
import NoteList from './components/NoteList.vue'
import TrashBin from './components/TrashBin.vue'
import { useNotes } from './composables/useNotes.js'
import { useDarkMode } from './composables/useDarkMode.js'
import MoonIcon from './components/icons/MoonIcon.vue'
import SunIcon from './components/icons/SunIcon.vue'
import { onMounted, ref, Transition, watch,computed, onUnmounted } from 'vue'

const { isDark } = useDarkMode();

const searchQuery = ref('');
const searchInput = ref(null);

const lottieRef = ref(null);



const filteredNotes = computed(() => {

    if(!searchQuery.value.trim()) return notes.value;

    const query = searchQuery.value.toLocaleLowerCase();
    return notes.value.filter(note => {
        return note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query) ||
            note.createdAt.toLowerCase().includes(query);
    })
})

const handleShortCut = (event) => {
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        searchInput.value?.focus()
    }
}

onUnmounted(() => window.removeEventListener('keydown', handleShortCut))


onMounted(() => {

    window.addEventListener('keydown', handleShortCut);

    watch(isDark, (val) => {
        document.documentElement.classList.toggle('dark', val);
    }, { immediate: true })
})

const toogleDark = () => {
    isDark.value = !isDark.value;

    setTimeout(() => {
        if (lottieRef.value) {
            lottieRef.value.play();
        }
    }, 100);

}

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