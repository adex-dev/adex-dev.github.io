// src/hooks/useRevealOnScroll.ts
import { useEffect, useRef } from 'react';

interface UseRevealOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
  className?: string;
  selector?: string | string[];
  once?: boolean;
  delay?: number;
  onReveal?: (element: HTMLElement) => void;
}

export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOnScrollOptions = {}
): React.RefObject<T | null> {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
    className = 'visible',
    selector = '.reveal',
    once = true,
    delay = 0,
    onReveal
  } = options;

  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observerOptions: IntersectionObserverInit = {
      root,
      rootMargin,
      threshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add(className);
            if (onReveal) {
              onReveal(entry.target as HTMLElement);
            }
            if (once) {
              observer.unobserve(entry.target);
            }
          }, index * delay);
        } else if (!once) {
          entry.target.classList.remove(className);
        }
      });
    }, observerOptions);

    const selectors = Array.isArray(selector) ? selector.join(', ') : selector;
    const elements = element.querySelectorAll<HTMLElement>(selectors);
    
    if (elements.length === 0) {
      observer.observe(element);
    } else {
      elements.forEach((el) => {
        observer.observe(el);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, className, selector, once, delay, onReveal]);

  return elementRef;
}