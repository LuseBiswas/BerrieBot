// Performance utilities to prevent forced reflows and optimize DOM operations

// Debounce function to prevent excessive function calls
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Throttle function for high-frequency events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Batch DOM reads to prevent forced reflows
export function batchDOMReads(callback: () => void): void {
  requestAnimationFrame(callback);
}

// Batch DOM writes to prevent forced reflows
export function batchDOMWrites(callback: () => void): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
}

// Optimized ResizeObserver utility
export function createOptimizedResizeObserver(
  callback: ResizeObserverCallback,
  debounceMs: number = 100
): ResizeObserver {
  const debouncedCallback = debounce(callback, debounceMs);
  return new ResizeObserver(debouncedCallback);
}

// Prevent layout thrashing during scroll
export function optimizeScrollHandler(
  handler: (scrollY: number) => void,
  throttleMs: number = 16 // ~60fps
): (event: Event) => void {
  let ticking = false;
  
  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handler(window.scrollY);
        ticking = false;
      });
      ticking = true;
    }
  };
}

// Measure element dimensions without causing reflows
export function measureElement(element: HTMLElement): DOMRect | null {
  if (!element) return null;
  
  // Use getBoundingClientRect only once per frame
  let rect: DOMRect | null = null;
  
  batchDOMReads(() => {
    rect = element.getBoundingClientRect();
  });
  
  return rect;
}

// Optimized intersection observer for performance
export function createPerformanceIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const optimizedCallback: IntersectionObserverCallback = (entries, observer) => {
    // Batch intersection updates
    requestAnimationFrame(() => {
      callback(entries, observer);
    });
  };
  
  return new IntersectionObserver(optimizedCallback, {
    rootMargin: '50px',
    threshold: [0, 0.25, 0.5, 0.75, 1],
    ...options,
  });
}

// CSS containment utility for preventing layout propagation
export function applyContainment(element: HTMLElement): void {
  if (!element) return;
  
  element.style.contain = 'layout style';
}

// Optimize animation performance
export function optimizeAnimation(element: HTMLElement): void {
  if (!element) return;
  
  element.style.willChange = 'transform, opacity';
  element.style.transform = 'translateZ(0)'; // Force GPU layer
  element.style.backfaceVisibility = 'hidden';
}

// Clean up animation optimizations
export function cleanupAnimation(element: HTMLElement): void {
  if (!element) return;
  
  element.style.willChange = 'auto';
  element.style.transform = '';
  element.style.backfaceVisibility = '';
}

export default {
  debounce,
  throttle,
  batchDOMReads,
  batchDOMWrites,
  createOptimizedResizeObserver,
  optimizeScrollHandler,
  measureElement,
  createPerformanceIntersectionObserver,
  applyContainment,
  optimizeAnimation,
  cleanupAnimation,
}; 