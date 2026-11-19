
<script lang="ts">
  import { onMount } from 'svelte';
  import type { AnimationItem } from 'lottie-web';

  let container: HTMLDivElement;
  let animation: AnimationItem | undefined;

  let {
    src = `${import.meta.env.BASE_URL}animations/loading.json`,
    loop = true,
    autoplay = true,
    size = 48
  } = $props();

  onMount(() => {
    let cancelled = false;

    async function init() {
      try {
        const lottie = (await import('lottie-web')).default;

        if (cancelled || !container) return;

        animation = lottie.loadAnimation({
          container,
          renderer: 'svg',
          loop,
          autoplay,
          path: src
        });
      } catch (error) {
        console.error('Lottie gagal dimuat:', error);
      }
    }

    init();

    return () => {
      cancelled = true;
      animation?.destroy();
    };
  });
</script>

<div
  class="inline-flex items-center justify-center shrink-0"
  style:width={`${size}px`}
  style:height={`${size}px`}
>
  <div
    bind:this={container}
    class="w-full h-full"
  ></div>
</div>
