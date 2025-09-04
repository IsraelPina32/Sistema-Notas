<template>
    <div class="grid  gap-6 mt-4 grid-cols=[repeat(auto-fit,minmax(250px,1fr))]">
        <NoteCard
            v-for="note in notes"
            :key="note.id"
            :note="note"
            @edit="handleEdit"
            @delete="handleDelete"
            @favorite="handleFavorite"
        />
    </div>
</template>

<script setup>
import NoteCard from './NoteCard.vue';

const props = defineProps({
    notes: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['edit', 'delete', 'favorite'])

const handleEdit = (note) => {
    emit('edit', note);
}

const handleDelete = (note) => {
    emit('delete', note)
}

const handleFavorite = (id) => emit('favorite', id);

</script>