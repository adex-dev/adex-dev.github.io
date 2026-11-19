export function reveal(node: HTMLElement, selector = '') {
  const targets = selector ? Array.from(node.querySelectorAll<HTMLElement>(selector)) : [node];
  const show = () => targets.forEach((target) => target.classList.add('visible'));

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    show();
    return { destroy() {} };
  }

  const observed = new WeakSet<Element>();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const observeTargets = () => {
    const current = selector ? node.querySelectorAll<HTMLElement>(selector) : [node];
    current.forEach((target) => {
      if (!observed.has(target)) {
        observed.add(target);
        observer.observe(target);
      }
    });
  };
  observeTargets();
  const mutations = new MutationObserver(observeTargets);
  mutations.observe(node, { childList: true, subtree: true });
  return { destroy: () => { observer.disconnect(); mutations.disconnect(); } };
}
