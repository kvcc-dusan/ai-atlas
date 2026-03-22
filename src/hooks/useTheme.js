import { useState, useEffect } from 'react';

/**
 * Dark mode theme hook.
 * - Checks localStorage for saved preference
 * - Defaults to light mode on first visit
 * - Applies data-theme attribute to <html>
 * - Returns [isDark, toggle]
 *
 * @param {string} storageKey - localStorage key to use (default: 'ai-playbook-theme')
 *   Pass a different key (e.g. 'ai-playbook-admin-theme') to keep admin and
 *   user-side preferences isolated in the same browser.
 */
export function useTheme(storageKey = 'ai-playbook-theme') {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved !== null) return saved === 'dark';
        return false; // default: light mode
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
    }, [isDark, storageKey]);

    const toggle = () => setIsDark((prev) => !prev);

    return [isDark, toggle];
}
