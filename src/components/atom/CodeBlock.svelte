<script lang="ts">
  import { highlightLine } from '../../lib/highlight-code';

  export let source = '';
  export let language = 'python';
  export let showLineNumbers = true;
  export let wrapLongLines = false;
  $: lines = source.replace(/\n$/, '').split('\n');
</script>

<pre class="highlight-code" class:wrap={wrapLongLines} aria-label={`${language} source code`}><code>{#each lines as line, index}<span class="code-line">{#if showLineNumbers}<span class="line-number" aria-hidden="true">{index + 1}</span>{/if}{#each highlightLine(line, language) as token}<span class={`token-${token.kind}`}>{token.value}</span>{/each}</span>{/each}</code></pre>

