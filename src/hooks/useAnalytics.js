import { useCallback } from 'react';

const STORAGE_KEY = 'ai-playbook-analytics';

export function useAnalytics() {
    const track = useCallback((name, properties = {}) => {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        stored.push({
            event: name,
            timestamp: new Date().toISOString(),
            path: window.location.pathname,
            ...properties,
        });
        if (stored.length > 500) stored.splice(0, stored.length - 500);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    }, []);

    const trackPageView = useCallback((path) => {
        track('page_view', { page: path });
    }, [track]);

    return { trackPageView };
}
