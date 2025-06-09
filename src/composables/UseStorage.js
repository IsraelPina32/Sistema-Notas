import {ref, watch} from 'vue'

export function useStorage(key, defaultValue) {
    const data = ref(load())

    function load() {
        const stored = localStorage.getItem(key)

        try {
            return stored ? JSON.parse(stored) : defaultValue
        } catch{
            return defaultValue
        }
    }

    watch(data, (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))
    }, { deep: true})

    return data
}