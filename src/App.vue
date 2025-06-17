<template>
    <section class="fixed  top-4 right-90 z-50">

        <button @click="toogleDark" class="flex items-center gap-2 p-2">
            <Transition name="fade" mode="out-in">
                <SunIcon v-if="!isDark" key="sun" />
                <MoonIcon v-else key="moon" />
            </Transition>
        </button>
    </section>

    <section class="max-w-full mx-auto p-4">

        <h1 class="text-3xl font-bold m-2 text-gray-600 dark:text-neutral-200">Minhas Notas</h1>

        <NoteForm :note="newNote" :isEditing="isEditing" @submit="addNote" />
        <NoteList :notes="notes" @edit="handleEdit" @delete="handleDelete" />
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
import { onMounted, ref, Transition, watch } from 'vue'

const { isDark } = useDarkMode();
const lottieRef = ref(null);


onMounted(() => {
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