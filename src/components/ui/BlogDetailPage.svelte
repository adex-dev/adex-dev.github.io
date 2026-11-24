<script lang="ts">
  import { onMount } from 'svelte';
  import type { Blog, BlogPreview } from '../../lib/blog';
  import { blogDate, blogExcerpt, blogUrl } from '../../lib/blog';
  import { parseBlogArticle, type ArticleNode } from '../../lib/blog-article';
  import BlogCover from '../atom/BlogCover.svelte';
  import CodePanel from '../atom/CodePanel.svelte';

  export let post: Blog;
  export let latest: BlogPreview[] = [];

  type ReaderSize = 'small' | 'normal' | 'large';
  type ReaderWidth = 'standard' | 'wide';
  type ReaderTheme = 'auto' | 'light' | 'dark';
  const readerStorageKey = 'portfolio-blog-reading-preferences';
  let readerSize: ReaderSize = 'normal';
  let readerWidth: ReaderWidth = 'standard';
  let readerTheme: ReaderTheme = 'dark';
  let readerSettingsOpen = true;
  export let mobileReaderMenuOpen = false;
  let readerPreferencesReady = false;
  let systemPrefersLight = false;
  $: effectiveReaderTheme = readerTheme === 'auto' ? (systemPrefersLight ? 'light' : 'dark') : readerTheme;

  onMount(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(readerStorageKey) ?? '{}') as Record<string, unknown>;
      if (saved.size === 'small' || saved.size === 'normal' || saved.size === 'large') readerSize = saved.size;
      if (saved.width === 'standard' || saved.width === 'wide') readerWidth = saved.width;
      if (saved.theme === 'auto' || saved.theme === 'light' || saved.theme === 'dark') readerTheme = saved.theme;
    } catch {
      // Keep the defaults if saved preferences are unavailable or malformed.
    }

    const colorScheme = window.matchMedia('(prefers-color-scheme: light)');
    const syncSystemTheme = () => { systemPrefersLight = colorScheme.matches; };
    syncSystemTheme();
    colorScheme.addEventListener('change', syncSystemTheme);
    readerPreferencesReady = true;
    return () => colorScheme.removeEventListener('change', syncSystemTheme);
  });

  $: if (readerPreferencesReady) {
    try {
      localStorage.setItem(readerStorageKey, JSON.stringify({ size: readerSize, width: readerWidth, theme: readerTheme }));
    } catch {
      // Reading preferences still work for the current page if storage is blocked.
    }
  }
  function collectHeadings(nodes: ArticleNode[]) {
    const headings: { node: ArticleNode; id: string; title: string; level: number }[] = [];
    const visit = (items: ArticleNode[]) => {
      for (const node of items) {
        if (node.kind !== 'element') continue;
        if (/^h[2-6]$/.test(node.tag)) {
          const title = textContent(node.children).trim();
          if (title) {
            const slug = title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
            headings.push({ node, id: `section-${headings.length + 1}-${slug}`, title, level: Number(node.tag.slice(1)) });
          }
        }
        visit(node.children);
      }
    };
    visit(nodes);
    return headings;
  }

  function textContent(nodes: ArticleNode[]): string {
    return nodes.map(node => node.kind === 'text' ? node.value : node.kind === 'element' ? textContent(node.children) : '').join('');
  }

  $: article = parseBlogArticle(post.article);
  $: contents = collectHeadings(article);
  $: headingIds = new Map(contents.map(item => [item.node, item.id]));
  $: summary = blogExcerpt(post.article);
  $: author = post.fullname?.trim();
  $: authorJob = post.author_jobs?.trim();
  $: authorAbout = post.author_about?.trim();
  $: initials = author?.split(/\s+/).slice(0, 2).map(part => Array.from(part)[0]).join('').toUpperCase();
  $: categories = [...new Set([post.categories?.trim(), post.sub_categories?.trim()].filter(Boolean))];
  $: moreArticles = latest.filter(item => item.id !== post.id).slice(0, 3);

  $: articleUrl = new URL(blogUrl(post.urls_prefix), 'https://akmadnudin.com').href;
  $: shareLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/sharing/share-offsite/?' + new URLSearchParams({ url: articleUrl }) },
    { label: 'X', href: 'https://twitter.com/intent/tweet?' + new URLSearchParams({ url: articleUrl, text: post.title }) },
    { label: 'WhatsApp', href: 'https://wa.me/?' + new URLSearchParams({ text: post.title + '\n' + articleUrl }) },
  ];
