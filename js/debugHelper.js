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

// Debug DOM structure
window.debugDOM = function() {
    console.log('=== DOM STRUCTURE DEBUG ===');
    
    // Check if canvas-cont exists
    const canvasCont = document.getElementById('canvas-cont');
    console.log('Canvas container exists:', !!canvasCont);
    
    if (canvasCont) {
        console.log('Canvas container innerHTML length:', canvasCont.innerHTML.length);
        console.log('Canvas container children:', canvasCont.children.length);
        
        // List all children
        for (let i = 0; i < canvasCont.children.length; i++) {
            const child = canvasCont.children[i];
            console.log(`Child ${i}: ${child.tagName}, id="${child.id}", class="${child.className}"`);
        }
    }
    
    // Check body structure
    console.log('Body innerHTML includes canvas tag:', document.body.innerHTML.includes('<canvas'));
    
    // Try different selectors
    console.log('querySelector canvas:', document.querySelector('canvas'));
    console.log('querySelector #canvas:', document.querySelector('#canvas'));
    console.log('getElementsByTagName canvas:', document.getElementsByTagName('canvas'));
};

// Call debugDOM on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('=== DOMContentLoaded Event ===');
    window.debugDOM();
});
