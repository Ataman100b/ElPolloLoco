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
    canvas = document.getElementById('canvas');
    
    // Ensure canvas exists before creating world
    if (!canvas) {
        console.error('Canvas element not found!');
        return false;
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
    // Use the domReady helper to ensure DOM is fully loaded
    ensureWindowLoaded(() => {
        // Additional delay for GitHub Pages to ensure all resources are ready
        setTimeout(() => {
            initializeGame();
        }, 500);
    });
}

/**
 * Initializes the game components
 */
function initializeGame() {
    // First show the game UI to make canvas visible
    showGame();
    
    // Then initialize the game components
    initLevel();
    
    // Initialize the world with the now-visible canvas
    if (init()) {
        // Complete the game start process
        completeGameStart();
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
