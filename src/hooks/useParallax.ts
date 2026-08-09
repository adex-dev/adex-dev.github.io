import { RefObject, useCallback, useEffect, useRef } from 'react';

interface ParallaxOptions {
  speed?: number;
  speedX?: number;
  dir?: 'up' | 'down';
}

interface ParallaxElement {
  el: HTMLElement;
  speed: number;
  dir: number;
  speedX: number;
  originY: number;
  currentY: number;
  currentX: number;
  visible: boolean;
}

interface UseParallaxConfig {
  /** Global speed dampening for mobile devices */
  mobileDampen?: number;
  /** Smoothing factor for interpolation (0-1), default 0.08 */
  lerpSmoothness?: number;
  /** Individual element lerp factor, default 0.06 */
  elementLerpFactor?: number;
  /** Whether to auto-collect elements with data-parallax attribute */
  autoCollect?: boolean;
}

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * useParallax Hook
 * Modern realistic parallax system for React
 * 
 * @example
 * ```tsx
 * // Enable parallax globally
 * useParallax();
 * 
 * // Or with custom config
 * useParallax({ mobileDampen: 0.5, lerpSmoothness: 0.1 });
 * ```
 */
export function useParallax(config: UseParallaxConfig = {}): void {
  const {
    mobileDampen = 0.5,
    lerpSmoothness = 0.08,
    elementLerpFactor = 0.06,
    autoCollect = true,
  } = config;

  const scrollYRef = useRef<number>(0);
  const smoothScrollYRef = useRef<number>(0);
  const tickingRef = useRef<boolean>(false);
  const elementsRef = useRef<ParallaxElement[]>([]);
  const isMobile = useRef<boolean>(window.innerWidth < 768);
  const initializedRef = useRef<boolean>(false);
  const resizeTimerRef = useRef<number | null>(null);

  // Store refs untuk cleanup
  const ioRef = useRef<IntersectionObserver | null>(null);

  // Lerp helper
  const lerp = (a: number, b: number, t: number): number => {
    return a + (b - a) * t;
  };

  // Check if element should be excluded
  const shouldExcludeElement = (el: HTMLElement): boolean => {
    const pos = getComputedStyle(el).position;
    return pos === 'fixed' || pos === 'sticky';
  };

  // Auto-target selectors for automatic parallax detection
  const getAutoTargets = useCallback(() => {
    const dampen = isMobile.current ? mobileDampen : 1;
    
    return [
      { sel: '.bg-dots', speed: 0.12 * dampen, dir: -1 },
      { sel: '.bg-dots-br', speed: 0.18 * dampen, dir: -1 },
      { sel: '.orb', speed: 0.10 * dampen, dir: -1 },
      { sel: '.orb-ring', speed: 0.07 * dampen, dir: -1 },
      { sel: '.orb-ring-2', speed: 0.05 * dampen, dir: -1 },
      { sel: '.hero-eyebrow', speed: 0.06 * dampen, dir: -1 },
      { sel: '.hero-name-first', speed: 0.04 * dampen, dir: -1 },
      { sel: '.hero-name-last', speed: 0.04 * dampen, dir: -1 },
      { sel: '.hero-tagline', speed: 0.03 * dampen, dir: -1 },
      { sel: '.hero-desc', speed: 0.02 * dampen, dir: -1 },
      { sel: '.hero-rust-badge', speed: 0.01 * dampen, dir: -1 },
      { sel: '.hero-cta', speed: 0.01 * dampen, dir: -1 },
      { sel: '.term-card', speed: 0.14 * dampen, dir: -1 },
      { sel: '.term-card-back', speed: 0.20 * dampen, dir: -1 },
      { sel: '.term-card-back-left', speed: 0.20 * dampen, dir: -1 },
      { sel: '.bg-notches', speed: 0.08 * dampen, dir: 1 },
      { sel: '.page-header::before', speed: 0.1 * dampen, dir: -1 },
      { sel: '.hero-eyebrow', speed: 0.05 * dampen, dir: -1 },
      { sel: '.stat-item', speed: 0.04 * dampen, dir: -1 },
      { sel: '.stats-grid', speed: 0.04 * dampen, dir: -1 },
      { sel: '.skill-card', speed: 0.03 * dampen, dir: -1 },
      { sel: '.sc', speed: 0.03 * dampen, dir: -1 },
      { sel: '.pc', speed: 0.04 * dampen, dir: -1 },
      { sel: '.project-card', speed: 0.04 * dampen, dir: -1 },
      { sel: '.cc', speed: 0.03 * dampen, dir: -1 },
      { sel: '.about-photo-frame', speed: 0.10 * dampen, dir: -1 },
      { sel: '.about-content', speed: 0.04 * dampen, dir: -1 },
      { sel: '.exp-item', speed: 0.03 * dampen, dir: -1 },
      { sel: '.rc', speed: 0.04 * dampen, dir: -1 },
      { sel: '.card-aurora-blob-tl', speed: 0.20 * dampen, dir: -1 },
      { sel: '.card-aurora-blob-br', speed: 0.25 * dampen, dir: 1 },
    ];
  }, [mobileDampen]);

  // Collect all parallax elements
  const collectElements = useCallback(() => {
    const newElements: ParallaxElement[] = [];

    // A. Manual tagged elements via data-parallax
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const htmlEl = el as HTMLElement;
      const speed = parseFloat(htmlEl.dataset.parallax || '0.15');
      const dir = htmlEl.dataset.parallaxDir === 'down' ? 1 : -1;
      const speedX = parseFloat(htmlEl.dataset.parallaxX || '0');
      const rect = htmlEl.getBoundingClientRect();
      const originY = rect.top + window.scrollY;

      newElements.push({
        el: htmlEl,
        speed,
        dir,
        speedX,
        originY,
        currentY: 0,
        currentX: 0,
        visible: true,
      });
    });

    // B. Auto-detect elements by class/id
    if (autoCollect) {
      const autoTargets = getAutoTargets();
      
      autoTargets.forEach(({ sel, speed, dir }) => {
        document.querySelectorAll(sel).forEach(el => {
          const htmlEl = el as HTMLElement;
          
          // Skip if already manually tagged
          if (htmlEl.dataset.parallax) return;
          // Skip fixed/sticky
          if (shouldExcludeElement(htmlEl)) return;

          const rect = htmlEl.getBoundingClientRect();
          const originY = rect.top + window.scrollY;

          newElements.push({
            el: htmlEl,
            speed,
            dir,
            speedX: 0,
            originY,
            currentY: 0,
            currentX: 0,
            visible: true,
          });
        });
      });
    }

    return newElements;
  }, [autoCollect, getAutoTargets]);

  // Update transforms for all elements
  const update = useCallback(() => {
    tickingRef.current = false;

    // Smooth scroll with lerp
    smoothScrollYRef.current = lerp(
      smoothScrollYRef.current,
      scrollYRef.current,
      lerpSmoothness
    );

    const vh = window.innerHeight;
    const elements = elementsRef.current;

    elements.forEach(item => {
      if (!item.visible) return;

      const elCenter = item.originY - smoothScrollYRef.current - vh / 2;
      const translateY = elCenter * item.speed * item.dir;
      const translateX = item.speedX
        ? (smoothScrollYRef.current - item.originY) * item.speedX
        : 0;

      // Clamp values
      const clampY = Math.max(-120, Math.min(120, translateY));
      const clampX = Math.max(-40, Math.min(40, translateX));

      // Per-element lerp for ultra-smooth
      item.currentY = lerp(item.currentY, clampY, elementLerpFactor);
      item.currentX = lerp(item.currentX, clampX, elementLerpFactor);

      item.el.style.transform = `translate3d(${item.currentX}px, ${item.currentY}px, 0)`;
      item.el.style.willChange = 'transform';
    });

    // Continue loop if there's difference
    if (Math.abs(smoothScrollYRef.current - scrollYRef.current) > 0.5) {
      requestAnimationFrame(update);
      tickingRef.current = true;
    }
  }, [lerpSmoothness, elementLerpFactor]);

  // Scroll handler
  const onScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
    if (!tickingRef.current) {
      requestAnimationFrame(update);
      tickingRef.current = true;
    }
  }, [update]);

  // Resize handler
  const onResize = useCallback(() => {
    if (resizeTimerRef.current) {
      clearTimeout(resizeTimerRef.current);
    }
    
    resizeTimerRef.current = window.setTimeout(() => {
      // Reset all transforms
      elementsRef.current.forEach(item => {
        item.el.style.transform = '';
        item.el.style.willChange = '';
      });
      
      elementsRef.current = [];
      
      // Re-initialize
      const newElements = collectElements();
      elementsRef.current = newElements;
      
      if (ioRef.current) {
        ioRef.current.disconnect();
        ioRef.current = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            const found = elementsRef.current.find(e => e.el === entry.target);
            if (found) found.visible = entry.isIntersecting;
          });
        }, { rootMargin: '100px' });
        
        newElements.forEach(item => ioRef.current?.observe(item.el));
      }
      
      scrollYRef.current = window.scrollY;
      smoothScrollYRef.current = scrollYRef.current;
      onScroll();
    }, 200);
  }, [collectElements, onScroll]);

  // Initialize IntersectionObserver
  const initObserver = useCallback((elements: ParallaxElement[]) => {
    if (ioRef.current) {
      ioRef.current.disconnect();
    }
    
    ioRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const found = elements.find(e => e.el === entry.target);
        if (found) found.visible = entry.isIntersecting;
      });
    }, { rootMargin: '100px' });

    elements.forEach(item => ioRef.current?.observe(item.el));
  }, []);

  // Main initialization
  const init = useCallback(() => {
    const newElements = collectElements();
    elementsRef.current = newElements;
    initObserver(newElements);
    
    scrollYRef.current = window.scrollY;
    smoothScrollYRef.current = scrollYRef.current;
    onScroll();
  }, [collectElements, initObserver, onScroll]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile.current) {
        isMobile.current = mobile;
        // Force recollect on mobile change
        if (resizeTimerRef.current) {
          clearTimeout(resizeTimerRef.current);
        }
        onResize();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onResize]);

  // Main effect
  useEffect(() => {
    // Skip if user prefers reduced motion
    if (prefersReduced) return;

    // Check if mobile
    isMobile.current = window.innerWidth < 768;

    // Initialize
    init();

    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Add resize listener
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      
      if (ioRef.current) {
        ioRef.current.disconnect();
      }
      
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      
      // Reset all transforms
      elementsRef.current.forEach(item => {
        item.el.style.transform = '';
        item.el.style.willChange = '';
      });
    };
  }, [init, onScroll, onResize]);
}

/**
 * useParallaxElement Hook
 * For individual element parallax control
 * 
 * @example
 * ```tsx
 * const ref = useParallaxElement<HTMLDivElement>({
 *   speed: 0.15,
 *   dir: 'up'
 * });
 * return <div ref={ref} data-parallax={speed}>...</div>
 * ```
 */
export function useParallaxElement<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { speed = 0.15, speedX = 0, dir = 'up' } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set data attributes for the main parallax system
    element.dataset.parallax = String(speed);
    if (speedX) element.dataset.parallaxX = String(speedX);
    if (dir !== 'up') element.dataset.parallaxDir = dir;

    return () => {
      // Clean up
      if (element) {
        element.style.transform = '';
        element.style.willChange = '';
        delete element.dataset.parallax;
        delete element.dataset.parallaxX;
        delete element.dataset.parallaxDir;
      }
    };
  }, [speed, speedX, dir]);

  return ref;
}

export default useParallax;