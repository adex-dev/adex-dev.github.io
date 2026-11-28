<script lang="ts">
  import { onMount } from 'svelte';

  type StatItem = {
    value: string;
    label: string;
    operator: string;
    color: string;
    bg: string;
  };

  const experienceYears = Math.max(0, new Date().getFullYear() - 2019);
  const defaultStats: StatItem[] = [
    { value: String(experienceYears), label: 'Years of engineering experience', operator: '+', color: 'stat-item--cyan', bg: '#38bdf8' },
    { value: '10', label: 'Systems Delivered', operator: '+', color: 'stat-item--orange', bg: '#f97316' },
    { value: '30', label: 'HR workload reduced', operator: '%', color: 'stat-item--teal', bg: '#2dd4bf' },
    { value: '15', label: 'Application load time improved', operator: '%', color: 'stat-item--purple', bg: '#a78bfa' },
  ];

  export let stats: StatItem[] = defaultStats;

  let statsGrid: HTMLDivElement;

  onMount(() => {
    if (!statsGrid) return;

    const animateCount = (element: HTMLElement, target: number, duration: number) => {
      const start = 0;
      const startTime = performance.now();
      const update = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.floor(start + (target - start) * ease));
        if (progress < 1) requestAnimationFrame(update);
        else element.textContent = String(target);
      };
      requestAnimationFrame(update);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const digits = statsGrid.querySelectorAll<HTMLElement>('.digit');
        digits.forEach((digit, index) => {
          const count = digit.dataset.count;
          if (!count) return;
          const target = Number.parseInt(count, 10);
          window.setTimeout(() => animateCount(digit, target, 1800), index * 200);
        });
        statsObserver.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsGrid);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });
    document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => revealObserver.observe(element));

    return () => {
      statsObserver.disconnect();
      revealObserver.disconnect();
    };
  });
</script>

<div
  class={`stats-grid ${
    stats.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
  } reveal reveal-delay-3 default`}
  bind:this={statsGrid}
>
  {#each stats as stat}
    {@const isNumericValue = /^\d+$/.test(stat.value)}
    <div class={`stat-item default ${stat.color}`}>
      <div class="stat-number default" class:stat-number-text={!isNumericValue} style={`color:${stat.bg}`}>
        <span
          class="digit"
          data-count={isNumericValue ? stat.value : undefined}
        >{isNumericValue ? '0' : stat.value}</span>
        <span class="suffix" style={`color:${stat.bg}`}>{stat.operator}</span>
      </div>
      <div class="stat-label">{stat.label}</div>
    </div>
  {/each}
</div>
