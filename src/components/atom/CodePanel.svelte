<script lang="ts">
  import CodeBlock from './CodeBlock.svelte';

  export let source: string;
  export let language: string;
  export let title: string;
</script>

<div class="code-block">
  <div class="code-bar">
    <div class="code-dots" aria-hidden="true">
      <span class="cd r"></span><span class="cd y"></span><span class="cd g"></span>
    </div>
    <span class="code-fname">{title}</span>
  </div>
  <CodeBlock {source} {language} />
</div>
