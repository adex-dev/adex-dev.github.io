<script lang="ts">
  import { onDestroy } from 'svelte';
  import CodeBlock from './CodeBlock.svelte';

  export let source: string;
  export let language: string;
  export let title: string;

  let copied = false;
  let resetTimer: ReturnType<typeof setTimeout>;

  async function copyCode() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(source);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = source;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const didCopy = document.execCommand('copy');
        textarea.remove();
        if (!didCopy) throw new Error('Copy command failed');
      }

      copied = true;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => copied = false, 1600);
    } catch (error) {
      console.error('Could not copy blog code block:', error);
      copied = false;
    }
  }

  onDestroy(() => clearTimeout(resetTimer));
</script>

<div class="code-block">
  <div class="code-bar">
    <div class="code-bar-info">
      <div class="code-dots" aria-hidden="true">
        <span class="cd r"></span><span class="cd y"></span><span class="cd g"></span>
      </div>
      <span class="code-fname">{title}</span>
    </div>
    <button
      type="button"
      class="code-copy-button"
      class:copied
      aria-label={copied ? 'Code copied' : 'Copy code'}
      title={copied ? 'Copied!' : 'Copy code'}
      onclick={copyCode}
    >
      {#if copied}
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
      {:else}
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></svg>
      {/if}
    </button>
  </div>
  <CodeBlock {source} {language} />
</div>
