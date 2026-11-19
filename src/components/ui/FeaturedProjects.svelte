<script lang="ts">
  import type { Project } from '../../lib/supabase';
  import { richHtml } from '../../lib/rich-text';
  import Terminal from '../includes/Terminal.svelte';

  export let projects: Project[] = [];

  function projectHref(project: Pick<Project, 'category' | 'prefix_url'>) {
    return `/project-detail/${encodeURIComponent(project.category)}/${encodeURIComponent(project.prefix_url)}`;
  }
</script>

<section id="projects" class="default-section default">
  <div class="section-tag default"><span class="section-tag-icon default">💻</span><span class="section-tag-text default">Work</span><span class="section-tag-line"></span></div>
  <h2 class="section-text-header">Featured Work</h2><p class="section-subtitle">Selected work across workforce operations, restaurant systems, and business integrations.</p><div class="divider"></div>
  <div class="projects-grid"><div class="project-card default"><div class="project-card featured rust-project default">
    <div><div class="project-num default"><span class="project-num-dot personal default"></span> Backend Engineering · Rust</div><h3 class="project-name default">REST API Backend — Rust &amp; Axum</h3><p class="project-desc default">A Rust and Axum API project demonstrating authentication, PostgreSQL data access, and containerized deployment. It highlights practical backend design, from route structure to a repeatable development environment.</p><div class="card-stack">{#each ['Rust','Axum','PostgreSQL','JWT','Docker'] as tag}<span class="card-tag default" class:rust={tag === 'Rust' || tag === 'Axum'}>{tag}</span>{/each}</div></div>
    <Terminal url="main.rs — Axum router setup">
      <div><span class="t-comment">// main.rs — Axum router setup</span></div><div>&nbsp;</div>
      <div><span class="t-key">async fn</span> <span class="text-green">main</span>() {'{'}</div>
      <div>&nbsp; <span class="t-key">let</span> app = Router::new()</div>
      <div>&nbsp;&nbsp;&nbsp; .route(<span class="t-string">"/api/auth/login"</span>, post(login))</div>
      <div>&nbsp;&nbsp;&nbsp; .route(<span class="t-string">"/api/users"</span>, get(get_users))</div>
      <div>&nbsp;&nbsp;&nbsp; .layer(JwtAuthLayer::new());</div><div>&nbsp;</div>
      <div>&nbsp; axum::serve(listener, app)</div><div>&nbsp;&nbsp;&nbsp; .await.unwrap();</div><div>{'}'}</div>
    </Terminal>
  </div></div></div>
  <div class="project-box default">
    {#each projects as project (project.id)}
      <a href={projectHref(project)} class="glass-card group default">
        <div class="glass-card-top-glow"></div><div class="glass-card-eyetag default"><span class="glass-card-corner default" class:rust={project.status_category?.toLowerCase() === 'production'}>{project.status_category}</span><span class="glass-card-period default">{project.period}</span></div>
        <h3 class="glass-title default">{project.title_short}</h3><div class="glass-desc default">{@html richHtml(project.short_desc)}</div><div class="card-stack">{#each (project.stacks ?? '').split(';').filter(Boolean) as tag}<span class="card-tag default">{tag}</span>{/each}</div>
      </a>
    {/each}
  </div>
  <div class="project-cta-row"><a href="/project-list" class="project-cta default">View All Projects →</a></div>
</section>
