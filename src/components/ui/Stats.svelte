<script lang="ts">
  import { onMount } from 'svelte';

  const stats = [
    { value: '2019', label: 'Engineering career began', operator: '', color: 'stat-item--cyan', bg: '#38bdf8' },
    { value: '10', label: 'Systems Delivered', operator: '+', color: 'stat-item--orange', bg: '#f97316' },
    { value: '30', label: 'HR workload reduced', operator: '%', color: 'stat-item--teal', bg: '#2dd4bf' },
    { value: '15', label: 'Application load time improved', operator: '%', color: 'stat-item--purple', bg: '#a78bfa' },
  ];

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
          const target = Number.parseInt(digit.dataset.count ?? '0', 10);
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

<div class="stats-grid reveal reveal-delay-3 default" bind:this={statsGrid}>
  {#each stats as stat}
    <div class={`stat-item default ${stat.color}`}>
      <div class="stat-number default" style={`color:${stat.bg}`}>
        <span
          class="digit"
          data-count={stat.value}
        >0</span>
        <span class="suffix" style={`color:${stat.bg}`}>{stat.operator}</span>
      </div>
      <div class="stat-label">{stat.label}</div>
    </div>
  {/each}
</div>
