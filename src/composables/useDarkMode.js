import { ref, watchEffect } from 'vue';

const isDark = ref(
    localStorage.getItem('darkMode') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
)

watchEffect(() => {
    const html = document.documentElement;

    if(isDark.value) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
})

export function useDarkMode() {
    return { isDark}
}