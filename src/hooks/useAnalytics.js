import { useCallback } from 'react';
import { supabase } from '../lib/supabase';

// Fire-and-forget event logging to Supabase. Failures are silent by design —
// analytics must never break or slow down the UI for visitors.
function send(event, { entityId = null, label = null, path = null } = {}) {
    supabase
        .from('analytics_events')
        .insert({
            event,
            entity_id: entityId,
            label,
            path: path ?? window.location.pathname,
        })
        .then(({ error }) => {
            if (error) console.warn('analytics:', error.message);
        });
}

export function useAnalytics() {
    const trackEvent = useCallback((event, options) => {
        send(event, options);
    }, []);

    const trackPageView = useCallback((path) => {
        // Admin browsing would pollute the usage data
        if (path.startsWith('/admin')) return;
        send('page_view', { path });
    }, []);

    return { trackPageView, trackEvent };
}
