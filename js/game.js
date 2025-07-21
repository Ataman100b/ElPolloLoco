/**
 * Canvas element for the game
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Main world object that handles game logic
 * @type {World}
 */
let world;

/**
 * Keyboard input handler for the game
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the canvas and world
 * @returns {boolean} True if initialization was successful
 */
function init() {
    if (window.debugGameFlow) {
        window.debugGameFlow.log('init() called - looking for canvas');
    }
    
    canvas = document.getElementById('canvas');
    
    // Ensure canvas exists before creating world
    if (!canvas) {
        console.error('Canvas element not found!');
        
        // Extra debugging
        const allCanvases = document.getElementsByTagName('canvas');
        console.error('Total canvas elements in document:', allCanvases.length);
        
        const elementWithId = document.querySelector('#canvas');
        console.error('Element with #canvas selector:', elementWithId);
        
        return false;
    }
    
    if (window.debugGameFlow) {
        window.debugGameFlow.log('Canvas found, creating world');
    }
    
    world = new World(canvas, keyboard);
    responsiveControl();
    return true;
}

/**
 * Sets up responsive controls for both touch and keyboard inputs
 */
function responsiveControl() {
    setupTouchControls();
    setupKeyboardControls();
}

/**
 * Sets up touch controls for mobile devices
 */
function setupTouchControls() {
    setupTouchButton('btnLeft', 'LEFT');
    setupTouchButton('btnRight', 'RIGHT');
    setupTouchButton('btnJump', 'UP');
    setupTouchButton('btnThrow', 'T');
    setupTouchButton('btnExchange', 'B');
}

/**
 * Sets up a touch button with event listeners
 * @param {string} buttonId - The ID of the button element
 * @param {string} keyProperty - The corresponding keyboard property to set
 */
function setupTouchButton(buttonId, keyProperty) {
    const button = document.getElementById(buttonId);
    
    button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[keyProperty] = true;
    });
    
    button.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[keyProperty] = false;
    });
}

/**
 * Sets up keyboard controls with event listeners
 */
function setupKeyboardControls() {
    const keyMap = {
        '39': 'RIGHT',
        '37': 'LEFT',
        '38': 'UP',
        '40': 'DOWN',
        '84': 'T',
        '27': 'ESC',
        '66': 'B'
    };

    window.addEventListener("keydown", (e) => {
        if (keyMap[e.keyCode]) {
            keyboard[keyMap[e.keyCode]] = true;
        }
    });

    window.addEventListener("keyup", (e) => {
        if (keyMap[e.keyCode]) {
            keyboard[keyMap[e.keyCode]] = false;
        }
    });
}

/**
 * Starts the game with a small delay to ensure DOM is fully loaded
 * This helps prevent initialization errors on slower connections like GitHub Pages
 */
function startGameWithDelay() {
    if (window.debugGameFlow) {
        window.debugGameFlow.log('startGameWithDelay called');
    }
    
    // Use the domReady helper to ensure DOM is fully loaded
    ensureWindowLoaded(() => {
        if (window.debugGameFlow) {
            window.debugGameFlow.log('DOM ensured to be loaded');
        }
        
        // Additional delay for GitHub Pages to ensure all resources are ready
        setTimeout(() => {
            if (window.debugGameFlow) {
                window.debugGameFlow.log('Starting initializeGame after delay');
            }
            initializeGame();
        }, 500);
    });
}

/**
 * Initializes the game components
 */
function initializeGame() {
    if (window.debugGameFlow) {
        window.debugGameFlow.log('initializeGame called');
    }
    
    // First show the game UI to make canvas visible
    showGame();
    
    if (window.debugGameFlow) {
        window.debugGameFlow.log('showGame completed');
    }
    
    // Preload all images before creating game objects
    if (window.imagePreloader) {
        console.log('🔄 Starting image preload process...');
        
        window.imagePreloader.preloadAllImages().then(() => {
            console.log('✅ All images preloaded! Starting game...');
            continueGameInitialization();
        }).catch(error => {
            console.error('❌ Image preload failed:', error);
            // Continue anyway with traditional loading
            console.log('⚠️ Continuing with traditional image loading...');
            continueGameInitialization();
        });
    } else {
        console.log('⚠️ Image preloader not available, using traditional loading');
        continueGameInitialization();
    }
}

/**
 * Continues game initialization after image preloading
 */
function continueGameInitialization() {
    if (window.debugGameFlow) {
        window.debugGameFlow.log('continueGameInitialization called');
    }
    
    // Then initialize the game components
    initLevel();
    
    if (window.debugGameFlow) {
        window.debugGameFlow.log('initLevel completed');
    }
    
    // Initialize the world with the now-visible canvas
    if (init()) {
        if (window.debugGameFlow) {
            window.debugGameFlow.log('init() successful');
        }
        
        // Complete the game start process
        completeGameStart();
    } else {
        if (window.debugGameFlow) {
            window.debugGameFlow.log('init() failed!');
        }
    }
}

/**
 * Completes the game start process after initialization
 */
function completeGameStart() {
    gameStarted = true;
    window.gameStarted = true;
    checkPlayMusic();
    showResponsiveBtn();
    if (fullscreenMode) {
        showCanvasinFull();
    }
}
