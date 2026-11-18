type ParallaxOptions = { enabled?: boolean };
type ParallaxTarget = {
  element: HTMLElement;
  speed: number;
  direction: number;
  speedX: number;
  originY: number;
  currentY: number;
  currentX: number;
  visible: boolean;
};

const automaticTargets: Array<[string, number, number]> = [
  ['.bg-dots', 0.12, -1],
  ['.bg-dots-br', 0.18, -1],
  ['.orb', 0.10, -1],
  ['.orb-ring', 0.07, -1],
  ['.orb-ring-2', 0.05, -1],
  ['.hero-eyebrow', 0.06, -1],
  ['.hero-name-first', 0.04, -1],
  ['.hero-name-last', 0.04, -1],
  ['.hero-role', 0.03, -1],
  ['.hero-desc', 0.02, -1],
  ['.hero-rust-badge', 0.01, -1],
  ['.hero-cta', 0.01, -1],
  ['.term-card', 0.14, -1],
  ['.term-card-back', 0.20, -1],
  ['.term-card-back-left', 0.20, -1],
  ['.bg-notches', 0.08, 1],
  ['.stat-item', 0.04, -1],
  ['.stats-grid', 0.04, -1],
  ['.tech-card', 0.03, -1],
  ['.glass-card', 0.03, -1],
  ['.project-card', 0.04, -1],
  ['.about-section-card', 0.04, -1],
  ['.exp-item', 0.03, -1],
];

export function parallax(node: HTMLElement, options: ParallaxOptions = {}) {
  let enabled = options.enabled ?? true;
  let mobile = window.innerWidth < 768;
  let scrollY = window.scrollY;
  let smoothScrollY = scrollY;
  let targets: ParallaxTarget[] = [];
  let frame = 0;
  let resizeTimer = 0;
  let intersectionObserver: IntersectionObserver | undefined;
  let mutationObserver: MutationObserver | undefined;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

  function clearTargets() {
    intersectionObserver?.disconnect();
    targets.forEach(({ element }) => {
      element.style.transform = '';
      element.style.willChange = '';
    });
    targets = [];
  }

  function collectTargets() {
    clearTargets();
    if (!enabled || reduceMotion) return;

    const collected = new Map<HTMLElement, Omit<ParallaxTarget, 'visible'>>();
    const dampen = mobile ? 0.5 : 1;
    const add = (element: HTMLElement, speed: number, direction: number, speedX = 0) => {
      if (getComputedStyle(element).position === 'fixed' || getComputedStyle(element).position === 'sticky') return;
      const rect = element.getBoundingClientRect();
      collected.set(element, {
        element,
        speed: speed * dampen,
        direction,
        speedX,
        originY: rect.top + window.scrollY,
        currentY: 0,
        currentX: 0,
      });
    };

    node.querySelectorAll<HTMLElement>('[data-parallax]').forEach((element) => {
      add(
        element,
        Number.parseFloat(element.dataset.parallax || '0.15'),
        element.dataset.parallaxDir === 'down' ? 1 : -1,
        Number.parseFloat(element.dataset.parallaxX || '0'),
      );
    });

    for (const [selector, speed, direction] of automaticTargets) {
      node.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        if (!element.dataset.parallax) add(element, speed, direction);
      });
    }

    targets = [...collected.values()].map((target) => ({ ...target, visible: true }));
    intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = targets.find((item) => item.element === entry.target);
        if (target) target.visible = entry.isIntersecting;
      });
    }, { rootMargin: '100px' });
    targets.forEach(({ element }) => intersectionObserver?.observe(element));
    scrollY = window.scrollY;
    smoothScrollY = scrollY;
    schedule();
  }

  function animate() {
    frame = 0;
    smoothScrollY = lerp(smoothScrollY, scrollY, 0.08);
    let moving = Math.abs(smoothScrollY - scrollY) > 0.5;
    const viewportHeight = window.innerHeight;

    targets.forEach((target) => {
      if (!target.visible) return;
      const centerOffset = target.originY - smoothScrollY - viewportHeight / 2;
      const nextY = Math.max(-120, Math.min(120, centerOffset * target.speed * target.direction));
      const nextX = target.speedX
        ? Math.max(-40, Math.min(40, (smoothScrollY - target.originY) * target.speedX))
        : 0;
      target.currentY = lerp(target.currentY, nextY, 0.06);
      target.currentX = lerp(target.currentX, nextX, 0.06);
      target.element.style.transform = `translate3d(${target.currentX}px, ${target.currentY}px, 0)`;
      target.element.style.willChange = 'transform';
      if (Math.abs(target.currentY - nextY) > 0.1 || Math.abs(target.currentX - nextX) > 0.1) moving = true;
    });

    if (moving) schedule();
  }

  function schedule() {
    if (!frame && enabled && !reduceMotion) frame = requestAnimationFrame(animate);
  }

  const onScroll = () => {
    scrollY = window.scrollY;
    schedule();
  };
  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const nextMobile = window.innerWidth < 768;
      if (mobile !== nextMobile) mobile = nextMobile;
      collectTargets();
    }, 200);
  };

  if (enabled && !reduceMotion) {
    collectTargets();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    mutationObserver = new MutationObserver(() => collectTargets());
    mutationObserver.observe(node, { childList: true, subtree: true });
  }

  return {
    update(nextOptions: ParallaxOptions) {
      const nextEnabled = nextOptions.enabled ?? true;
      if (enabled === nextEnabled) return;
      enabled = nextEnabled;
      if (enabled) {
        collectTargets();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });
        mutationObserver = new MutationObserver(() => collectTargets());
        mutationObserver.observe(node, { childList: true, subtree: true });
      } else {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        mutationObserver?.disconnect();
        clearTargets();
      }
    },
    destroy() {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
      mutationObserver?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      clearTargets();
    },
  };
}
