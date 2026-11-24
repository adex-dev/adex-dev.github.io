<script lang="ts">
  import { richHtml } from '../../lib/rich-text';
  import type { Project } from '../../lib/supabase';
  import CodePanel from '../atom/CodePanel.svelte';

  export let project: Project;
  export let relatedProjects: Project[] = [];
  export let selectedImage = 0;

  $: gallery = projectImages(project);
  let sampleImage = '/assets/sample.png';
  function projectImages(item: Project) {
    const cover = item.image_url?.trim() || sampleImage;
    const assets = (item.asset_url ?? '').split(';').map((value) => value.trim().replace(/^[\s'"`[(]+|[\s'"`)\]]+$/g, '')).filter((value) => value.toLowerCase() !== 'e' && /^https?:\/\/\S+$/i.test(value));
    return assets.length ? Array.from(new Set([cover, ...assets])) : [cover];
  }
  function projectHref(item: Pick<Project, 'category' | 'prefix_url'>) {
    return `/project-detail/${encodeURIComponent(item.category)}/${encodeURIComponent(item.prefix_url)}`;
  }
  function isLongImpactValue(value: unknown) {
    return String(value ?? '').trim().length > 14;
  }
</script>

<div class="breadcrump-project"><a href="/">Home</a><span class="breadcrumb-sep">/</span><a href="/project-list">{project.category}</a><span class="breadcrumb-sep">/</span><span>{project.title_short}</span></div>
<section id="projectsDetail" class="default-section default detail-hero-project">
  <div class="box-eyebrow-poject"><div class="eyebrow-project-left"><div class="eyebrow-project-type"><span class="project-type-dot prod"></span><span>{project.status_category} · {project.vendor}</span></div><h1 class="section-text-header">{project.title}</h1><p class="section-subtitle">{project.short_desc}</p></div><div class="eyebrow-project-status">{project.status} in {project.status_category}</div></div>
  <div class="preview-wrap"><div class="browser-chrome"><div class="b-dots"><span class="b-dot r"></span><span class="b-dot y"></span><span class="b-dot g"></span></div><div class="browser-bar">{project.demo_url || 'www.sample-akmadnudin.co.id'}</div></div><div class="preview-screens"><img class="project-gallery-image" src={gallery[selectedImage] ?? gallery[0]} alt={`${project.title_short} screenshot ${selectedImage + 1}`} /><span class="project-gallery-count">{selectedImage + 1}/{gallery.length}</span></div>{#if gallery.length > 1}<div class="project-gallery-thumbnails" role="group" aria-label="Project screenshots">{#each gallery as image, i}<button type="button" class="project-gallery-thumbnail" class:is-active={selectedImage === i} aria-label={`Show screenshot ${i + 1} of ${gallery.length}`} aria-pressed={selectedImage === i} onclick={() => selectedImage = i}><img src={image} alt="" loading="lazy" /></button>{/each}</div>{/if}</div>
</section>
<div class="detail-body"><div class="detail-main">
  <section><h2>Overview</h2><p>{@html richHtml(project.overviews)}</p></section>
  <section><h2>Problem Being Solved</h2><p>{@html richHtml(project.problem_solving)}</p></section>
  <section><h2>Key Features</h2><ul>{#each (project.descriptions ?? '').split(';').filter(Boolean) as feature}<li>{feature}</li>{/each}</ul></section>
  <section><h2>Challenges &amp; Solutions</h2>{#each [{challenge:project.challenge_1,solution:project.solution_1},{challenge:project.challenge_2,solution:project.solution_2}] as pair}<div class="cs-grid"><article class="cs-card"><div class="cs-label c">⚠ Challenge</div><div class="cs-text">{pair.challenge}</div></article><article class="cs-card"><div class="cs-label s">✓ Solution</div><div class="cs-text">{pair.solution}</div></article></div>{/each}</section>
  <section><h2>Technical Implementation</h2><p>{@html richHtml(project.technical_note)}</p>
  {#if project.technical_code}
  <CodePanel
    title={project.technical_code_title}
    source={project.technical_code}
    language={project.technical_code_title?.endsWith('.rs')
      ? 'rust'
      : project.technical_code_title?.endsWith('.js')
        ? 'javascript'
        : project.technical_code_title?.endsWith('.sql')
          ? 'sql'
          : 'python'}
  />
{/if}
  </section>
  <section><h2>Results</h2><div class="metrics-grid">{#each [{value:project.results_1,label:project.results_2},{value:project.results_3,label:project.results_4},{value:project.results_5,label:project.results_6}] as metric}<div class="metric-card"><div class="metric-val">{metric.value}</div><div class="metric-label">{metric.label}</div></div>{/each}</div><p class="mt-4">{@html richHtml(project.result_note)}</p></section>
</div>
<aside class="detail-sidebar">
  <div class="s-card"><span class="s-card-title">Project Info</span><div class="info-row"><span class="i-label">Client</span><span class="i-val">{project.vendor}</span></div><div class="info-row"><span class="i-label">Year</span><span class="i-val">{project.period}</span></div><div class="info-row"><span class="i-label">Duration</span><span class="i-val">{project.durations}</span></div><div class="info-row"><span class="i-label">Role</span><span class="i-val">{project.role}</span></div><div class="info-row"><span class="i-label">Category</span><span class="i-val">{project.category_note}</span></div><div class="info-row"><span class="i-label">Status</span><span class="i-val teal">● {project.status}</span></div>{#if project.demo_url}<div class="info-row"><span class="i-label">Demo</span><a class="i-val teal" href={project.demo_url} target="_blank" rel="noopener noreferrer">{project.demo_url}</a></div>{/if}</div>
  <div class="s-card"><span class="s-card-title">Tech Stack</span><div class="card-stack">{#each (project.stacks ?? '').split(';').filter(Boolean) as stack}<span class="card-tag default" class:rust={/python|rust|flask/i.test(stack)}>{stack}</span>{/each}</div></div>
  <div class="s-card"><span class="s-card-title">Impact</span><div class="info-row impact-row" class:impact-row-long={isLongImpactValue(project.impact_branch_count)}><span class="i-label">{project.impact_branch}</span><span class="i-val teal">{project.impact_branch_count}</span></div><div class="info-row impact-row" class:impact-row-long={isLongImpactValue(project.impact_hr_count)}><span class="i-label">{project.impact_hr}</span><span class="i-val teal">{project.impact_hr_count}</span></div><div class="info-row impact-row" class:impact-row-long={isLongImpactValue(project.impact_incident_count)}><span class="i-label">{project.impact_incident}</span><span class="i-val teal">{project.impact_incident_count}</span></div></div>
  <div class="s-card"><span class="s-card-title">Interested in similar work?</span><div class="sidebar-cta"><a href="mailto:akmadnudin.inc@gmail.com" class="btn-p">✉ Contact Me</a><a href="/#services" class="btn-o">View Services</a></div></div>
</aside></div>
<section class="related-section"><h2>Other Project</h2><div class="related-grid">{#each relatedProjects as related (related.id)}<a class="rc beam beam-rust" href={projectHref(related)}><div class="rc-type">{related.status_category} · {related.vendor}</div><div class="rc-name">{related.title_short}</div><div class="card-stack">{#each (related.stacks ?? '').split(';').filter(Boolean) as stack}<span class="card-tag default">{stack}</span>{/each}</div></a>{/each}</div></section>
