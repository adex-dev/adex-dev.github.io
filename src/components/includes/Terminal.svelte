<script lang="ts">
  export let url = '';
</script>

<div class="terminal default">
  <div class="terminal-bar default">
    <span class="dot red default"></span><span class="dot yellow default"></span><span class="dot green default"></span>
    {#if url}<span class="terminal-url default">{url}</span>{:else}<span class="terminal-username default"></span>{/if}
  </div>
  <div class="terminal-body default"><slot /></div>
</div>
