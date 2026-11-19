<script lang="ts">
  import BlogCover from '../atom/BlogCover.svelte';
  import CodePanel from '../atom/CodePanel.svelte';
  import { blogDate, blogExcerpt, blogUrl } from '../../lib/blog';
  import { parseBlogArticle, type ArticleNode } from '../../lib/blog-article';
  import type { Blog, BlogPreview } from '../../lib/blog';

  export let post: Blog;
  export let latest: BlogPreview[] = [];
  $: article = parseBlogArticle(post.article);
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
      <svelte:element this={node.tag}>{@render renderNodes(node.children)}</svelte:element>
    {/if}
  {/each}
{/snippet}

<article class="blog-shell blog-detail">
  <header class="blog-detail-header">
    <a href="/blogs" class="blog-read">← All articles</a>
    <h1>{post.title}</h1>
    {#if summary}<p>{summary}</p>{/if}
  </header>

  <div class="blog-reading-layout">
    <BlogCover url={post.url_images} detail />

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

    <div class="blog-prose">
      {@render renderNodes(article)}
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
