<template>
     <form @submit.prevent="handleSubmit" class="w-full max-w-3xl mx-auto grid gap-5 sm:gap-6 sm:grid-cols-2">
            <div class="sm:col-span-2">
                <label class="block dark:text-gray-400 text-gray-500 mb-3 font-medium text-sm sm:text-base">Titulo da Nota</label>
                <input v-model="form.title" type="text" class="border p-2.5 w-full text-neutral-800 bg-neutral-100 border-neutral-300 mb-3  rounded-2xl" placeholder="Digite o titulo da sua nota.">
            </div>
            <div class="sm:col-span-2">
                <label class="block dark:text-gray-400 text-gray-500 mb-3 font-medium text-sm sm:text-base">Conteúdo da Nota</label>
                <textarea v-model="form.content" class="border p-2.5 w-full bg-neutral-100  border-neutral-300 text-neutral-800 mb-2 rounded-2xl" placeholder="Digite a sua nota"></textarea>
            </div>
            <div class="sm:col-span-2 flex justify-center">
                <button type="submit" class="bg-neutral-100 border border-neutral-300 text-neutral-700  mb-2 p-3 rounded-2xl">
                    {{  isEditing ? 'Salvar' : 'Adicionar' }}
                </button>
            </div>
        </form>
</template>

<script setup>
    import { ref, watch } from 'vue'

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
            form.value.title = newValue.title || '';
            form.value.content = newValue.content || '';
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