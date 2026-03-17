import { useState, useEffect } from 'react';

/**
 * Dark mode theme hook.
 * - Checks localStorage for saved preference
 * - Falls back to system prefers-color-scheme
 * - Applies data-theme attribute to <html>
 * - Returns [isDark, toggle]
 */
export function useTheme() {
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage first
        const saved = localStorage.getItem('ai-playbook-theme');
        if (saved !== null) return saved === 'dark';

        // Default to light theme
        return false;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('ai-playbook-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggle = () => setIsDark((prev) => !prev);

    return [isDark, toggle];
}
