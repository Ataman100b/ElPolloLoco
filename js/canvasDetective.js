/**
 * Canvas Detective - helps find the original canvas element
 */
class CanvasDetective {
    constructor() {
        this.checkInterval = null;
        this.maxChecks = 20;
        this.currentCheck = 0;
    }

    /**
     * Starts looking for the original canvas element
     * @param {Function} callback - Called when canvas is found
     */
    findOriginalCanvas(callback) {
        console.log('🕵️ Canvas Detective: Starting search for original canvas...');
        
        this.checkInterval = setInterval(() => {
            this.currentCheck++;
            console.log(`🔍 Canvas Detective: Check ${this.currentCheck}/${this.maxChecks}`);
            
            const canvas = document.getElementById('canvas');
            const canvasContainer = document.getElementById('canvas-cont');
            
            console.log('🔍 Canvas Detective findings:', {
                canvas: canvas ? '✅ FOUND' : '❌ Not found',
                canvasId: canvas ? canvas.id : 'N/A',
                canvasClasses: canvas ? canvas.className : 'N/A',
                canvasVisible: canvas ? !canvas.classList.contains('d-none') : 'N/A',
                canvasContainer: canvasContainer ? '✅ Found' : '❌ Not found',
                containerChildren: canvasContainer ? canvasContainer.children.length : 0
            });
            
            // Check all canvas elements in document
            const allCanvases = document.getElementsByTagName('canvas');
            console.log(`🔍 Total canvas elements found: ${allCanvases.length}`);
            for (let i = 0; i < allCanvases.length; i++) {
                const c = allCanvases[i];
                console.log(`   Canvas ${i}: id="${c.id}" class="${c.className}" visible=${!c.classList.contains('d-none')}`);
            }
            
            if (canvas) {
                console.log('🎉 Canvas Detective: ORIGINAL CANVAS FOUND!');
                clearInterval(this.checkInterval);
                callback(canvas);
                return;
            }
            
            if (this.currentCheck >= this.maxChecks) {
                console.log('❌ Canvas Detective: Gave up after maximum checks');
                clearInterval(this.checkInterval);
                callback(null);
                return;
            }
        }, 100); // Check every 100ms
    }
}

// Create global instance
window.canvasDetective = new CanvasDetective();
