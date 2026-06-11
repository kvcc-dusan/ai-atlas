// Preview mode is entered via ?preview=1 (used by the admin Site Preview iframe).
// Read once at startup — the flag survives SPA navigation without polluting every URL.
// Drafts aren't secrets (internal tool), so a URL flag is an acceptable gate.
export const isPreviewMode = new URLSearchParams(window.location.search).has('preview');
