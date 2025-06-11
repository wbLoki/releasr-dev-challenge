import { useState, useEffect } from 'react';

export function useDarkMode() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) {
            setDarkMode(saved === 'true');
        } else {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            setDarkMode(prefersDark);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());

        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    return { darkMode, toggleDarkMode };
}
