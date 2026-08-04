import { useEffect, useRef, useCallback, RefObject } from 'react';

interface UseRevealOptions {
  /** Threshold for intersection observer (0-1), default 0.12 */
  threshold?: number;
  /** Root margin, default '0px 0px -40px 0px' */
  rootMargin?: string;
  /** Transition delay in seconds, default 0.65 */
  transitionDuration?: number;
  /** Whether to unobserve after reveal, default true */
  unobserveAfterReveal?: boolean;
}

interface UseRevealElementOptions {
  /** Delay before reveal in seconds */
  delay?: number;
  /** Custom class name for reveal, default 'reveal' */
  revealClass?: string;
}

/**
 * useReveal Hook
 * Automatically reveals elements on scroll with fade + slide-up animation
 * 
 * @example
 * ```tsx
 * // Enable globally with default config
 * useReveal();
 * 
 * // Or with custom config
 * useReveal({ threshold: 0.2, transitionDuration: 0.8 });
 * ```
 */
export function useReveal(config: UseRevealOptions = {}): void {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -40px 0px',
    transitionDuration = 0.65,
    unobserveAfterReveal = true,
  } = config;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const initializedRef = useRef<boolean>(false);

  // Default selectors for auto-reveal
  const getDefaultSelectors = useCallback(() => [
    '.skill-card',
    '.sc',
    '.pc',
    '.cc',
    '.exp-item',
    '.tcard',
    '.tl-item',
    '.stat',
    '.stat-grad',
    '.about-fact',
    '.process-step',
    '.rc',
    '.term-item',
  ], []);

  // Inject CSS styles
  const injectStyles = useCallback(() => {
    const styleId = 'use-reveal-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .reveal {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity ${transitionDuration}s cubic-bezier(0.4, 0, 0.2, 1),
                    transform ${transitionDuration}s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .reveal.is-visible {
        opacity: 1;
        transform: translateY(0) !important;
      }
      .reveal-delay-1 { transition-delay: 0.1s; }
      .reveal-delay-2 { transition-delay: 0.2s; }
      .reveal-delay-3 { transition-delay: 0.3s; }
      .reveal-delay-4 { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
  }, [transitionDuration]);

  // Add reveal classes to elements
  const addRevealClasses = useCallback(() => {
    const selectors = getDefaultSelectors();
    
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        const htmlEl = el as HTMLElement;
        // Skip if already has reveal class
        if (htmlEl.classList.contains('reveal')) return;
        
        htmlEl.classList.add('reveal');
        
        // Add staggered delays based on index
        const delayIndex = i % 4;
        if (delayIndex === 1) htmlEl.classList.add('reveal-delay-1');
        else if (delayIndex === 2) htmlEl.classList.add('reveal-delay-2');
        else if (delayIndex === 3) htmlEl.classList.add('reveal-delay-3');
      });
    });
  }, [getDefaultSelectors]);

  // Setup intersection observer
  const setupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (unobserveAfterReveal) {
            observerRef.current?.unobserve(entry.target);
          }
        }
      });
    }, { threshold, rootMargin });

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
      observerRef.current?.observe(el);
    });
  }, [threshold, rootMargin, unobserveAfterReveal]);

  // Main effect
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    injectStyles();
    addRevealClasses();
    setupObserver();

    // Also observe dynamically added elements
    const mutationObserver = new MutationObserver(() => {
      // Check for new elements that should have reveal class
      const selectors = getDefaultSelectors();
      let hasChanges = false;

      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach((el, i) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.classList.contains('reveal')) return;
          
          htmlEl.classList.add('reveal');
          const delayIndex = i % 4;
          if (delayIndex === 1) htmlEl.classList.add('reveal-delay-1');
          else if (delayIndex === 2) htmlEl.classList.add('reveal-delay-2');
          else if (delayIndex === 3) htmlEl.classList.add('reveal-delay-3');
          hasChanges = true;
        });
      });

      if (hasChanges && observerRef.current) {
        document.querySelectorAll('.reveal').forEach(el => {
          if (!observerRef.current?.observedElements?.includes(el)) {
            observerRef.current?.observe(el);
          }
        });
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      mutationObserver.disconnect();
      
      // Clean up styles
      const style = document.getElementById('use-reveal-styles');
      if (style) style.remove();
    };
  }, [injectStyles, addRevealClasses, setupObserver, getDefaultSelectors]);
}

export function useRevealElement<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealElementOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { delay, revealClass = 'reveal' } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Add reveal class
    element.classList.add(revealClass);
    
    // Add delay if specified
    if (delay) {
      element.style.transitionDelay = `${delay}s`;
    }

    // Setup intersection observer for this element
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.12 });

    observer.observe(element);

    return () => {
      observer.disconnect();
      element.classList.remove(revealClass, 'is-visible');
      element.style.transitionDelay = '';
    };
  }, [delay, revealClass]);

  return ref;
}
export function useRevealInView<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.12
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isInView];
}

// Need to import useState for useRevealInView
import { useState } from 'react';

export default useReveal;