</script>

{#snippet renderNodes(nodes: ArticleNode[])}
  {#each nodes as node}
    {#if node.kind === 'text'}{node.value}
    {:else if node.kind === 'code'}
      <CodePanel source={node.source} language={node.language} title={node.title} />
    {:else if node.tag === 'br'}
      <br />
    {:else if node.tag === 'hr'}
      <hr />
    {:else if node.tag === 'a'}
      {#if node.href}
        <a href={node.href}>{@render renderNodes(node.children)}</a>
      {:else}
        {@render renderNodes(node.children)}
      {/if}
    {:else}
      <svelte:element this={node.tag} id={headingIds.get(node)}>{@render renderNodes(node.children)}</svelte:element>
    {/if}
  {/each}
{/snippet}

<article class={`blog-shell blog-detail`}>
  <header class={`blog-detail-header reader-theme-${effectiveReaderTheme}`}>
    <a href="/blogs" class="blog-read">← All articles</a>
    <h1>{post.title}</h1>
    {#if summary}<p>{summary}</p>{/if}
  </header>

  <div class={`blog-reading-layout reader-width-${readerWidth} ${contents.length > 1 ? 'has-toc' : 'no-toc'}`}>
    <BlogCover url={post.url_images} detail />

    {#if contents.length > 1}
      <details class="blog-table-of-contents" open>
        <summary>Contents</summary>
        <div class="blog-table-of-contents-links" role="navigation" aria-label="Table of contents">
          <ol>
            {#each contents as item (item.id)}
              <li class={`toc-level-${item.level}`}><a href={`#${item.id}`}>{item.title}</a></li>
            {/each}
          </ol>
        </div>
      </details>
    {/if}

    <div class="blog-sidebar">
      <aside class="blog-details" aria-label="Article details">
      {#if categories.length}
        <section>
          <h2>Category</h2>
          <ul class="blog-category-tags">
            {#each categories as category}
              <li>{category}</li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if author || authorJob || authorAbout}
        <section>
          <h2>Written by</h2>
          <div class="blog-author">
            {#if initials}<span class="blog-author-avatar" aria-hidden="true">{initials}</span>{/if}
            <div>
              {#if author}<p class="blog-author-name">{author}</p>{/if}
              {#if authorJob}<p>{authorJob}</p>{/if}
            </div>
          </div>
          {#if authorAbout}<p class="blog-author-about">{authorAbout}</p>{/if}
        </section>
      {/if}

      <dl>
        {#if blogDate(post.created_at)}<div><dt>Published</dt><dd>{blogDate(post.created_at)}</dd></div>{/if}
        {#if post.readings != null}<div><dt>Readings</dt><dd>{post.readings}</dd></div>{/if}
        {#if post.modifed_at !== post.created_at && blogDate(post.modifed_at)}
          <div><dt>Updated</dt><dd>{blogDate(post.modifed_at)}</dd></div>
        {/if}
      </dl>

      <section>
        <h2>Share article</h2>
        <ul class="blog-share">
          {#each shareLinks as link (link.label)}
            <li>
              <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={'Share on ' + link.label} title={link.label}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  {#if link.label === 'LinkedIn'}
                    <circle cx="5" cy="5" r="2" />
                    <path d="M3 9h4v12H3zm7 0h4v1.5a4 4 0 0 1 7 2.5v8h-4v-7a1.5 1.5 0 0 0-3 0v7h-4z" />
                  {:else if link.label === 'X'}
                    <path d="M17.4 3h3.1l-6.8 7.7L21.7 21h-6.2l-4.8-6.2L5.2 21H2.1l7.3-8.3L2 3h6.4l4.3 5.7zm-1.1 16.2H18L7.5 4.7H5.6z" />
                  {:else}
                    <path d="M20.4 3.6A11.7 11.7 0 0 0 2 17.6L.5 23.5l6-1.6a11.7 11.7 0 0 0 13.9-18.3ZM12 21a9.7 9.7 0 0 1-4.9-1.3l-.3-.2-3.5.9.9-3.4-.2-.4A9.7 9.7 0 1 1 12 21Zm5.4-7.1c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 8.4 8.4 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.3 0-.5l-1-2.3c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.4 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" />
                  {/if}
                </svg>
              </a>
            </li>
          {/each}
        </ul>
      </section>
      </aside>

      <section id="blog-display-settings" class="blog-display-settings" class:is-open={mobileReaderMenuOpen} aria-label="Reading display settings">
        <header>
          <strong>Display</strong>
          <div class="blog-display-actions">
            <button class="blog-display-collapse" type="button" aria-expanded={readerSettingsOpen} onclick={() => readerSettingsOpen = !readerSettingsOpen}>
              {readerSettingsOpen ? 'Hide' : 'Show'}
            </button>
            <button class="blog-display-close" type="button" aria-label="Close reading settings" onclick={() => mobileReaderMenuOpen = false}>×</button>
          </div>
        </header>
        {#if readerSettingsOpen}
          <div class="blog-display-options">
            <fieldset>
              <legend>Text</legend>
              <label><input type="radio" name="reader-size" bind:group={readerSize} value="small" /> Small</label>
              <label><input type="radio" name="reader-size" bind:group={readerSize} value="normal" /> Standard</label>
              <label><input type="radio" name="reader-size" bind:group={readerSize} value="large" /> Large</label>
            </fieldset>
            <fieldset>
              <legend>Width</legend>
              <label><input type="radio" name="reader-width" bind:group={readerWidth} value="standard" /> Standard</label>
              <label><input type="radio" name="reader-width" bind:group={readerWidth} value="wide" /> Wide</label>
            </fieldset>
            <fieldset>
              <legend>Color</legend>
              <label><input type="radio" name="reader-theme" bind:group={readerTheme} value="auto" /> Automatic</label>
              <label><input type="radio" name="reader-theme" bind:group={readerTheme} value="light" /> Light</label>
              <label><input type="radio" name="reader-theme" bind:group={readerTheme} value="dark" /> Dark</label>
            </fieldset>
          </div>
        {/if}
      </section>
    </div>

    <button class="blog-reader-backdrop" class:is-open={mobileReaderMenuOpen} type="button" aria-label="Close reading settings" tabindex={mobileReaderMenuOpen ? 0 : -1} onclick={() => mobileReaderMenuOpen = false}></button>

    <div class={`blog-prose reader-size-${readerSize} reader-width-${readerWidth} reader-theme-${effectiveReaderTheme}`}>
      <div class="blog-content">
        {@render renderNodes(article)}
      </div>
    </div>
  </div>

  {#if moreArticles.length}
    <section class="blog-latest" aria-labelledby="blog-latest-title">
      <header>
        <h2 id="blog-latest-title">Latest articles</h2>
        <a class="blog-read" href="/blogs">View all articles <span aria-hidden="true">↗</span></a>
      </header>
      <div class="blog-grid">
        {#each moreArticles as item (item.id)}
          <article class="blog-card">
            <a class="blog-card-link" href={blogUrl(item.urls_prefix)}>
              <BlogCover url={item.url_images} />
              <div class="blog-card-body"><h3>{item.title}</h3></div>
            </a>
          </article>
        {/each}
      </div>
    </section>
  {/if}
</article>
