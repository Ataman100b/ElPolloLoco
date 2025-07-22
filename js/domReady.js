/**
 * Ensures code runs after DOM is fully loaded
 * This is crucial for GitHub Pages where scripts may load before DOM
 */
function ensureDOMReady(callback) {
    if (document.readyState === 'loading') {
        // DOM is still loading
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        // DOM is already loaded
        callback();
    }
}

/**
 * Wait for window load event to ensure all resources are loaded
 */
function ensureWindowLoaded(callback) {
    if (document.readyState === 'complete') {
        // Window is already loaded
        callback();
    } else {
        // Wait for window load
        window.addEventListener('load', callback);
    }
}
