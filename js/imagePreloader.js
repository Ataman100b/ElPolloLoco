/**
 * Image preloader utility to ensure all game images are loaded before starting
 */
class ImagePreloader {
    constructor() {
        this.imageCache = new Map();
        this.loadingPromises = [];
    }

    /**
     * Preloads all game images
     * @returns {Promise} Promise that resolves when all images are loaded
     */
    preloadAllImages() {
        console.log('🖼️ Starting image preload...');
        
        const imagePaths = [
            // Background images
            'img/5_background/layers/air.png',
            'img/5_background/layers/3_third_layer/1.png',
            'img/5_background/layers/3_third_layer/2.png',
            'img/5_background/layers/2_second_layer/1.png',
            'img/5_background/layers/2_second_layer/2.png',
            'img/5_background/layers/1_first_layer/1.png',
            'img/5_background/layers/1_first_layer/2.png',
            
            // Cloud images
            'img/5_background/layers/4_clouds/1.png',
            
            // Character images
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-22.png',
            'img/2_character_pepe/2_walk/W-23.png',
            'img/2_character_pepe/2_walk/W-24.png',
            'img/2_character_pepe/2_walk/W-25.png',
            'img/2_character_pepe/2_walk/W-26.png',
            
            // Enemy images
            'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
            
            // Boss images
            'img/4_enemie_boss_chicken/2_alert/G5.png',
            'img/4_enemie_boss_chicken/2_alert/G6.png',
            'img/4_enemie_boss_chicken/2_alert/G7.png',
            
            // Collectible images
            'img/8_coin/coin_1.png',
            'img/8_coin/coin_2.png',
            'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
            
            // Status bar images
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png'
        ];

        return this.loadImages(imagePaths);
    }

    /**
     * Loads an array of images and returns a promise
     * @param {string[]} imagePaths - Array of image paths to load
     * @returns {Promise} Promise that resolves when all images are loaded
     */
    loadImages(imagePaths) {
        const promises = imagePaths.map(path => this.loadSingleImage(path));
        
        return Promise.all(promises).then(() => {
            console.log(`✅ All ${imagePaths.length} images preloaded successfully!`);
            return this.imageCache;
        }).catch(error => {
            console.error('❌ Error preloading images:', error);
            throw error;
        });
    }

    /**
     * Loads a single image and returns a promise
     * @param {string} path - Path to the image
     * @returns {Promise} Promise that resolves when the image is loaded
     */
    loadSingleImage(path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                this.imageCache.set(path, img);
                console.log(`✅ Loaded: ${path}`);
                resolve(img);
            };
            
            img.onerror = (error) => {
                console.error(`❌ Failed to load: ${path}`, error);
                reject(new Error(`Failed to load image: ${path}`));
            };
            
            img.src = path;
        });
    }

    /**
     * Gets a preloaded image from cache
     * @param {string} path - Path to the image
     * @returns {HTMLImageElement|null} The preloaded image or null
     */
    getImage(path) {
        return this.imageCache.get(path) || null;
    }
}

// Create global instance
window.imagePreloader = new ImagePreloader();
