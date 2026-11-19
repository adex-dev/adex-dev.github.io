<script lang="ts">
  export let url: string | null | undefined = undefined;
  export let detail = false;

  let failedUrl = '';
  $: source = url?.trim() ?? '';
  $: hasImage = /^(https?:\/\/|\/(?![\\/]))/i.test(source) && source !== failedUrl;
</script>

<div class={detail ? 'blog-cover blog-art blog-detail-art' : 'blog-cover blog-card-art'} aria-hidden="true">
  {#if detail}<span>&lt;/&gt;</span>{:else}&lt;/&gt;{/if}
  {#if hasImage}
    {#key source}
      <img src={source} alt="" loading={detail ? 'eager' : 'lazy'} onerror={() => failedUrl = source} />
    {/key}
  {/if}
</div>
