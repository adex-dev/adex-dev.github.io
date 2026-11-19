<script lang="ts">
  import BlogCover from '../atom/BlogCover.svelte';
  import Lottie from '../atom/Lottie.svelte';
  import { blogDate, blogExcerpt, blogUrl, fetchBlogPage } from '../../lib/blog';
  import type { BlogCategory, BlogPage } from '../../lib/blog';

  export let initial: BlogPage;
  export let categories: BlogCategory[];

  let posts = initial.posts;
  let hasMore = initial.hasMore;
  let category = '';
  let searchInput = '';
  let search = '';
  let loading = false;
  let error = '';
  let request = 0;

  async function load(reset = false) {
    if (!reset && (loading || !hasMore)) return;
    const current = ++request;
    loading = true;
    error = '';
    if (reset) {
      posts = [];
      hasMore = true;
    }

    try {
      const next = await fetchBlogPage(posts[posts.length - 1]?.id, category, search);
      if (current !== request) return;
      posts = [...posts, ...next.posts];
      hasMore = next.hasMore;
    } catch {
      if (current === request) error = 'Articles could not be loaded. Please try again.';
    } finally {
      if (current === request) loading = false;
    }
  }

  function observeMore(node: HTMLElement) {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !error) void load();
    }, { rootMargin: '300px 0px' });
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }

  function submitSearch(event: SubmitEvent) {
    event.preventDefault();
    search = searchInput.trim();
    void load(true);
  }
</script>

<section class="blog-shell">
  <header class="blog-hero">
    <div>
      <div class="section-tag"><span class="section-tag-text">Blog</span><span class="section-tag-line"></span></div>
      <h1>Notes on building software</h1>
      <p>Articles on backend engineering, integrations, and the work behind reliable applications.</p>
      <form class="blog-search" onsubmit={submitSearch} role="search">
        <label for="blog-search" class="sr-only">Search article titles</label>
        <input id="blog-search" type="search" placeholder="Search articles" bind:value={searchInput} />
        <button class="btn-glow glow-teal" type="submit">Search</button>
      </form>
    </div>
    <div class="blog-art" aria-hidden="true"><span>&lt;/&gt;</span></div>
  </header>

  <div class="blog-filters" aria-label="Filter by category" role="group">
    <button type="button" aria-pressed={!category} onclick={() => { category = ''; void load(true); }}>All articles</button>
    {#each categories as item (item.id)}
      <button type="button" aria-pressed={category === item.name} onclick={() => { category = item.name; void load(true); }}>{item.name}</button>
    {/each}
  </div>

  <div class="blog-grid">
    {#each posts as post (post.id)}
      <article class="blog-card">
        <a class="blog-card-link" href={blogUrl(post.urls_prefix)}>
          <BlogCover url={post.url_images} />
          <div class="blog-card-body">
            <div class="blog-meta">
              {#if post.categories}<span>{post.categories}</span>{/if}
              {#if blogDate(post.created_at)}<span>{blogDate(post.created_at)}</span>{/if}
            </div>
            <h2>{post.title}</h2>
            {#if post.article}<p>{blogExcerpt(post.article)}</p>{/if}
            <span class="blog-read">Read article <span aria-hidden="true">↗</span></span>
          </div>
        </a>
      </article>
    {/each}
  </div>

  <div class="blog-pagination">
    {#if error}
      <p role="alert">{error}</p>
      <button class="btn-outline-grad" type="button" onclick={() => load()}>Try again</button>
    {:else if loading}
      <div role="status"><span class="sr-only">Loading articles</span><Lottie size={44} /></div>
    {:else if hasMore}
      <button class="btn-outline-grad" type="button" use:observeMore onclick={() => load()}>Load more articles</button>
    {:else if !posts.length}
      <p role="status">No articles found.</p>
    {/if}
  </div>
</section>
