<script lang="ts">
  import { onMount } from 'svelte';

  const text = Array.from('Java at Core. Engineering Beyond Boundaries.');
  const rustStart = text.join('').indexOf('Rust');
  let count = 0;
  let mode: 'typing' | 'deleting' | 'paused' = 'typing';
  let showCursor = true;
  let timer: ReturnType<typeof setTimeout>;
  let stopTimer: ReturnType<typeof setTimeout>;
  let running = true;

  function tick() {
    if (!running) return;
    if (mode === 'typing') {
      if (count < text.length) {
        count += 1;
        timer = setTimeout(tick, 70 + Math.random() * 30);
      } else {
        mode = 'paused';
        timer = setTimeout(() => { mode = 'deleting'; tick(); }, 800);
      }
    } else if (mode === 'deleting') {
      if (count > 0) {
        count -= 1;
        timer = setTimeout(tick, 40);
      } else {
        mode = 'typing';
        timer = setTimeout(tick, 400);
      }
    }
  }

  function restart() {
    clearTimeout(timer);
    clearTimeout(stopTimer);
    running = true;
    showCursor = true;
    mode = 'typing';
    count = 0;
    timer = setTimeout(tick, 0);
    stopTimer = setTimeout(() => { running = false; showCursor = false; clearTimeout(timer); }, 120_000);
  }

  onMount(() => {
    timer = setTimeout(tick, 500);
    stopTimer = setTimeout(() => { running = false; showCursor = false; clearTimeout(timer); }, 120_000);
    return () => { clearTimeout(timer); clearTimeout(stopTimer); };
  });
</script>

<button type="button" class="typing-restart" aria-label="Restart footer typing animation" onclick={restart}>
  <span class="typing-animation">{#each text.slice(0, count) as char, index}<span class:typing-heart={char === '♥'} class:typing-crab={char === '🦀'} class:typing-rust={index >= rustStart && index < rustStart + 4} class="text-text">{char}</span>{/each}{#if showCursor}<span class="typing-cursor">|</span>{/if}</span>
</button>

