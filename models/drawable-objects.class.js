/**
 * Base class for all drawable game objects
 */
class DrawableObjects {
    /**
     * X position of the object
     * @type {number}
     */
    x = 120;
    
    /**
     * Y position of the object
     * @type {number}
     */
    y = 180;
    
    /**
     * Image object
     * @type {HTMLImageElement}
     */
    img;
    
    /**
     * Height of the object
     * @type {number}
     */
    height = 150;
    
    /**
     * Width of the object
     * @type {number}
     */
    width = 100;
    
    /**
     * Current frame index of animation
     * @type {number}
     */
    currentImage = 0;
    
    /**
     * Cache for preloaded images
     * @type {Object<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Loads an image from a given path
     * @param {string} path - Path to the image file
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
     */
    draw(ctx) {
        if (this.img && this.img.complete && this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
            // Log image loading issues for debugging
            if (!this.imageLoadingLogged) {
                console.log('🖼️ Image not ready:', {
                    hasImg: !!this.img,
                    complete: this.img ? this.img.complete : 'no img',
                    naturalWidth: this.img ? this.img.naturalWidth : 'no img',
                    src: this.img ? this.img.src : 'no img',
                    className: this.constructor.name
                });
                this.imageLoadingLogged = true; // Only log once per object
            }
            
            // Draw a visible placeholder while image loads
            ctx.fillStyle = 'rgba(255, 100, 100, 0.7)'; // Red placeholder
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.strokeStyle = '#FF0000';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            
            // Add text label
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '12px Arial';
            ctx.fillText(this.constructor.name, this.x + 5, this.y + 15);
        }
    }

    /**
     * Preloads an array of images into the image cache
     * @param {string[]} arr - Array of image paths to load
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a debugging frame around the object if applicable
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
     */
    drawFrame(ctx) {
        if (this.canDrawFrame()) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Determines if this object can have a frame drawn (for debugging)
     * @returns {boolean} True if the frame should be drawn
     */
    canDrawFrame() {
        return this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Bottle ||
            this instanceof Coin ||
            this instanceof ThrowableObject;
    }
}