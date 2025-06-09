<template>
     <form @submit.prevent="handleSubmit">
            <div>
                <label class="block text-neutral-700 mb-2">Titulo da Nota</label>
                <input v-model="form.title" type="text" class="border p-1 w-full text-neutral-700 bg-neutral-100 border-neutral-300  mb-2" placeholder="Digite a sua nota">
            </div>
            <div>
                <label class="block text-neutral-700  mb-2">Conteúdo da Nota</label>
                <textarea v-model="form.content" class="border p-1 w-full bg-neutral-100  border-neutral-300 text-neutral-700 mb-2 rounded-2xl"></textarea>
            </div>
            <button type="submit" class="bg-neutral-100 border border-neutral-300 text-neutral-700  mb-2 p-1 rounded-2xl">
                {{  isEditing ? 'Salvar' : 'Adicionar' }}
            </button>
        </form>

</template>

<script setup>
    import { ref, defineProps, watch } from 'vue'

    const props = defineProps({
        note: {
            type: Object,
            default: () => ({ title: '', content: ''})
        },
        isEditing: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['submit']);

    const form = ref({ title: '', content: '' });

    watch( 
    () => props.note,
    (newValue) => {
        if (newValue) {
            form.value = { ...newValue};
        }
    },
    { immediate: true}
);
  const handleSubmit = () => {
    if(! form.value.title || !form.value.content) return;
    emit('submit', { ...form.value});

    form.value = { title: '', content: ''};
  }
</script>