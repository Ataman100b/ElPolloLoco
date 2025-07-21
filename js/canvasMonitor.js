/**
 * DOM Canvas Monitor
 * Continuously monitors for canvas element presence and behavior
 * Helps debug why original canvas is missing from DOM
 */
class CanvasMonitor {
  constructor() {
    this.observationCount = 0;
    this.maxObservations = 100;
    this.canvasHistory = [];
    this.isMonitoring = false;
  }
  
  startMonitoring() {
    if (this.isMonitoring) return;
    
    console.log('🔍 CanvasMonitor: Starting DOM monitoring for canvas elements');
    this.isMonitoring = true;
    
    // Monitor immediately and on interval
    this.checkCanvasState();
    
    // Check every 100ms
    this.monitorInterval = setInterval(() => {
      if (this.observationCount >= this.maxObservations) {
        this.stopMonitoring();
        return;
      }
      this.checkCanvasState();
    }, 100);
    
    // Also monitor DOM mutations
    this.setupMutationObserver();
  }
  
  checkCanvasState() {
    this.observationCount++;
    
    const timestamp = Date.now();
    const canvas = document.getElementById('canvas');
    const canvasContainer = document.getElementById('canvas-cont');
    const allCanvases = document.querySelectorAll('canvas');
    const bodyChildren = Array.from(document.body.children).map(el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').join('.') : ''));
    
    const state = {
      observation: this.observationCount,
      time: timestamp,
      canvas: canvas ? 'FOUND' : 'MISSING',
      canvasContainer: canvasContainer ? 'FOUND' : 'MISSING',
      totalCanvases: allCanvases.length,
      canvasIds: Array.from(allCanvases).map(c => c.id || 'no-id'),
      bodyChildren: bodyChildren,
      containerContents: canvasContainer ? canvasContainer.innerHTML : 'no-container'
    };
    
    // Only log significant changes
    const lastState = this.canvasHistory[this.canvasHistory.length - 1];
    if (!lastState || 
        lastState.canvas !== state.canvas || 
        lastState.totalCanvases !== state.totalCanvases ||
        this.observationCount % 20 === 1) {
      
      console.log(`📊 CanvasMonitor [${this.observationCount}/100]:`, state);
    }
    
    this.canvasHistory.push(state);
  }
  
  setupMutationObserver() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Check for added nodes
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'CANVAS' || node.id === 'canvas') {
              console.log('🎯 CanvasMonitor: CANVAS ELEMENT ADDED TO DOM!', node);
            }
            if (node.querySelector && node.querySelector('canvas')) {
              console.log('🎯 CanvasMonitor: Element added that contains canvas:', node);
            }
          }
        });
        
        // Check for removed nodes
        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'CANVAS' || node.id === 'canvas') {
              console.log('⚠️ CanvasMonitor: CANVAS ELEMENT REMOVED FROM DOM!', node);
            }
            if (node.querySelector && node.querySelector('canvas')) {
              console.log('⚠️ CanvasMonitor: Element removed that contained canvas:', node);
            }
          }
        });
        
        // Check for attribute changes on canvas
        if (mutation.type === 'attributes' && 
            (mutation.target.tagName === 'CANVAS' || mutation.target.id === 'canvas')) {
          console.log('🔄 CanvasMonitor: Canvas attribute changed:', {
            target: mutation.target,
            attribute: mutation.attributeName,
            oldValue: mutation.oldValue
          });
        }
      });
    });
    
    // Observe the entire document
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true
    });
    
    console.log('👁️ CanvasMonitor: MutationObserver active');
  }
  
  stopMonitoring() {
    if (!this.isMonitoring) return;
    
    console.log('🛑 CanvasMonitor: Stopping monitoring after', this.observationCount, 'observations');
    this.isMonitoring = false;
    
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
    }
    
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Provide summary
    this.provideSummary();
  }
  
  provideSummary() {
    console.log('📋 CanvasMonitor Summary:');
    console.log('- Total observations:', this.observationCount);
    console.log('- Canvas found at any point:', this.canvasHistory.some(h => h.canvas === 'FOUND'));
    console.log('- Max canvases seen:', Math.max(...this.canvasHistory.map(h => h.totalCanvases)));
    
    // Show timeline of canvas presence
    const timeline = this.canvasHistory.filter((state, index) => {
      const prevState = this.canvasHistory[index - 1];
      return !prevState || prevState.canvas !== state.canvas || prevState.totalCanvases !== state.totalCanvases;
    });
    
    console.log('🕒 Canvas Timeline:', timeline);
  }
}

// Auto-start monitoring when script loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 CanvasMonitor: DOM loaded, starting monitoring');
  window.canvasMonitor = new CanvasMonitor();
  window.canvasMonitor.startMonitoring();
});

// Also start immediately if DOM is already loaded
if (document.readyState === 'loading') {
  console.log('⏳ CanvasMonitor: DOM still loading, will start on DOMContentLoaded');
} else {
  console.log('🚀 CanvasMonitor: DOM already loaded, starting monitoring now');
  window.canvasMonitor = new CanvasMonitor();
  window.canvasMonitor.startMonitoring();
}
