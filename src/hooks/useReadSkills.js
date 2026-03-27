import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ai-playbook-read';

function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
        return new Set();
    }
}

export function useReadSkills() {
    const [readIds, setReadIds] = useState(load);

    const markRead = useCallback((id) => {
        setReadIds(prev => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
            } catch {}
            return next;
        });
    }, []);

    return { readIds, markRead };
}
