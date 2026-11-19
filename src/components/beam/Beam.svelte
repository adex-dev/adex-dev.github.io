<script lang="ts">
  import { onMount } from 'svelte';

  export let variant: 'rust' | 'teal' | 'dual' | 'glass' = 'rust';
  export let radius = 8;
  export let strokeWidth = 1;
  export let className = '';
  export let classBeam = '';
  export let gradientKey = 'beam';
  export let active = false;

  let container: HTMLDivElement;
  let rect: SVGRectElement;
  let pointerOver = false;
  let animating = false;
  let width = 0;
  let height = 0;
  const colors = { rust: ['#E07050', '#C85E3A'], teal: ['#2DD4BF', '#0F766E'], dual: ['#2DD4BF', '#C85E3A'], glass: ['#ffffff', '#64748b'] };
  $: gradientId = `beam-${variant}-${gradientKey}`;

  function setActive(next: boolean) {
    if (!rect || animating === next) return;
    animating = next;
    const length = rect.getTotalLength();
    if (next) {
      rect.style.opacity = '1';
      rect.style.transition = 'none';
      rect.style.strokeDashoffset = `${length}`;
      rect.getBoundingClientRect();
      requestAnimationFrame(() => {
        if (!rect) return;
        rect.style.transition = 'stroke-dashoffset .65s cubic-bezier(.4,0,.2,1)';
        rect.style.strokeDashoffset = '0';
      });
    } else {
      rect.style.transition = 'stroke-dashoffset .45s cubic-bezier(.4,0,.2,1), opacity .25s ease .25s';
      rect.style.strokeDashoffset = `${length}`;
      rect.style.opacity = '0';
    }
  }
  $: if (rect) setActive(active || pointerOver);

  onMount(() => {
    const update = () => {
      if (!container || !rect) return;
      const bounds = container.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      requestAnimationFrame(() => {
        if (!rect) return;
        rect.setAttribute('x', '0');
        rect.setAttribute('y', '0');
        rect.setAttribute('width', String(width));
        rect.setAttribute('height', String(height));
        rect.setAttribute('rx', String(radius));
        rect.setAttribute('ry', String(radius));
        const length = rect.getTotalLength();
        rect.style.strokeDasharray = `${length}`;
        rect.style.strokeDashoffset = `${length}`;
        if (!animating) rect.style.opacity = '0';
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    const enter = () => { pointerOver = true; };
    const leave = () => { pointerOver = false; };
    container.addEventListener('pointerenter', enter);
    container.addEventListener('pointerleave', leave);
    return () => {
      observer.disconnect();
      container.removeEventListener('pointerenter', enter);
      container.removeEventListener('pointerleave', leave);
    };
  });
</script>

<div class={`beamborder shadow-2xl shadow-gray-700 ${classBeam}`} bind:this={container}>
  <svg class={`beam-svg ${className}`} width="100%" height="100%" aria-hidden="true">
    <defs><linearGradient id={gradientId} x1="0%" y1="0%" x2={variant === 'dual' ? '100%' : '100%'} y2={variant === 'dual' ? '100%' : '0%'}><stop offset="0%" stop-color={colors[variant][0]} /><stop offset="100%" stop-color={colors[variant][1]} /></linearGradient></defs>
    <rect bind:this={rect} class="beam-rect" stroke={`url(#${gradientId})`} stroke-width={strokeWidth} fill="none" />
  </svg>
  <slot />
</div>
