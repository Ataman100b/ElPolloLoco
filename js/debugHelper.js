/**
 * Debug helper for GitHub Pages initialization issues
 */

// Log when scripts are loaded
console.log('Debug Helper loaded at:', new Date().toISOString());

// Check DOM state
console.log('Document ready state:', document.readyState);

// Monitor DOM ready state changes
document.addEventListener('readystatechange', () => {
    console.log('Ready state changed to:', document.readyState);
});

// Log when window is fully loaded
window.addEventListener('load', () => {
    console.log('Window fully loaded at:', new Date().toISOString());
    
    // Check if critical elements exist
    const canvas = document.getElementById('canvas');
    const firstScreen = document.getElementById('first-screen');
    const gameNav = document.getElementById('game-nav');
    
    console.log('Canvas element:', canvas);
    console.log('Canvas exists:', !!canvas);
    if (canvas) {
        console.log('Canvas classes:', canvas.className);
        console.log('Canvas display style:', window.getComputedStyle(canvas).display);
        console.log('Canvas visible:', !canvas.classList.contains('d-none'));
    }
    console.log('First screen exists:', !!firstScreen);
    console.log('Game nav exists:', !!gameNav);
});

// Debug function to manually test game initialization
window.debugStartGame = function() {
    console.log('Debug: Attempting to start game...');
    
    // Check if elements exist
    const canvas = document.getElementById('canvas');
    if (!canvas) {
        console.error('Debug: Canvas not found!');
        return;
    }
    
    console.log('Debug: Canvas found, starting game...');
    startGameWithDelay();
};

// Add debug logging to track game initialization
window.debugGameFlow = {
    log: function(step, details) {
        console.log(`[GAME FLOW] ${step}:`, details || '');
        
        // Also check canvas state during flow
        const canvas = document.getElementById('canvas');
        if (canvas) {
            console.log(`[GAME FLOW] Canvas state - Classes: "${canvas.className}", Visible: ${!canvas.classList.contains('d-none')}`);
        }
    }
};
