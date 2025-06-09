<template>
    <div class="grid gap-4 mt-4">
        <NoteCard
            v-for="note in notes"
            :key="note.id"
            :note="note"
            @edit="handleEdit"
            @delete="handleDelete"
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


const emit = defineEmits(['edit', 'delete'])

const handleEdit = (note) => {
    emit('edit', note);
}

const handleDelete = (note) => {
    emit('delete', note)
}
</script>