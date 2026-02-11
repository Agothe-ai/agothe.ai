// Advanced performance monitoring and optimization utilities

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  type: 'timing' | 'fps' | 'memory' | 'custom';
}

export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: Map<string, PerformanceObserver> = new Map();
  private fpsFrames: number[] = [];
  private lastFrameTime: number = performance.now();
  
  constructor() {
    this.initPerformanceObservers();
  }

  private initPerformanceObservers() {
    if (typeof PerformanceObserver !== 'undefined') {
      // Observe navigation timing
      try {
        const navObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric({
              name: entry.name,
              value: entry.duration,
              timestamp: entry.startTime,
              type: 'timing',
            });
          }
        });
        navObserver.observe({ entryTypes: ['navigation', 'resource', 'measure'] });
        this.observers.set('navigation', navObserver);
      } catch (e) {
        console.warn('PerformanceObserver not fully supported');
      }
    }
  }

  recordMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    
    // Keep only last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics.shift();
    }
  }

  startMeasure(name: string) {
    performance.mark(`${name}-start`);
  }

  endMeasure(name: string) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name, 'measure')[0];
    if (measure) {
      this.recordMetric({
        name,
        value: measure.duration,
        timestamp: performance.now(),
        type: 'timing',
      });
    }
    
    // Cleanup
    performance.clearMarks(`${name}-start`);
    performance.clearMarks(`${name}-end`);
    performance.clearMeasures(name);
  }

  measureFPS(callback?: (fps: number) => void) {
    const measure = () => {
      const now = performance.now();
      const delta = now - this.lastFrameTime;
      const fps = 1000 / delta;
      
      this.fpsFrames.push(fps);
      if (this.fpsFrames.length > 60) {
        this.fpsFrames.shift();
      }
      
      const avgFPS = this.fpsFrames.reduce((a, b) => a + b, 0) / this.fpsFrames.length;
      
      this.recordMetric({
        name: 'fps',
        value: avgFPS,
        timestamp: now,
        type: 'fps',
      });
      
      if (callback) callback(avgFPS);
      
      this.lastFrameTime = now;
      requestAnimationFrame(measure);
    };
    
    requestAnimationFrame(measure);
  }

  getMemoryUsage(): { used: number; total: number; percentage: number } | null {
    if ('memory' in performance && (performance as any).memory) {
      const memory = (performance as any).memory;
      const used = memory.usedJSHeapSize / 1048576; // Convert to MB
      const total = memory.totalJSHeapSize / 1048576;
      const percentage = (used / total) * 100;
      
      this.recordMetric({
        name: 'memory-used',
        value: used,
        timestamp: performance.now(),
        type: 'memory',
      });
      
      return { used, total, percentage };
    }
    return null;
  }

  getMetrics(type?: PerformanceMetric['type']): PerformanceMetric[] {
    if (type) {
      return this.metrics.filter(m => m.type === type);
    }
    return [...this.metrics];
  }

  getAverageMetric(name: string, windowSize: number = 10): number {
    const relevant = this.metrics
      .filter(m => m.name === name)
      .slice(-windowSize);
    
    if (relevant.length === 0) return 0;
    
    return relevant.reduce((sum, m) => sum + m.value, 0) / relevant.length;
  }

  clearMetrics() {
    this.metrics = [];
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.metrics = [];
  }

  exportMetrics(): string {
    return JSON.stringify(this.metrics, null, 2);
  }

  logPerformanceReport() {
    console.group('Performance Report');
    
    const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (timing) {
      console.log('Page Load:', `${timing.loadEventEnd - timing.fetchStart}ms`);
      console.log('DOM Content Loaded:', `${timing.domContentLoadedEventEnd - timing.fetchStart}ms`);
      console.log('DOM Interactive:', `${timing.domInteractive - timing.fetchStart}ms`);
    }
    
    const avgFPS = this.getAverageMetric('fps', 60);
    if (avgFPS > 0) {
      console.log('Average FPS:', avgFPS.toFixed(2));
    }
    
    const memory = this.getMemoryUsage();
    if (memory) {
      console.log('Memory Usage:', `${memory.used.toFixed(2)}MB / ${memory.total.toFixed(2)}MB (${memory.percentage.toFixed(1)}%)`);
    }
    
    console.groupEnd();
  }
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Lazy load images
export const lazyLoadImages = (selector: string = 'img[data-src]') => {
  const images = document.querySelectorAll<HTMLImageElement>(selector);
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  return imageObserver;
};

export const performanceMonitor = new PerformanceMonitor();
