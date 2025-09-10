<template>
    <main>
        <div v-if="isSearchActive" @click.self="isSearchActive = false"
            class="fixed inset-0 z-40 backdrop-blur-sm bg-black/30 transition-opacity duration-300">

        </div>
        <header
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_max-content] items-center justify-center gap-4 p-4 sm:p-5 max-w-5xl mx-auto w-full relative">
            <div class="relative w-full z-50 mb-3 sm:mb-0">
                <input ref="searchInput" v-model="searchQuery" @focus="isSearchActive = true"
                    @blur="isSearchActive = false" type="text" placeholder="Procure a sua nota"
                    :class="['w-full cursor-text p-3 rounded-xl border border-neutral-300 bg-neutral-100 text-gray-800 shadow-md text-sm sm:text-base transition-all duration-300', isSearchActive ? 'ring-2 ring-gray-500 shadow-xl scale-105 focus:outline-none' : 'border-transparent']" />
                <span
                    class="text-sm text-gray-400 dark:text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
                    :class="{ 'opacity-0': isSearchActive, 'opacity-100': !isSearchActive }">
                    Ctrl + K
                </span>
            </div>
            <div class="flex justify-center w-full sm:w-[60px]">
                <button @click="toogleDark"
                    class="p-2 rounded-full cursor-pointer hover:ring-2 hover:ring-neutral-300 pointer-events-auto">
                    <Transition name="fade" mode="out-in">
                        <SunIcon v-if="!isDark" key="sun" />
                        <MoonIcon v-else key="moon" />
                    </Transition>
                </button>
            </div>
        </header>

        <section :class="[
            'w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-10', isSearchActive ? 'backdrop-blur-sm rounded-xl pointer-events-none' : 'border-transparent'
        ]">
            <div v-if="!selectedNote">
                <h1
                    class="flex items-center justify-center gap-2 text-2xl sm:text-2xl lg:text-3xl font-bold my-6 sm:my-8 lg:my-12 text-gray-600 dark:text-neutral-200 text-center md:text-left">
                    Minhas Notas</h1>
                <NoteForm :note="newNote" :isEditing="isEditing" @submit="addNote" />
                <NoteList :notes="filteredNotes" @edit="handleEdit" @delete="handleDelete" @favorite="toggleFavorite"
                    @open="openNote" />
                <TrashBin :trash="trash" @restore="restoreFromTrash" @permanent-delete="permanentlyDeleteNote" />
            </div>

            <transition name="fade-zoom" mode="out-in">
                <div v-if="selectedNote" key="detail"
                    class="flex flex-col gap-3 items-center justify-center w-full max-w-3xl mx-auto p-5 rounded-3xl bg-neutral-100 border border-neutral-300 shadow-md">
                    <h3 class="font-bold text-neutral-700 break-words tex-lg">{{ selectedNote?.title || "Nota sem titulo" }}
                    </h3>
                    <p class="text-neutral-700 break-words text-sm">{{ selectedNote?.content || "Sem conteudo" }}</p>
                    <p class="text-xs text-neutral-500 ">Criada em: {{ selectedNote?.createdAt || "Sem data" }}</p>

                    <button @click="closeNote"
                        class="mt-4 w-full bg-neutral-200 border text-neutral-700 p-3 rounded-2xl hover:bg-neutral-300 transition">
                        Voltar
                    </button>
                </div>
            </transition>
        </section>
    </main>
</template>

<script setup>
import NoteForm from './components/NoteForm.vue'
import NoteList from './components/NoteList.vue'
import TrashBin from './components/TrashBin.vue'
import { useNotes } from './composables/useNotes.js'
import { useDarkMode } from './composables/useDarkMode.js'
import MoonIcon from './components/icons/MoonIcon.vue'
import SunIcon from './components/icons/SunIcon.vue'
import { onMounted, ref, watch, computed, onUnmounted } from 'vue'

const { isDark } = useDarkMode();
const searchQuery = ref('');
const isSearchActive = ref(false);
const searchInput = ref(null);
const lottieRef = ref(null);
const showFavoriteItesOnly = ref(false);
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

const filteredNotes = computed(() => {

    if (!searchQuery.value.trim()) return notes.value;

    const query = searchQuery.value.toLocaleLowerCase();
    return notes.value.filter(note => {
        const matchesQuery = note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query) ||
            note.createdAt.toLowerCase().includes(query);

        const matchesFavorite = showFavoriteItesOnly.value ? note.favorite : true;

        return matchesQuery && matchesFavorite
    })
})

const selectedNote = ref(null);
const openNote = (note) => selectedNote.value = note;

const closeNote = () => selectedNote.value = null;

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

</script>

<style scoped>
.fade-gradient {
    transition: background 0.5s ease, backdrop-filter 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.fade-zoom-enter-active,
.fade-zoom-leave-active {
    transition: all 0.3s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.fade-zoom-enter-to,
.fade-zoom-leave-from {
    opacity: 1;
    transform: scale(1);
}
</style>