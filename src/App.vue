<template>
    <div class="fixed top-4 left-1/2 z-50 mb-4 w-full max-w-lg px-4  -translate-x-1/2 transform sm:px-6 md:max-w-xl lg:max-w-2xl">
        <div class="relative">
            <div :class="['relative rounded-xl transition-all duration-300', isSearchActive ? 'backdrop-blur-sm bg-white/60 dark:bg-neutral-600/40 border border-white/40 dark:border-black/20' : 'border border-transparent']">
                <input
                       ref="searchInput"
                       v-model="searchQuery"
                       @focus="isSearchActive = true"
                       @blur="isSearchActive =  false"
                       type="text"
                       placeholder="🔍 Buscar sua nota por título, conteúdo ou data"
                       :class="['w-3/4 sm:w-full max-w-lg pl-10 p-2 sm:p-3 rounded-xl border-neutral-300 mb-4 bg-neutral-100 text-gray-800 shadow-md text-sm sm:text-base transition-all duration-300', isSearchActive ? 'ring-2 ring-gray-500 shadow-xl scale-105' : 'border-transparent' ]"
                   />
            </div>
            <span class="text-xs sm:text-sm text-gray-400 dark:text-neutral-500 absolute right-18 top-6 -translate-y-1/2 pointer-events-none" :class="{ 'opacity-0': isSearchActive, 'opacity-100': !isSearchActive}">
                Ctrl + K
            </span>
        </div>
    </div>
    <div class="fixed  top-[70px] sm:top-5 right-[250px] sm:right-8  lg:right-12 z-50">
       
        <button @click="toogleDark" class="flex items-center gap-2 p-2 rounded-full  hover:ring-2 :hover:ring-neutral-300">
            <Transition name="fade" mode="out-in">
                <SunIcon v-if="!isDark" key="sun" />
                <MoonIcon v-else key="moon" />
            </Transition>
        </button>
    </div>

    <section class="w-full max-w-4xl mx-auto p-4 sm:px-8 py-4">

        <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold m-6 text-gray-600 dark:text-neutral-200">Minhas Notas</h1>

        <NoteForm :note="newNote" :isEditing="isEditing" @submit="addNote" />
        <NoteList :notes="filteredNotes" @edit="handleEdit" @delete="handleDelete" @favorite="toggleFavorite" />
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
import { onMounted, ref, watch,computed, onUnmounted } from 'vue'

const { isDark } = useDarkMode();
const searchQuery = ref('');
const isSearchActive = ref(false);
const searchInput = ref(null);
const lottieRef = ref(null);
const showFavoriteItesOnly = ref(false);


const filteredNotes = computed(() => {

    if(!searchQuery.value.trim()) return notes.value;

    const query = searchQuery.value.toLocaleLowerCase();
    return notes.value.filter(note => {
        const matchesQuery = note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query) ||
            note.createdAt.toLowerCase().includes(query);

            const matchesFavorite = showFavoriteItesOnly.value ? note.favorite : true;
        
            return matchesQuery && matchesFavorite 
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
    permanentlyDeleteNote,
    toggleFavorite
} = useNotes();

</script>