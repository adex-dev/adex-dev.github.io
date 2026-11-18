<script lang="ts">
  import type { Category, Project } from '../../lib/supabase';
  import { richHtml } from '../../lib/rich-text';
  import Stats from './Stats.svelte';

  export let categories: Category[] = [];
  export let projects: Project[] = [];
  export let filter = 'all';
  export let loadingMore = false;
  export let hasMore = false;
  export let onSelectCategory: (category: string) => void;
  export let onLoadMore: () => void;

  function projectHref(project: Pick<Project, 'category' | 'prefix_url'>) {
    return `/project-detail/${encodeURIComponent(project.category)}/${encodeURIComponent(project.prefix_url)}`;
  }
  function observeMore(node: HTMLElement) {
    if (!('IntersectionObserver' in window)) return { destroy() {} };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !loadingMore) onLoadMore();
    }, { rootMargin: '500px 0px' });
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }
</script>

<section id="projectslist" class="container-custom default py-20"><div class="max-w-3xl"><div class="section-tag default"><span class="section-tag-icon default">💻</span><span class="section-tag-text default">Portfolio</span><span class="section-tag-line"></span></div><h1 class="portfoliolist default section-text-header">Things I've <span class="highlight">built</span></h1><p class="section-subtitle">Case studies covering workforce management, restaurant operations, and business integrations. Each project outlines its context, implementation, and role.</p></div></section>
<section id="portfoliolist" class="default-section default project-list-section">
  <div class="flex flex-wrap gap-3 mb-12"><button type="button" class="filter-btn" class:active={filter === 'all'} aria-pressed={filter === 'all'} onclick={() => onSelectCategory('all')}>All</button>{#each categories as category (category.id)}<button type="button" class="filter-btn capitalize" class:active={category.name.toLowerCase() === filter} aria-pressed={category.name.toLowerCase() === filter} onclick={() => onSelectCategory(category.name)}>{category.name}</button>{/each}</div>
  {#if projects.length}
    <div class="project-box default">{#each projects as project (project.id)}<a href={projectHref(project)} class="glass-card group defaultDetail"><div class="glass-card-top-glow"></div><div class="project-card"><div class="project-image"><div class="impact" style={`color:${['#d34516','#38bdf8','#ffbd2e','#2dd4bf','#6366f1'][project.id % 5]}`}>{#each (project.title_thumbnail ?? '').split(' ').filter(Boolean) as word, i}<span class="word" style={`transition-delay:${50 + i * 70}ms`}>{word}</span>{/each}</div><div class="impactnone">{project.title_thumbnail}</div><div class="project-image__overlay"></div></div><div class="absolute bottom-4 left-4"><span class="project-chip rust">{project.status_category}</span></div><div class="absolute bottom-4 right-4"><span class="project-chip">{project.category}</span></div></div><div class="p-6"><div class="glass-card-eyetag"><h2 class="glass-title">{project.title_short}</h2><span class="glass-card-period">{project.period}</span></div><div class="glass-desc">{@html richHtml(project.short_desc)}</div><div class="card-stack">{#each (project.stacks ?? '').split(';').filter(Boolean) as tag}<span class="card-tag default">{tag}</span>{/each}</div><div class="project-card-footer"><span>{project.status} {project.status_thumbnail}</span><span>View project →</span></div></div></a>{/each}</div>
  {:else}<p class="section-subtitle">No projects found in this category.</p>{/if}
  <div class="project-load-more" aria-live="polite" use:observeMore>{#if loadingMore}<span>Loading more projects…</span>{:else if hasMore}<button type="button" class="filter-btn" onclick={onLoadMore}>Load more projects</button>{:else if projects.length}<span>All projects loaded</span>{/if}</div>
  <div id="delivery-metrics" class="project-metrics"><div class="section-tag"><span class="section-tag-text">By The Numbers</span><span class="section-tag-line"></span></div><h2 class="section-text-header">Selected <span class="highlight">delivery metrics</span></h2><p class="section-subtitle">Reported outcomes from delivered systems and professional experience.</p><Stats /></div>
</section>
