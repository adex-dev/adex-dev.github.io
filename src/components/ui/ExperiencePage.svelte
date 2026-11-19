<script lang="ts">
  import type { ExperienceItem } from '../../lib/supabase';
  import { richHtml } from '../../lib/rich-text';
  export let experiences: ExperienceItem[] = [];
</script>

<section id="experience" class="default-section default"><div class="section-tag"><span class="section-tag-icon">💼</span><span class="section-tag-text">Career</span><span class="section-tag-line"></span></div><h1 class="section-text-header">Professional experience</h1><p class="section-subtitle">Roles and responsibilities across business applications, workforce systems, and enterprise ERP integration.</p><div class="divider"></div><div class="exp-list default">{#each experiences as item (item.id)}<article class="exp-item default group"><div class="exp-meta default"><div class="exp-date default">{item.join_date}</div><div class="exp-company default">{item.company}</div></div><div><h2 class="exp-role default">{item.role}</h2><div class="exp-desc">{@html richHtml(item.job_desc)}</div><div class="card-stack exp-highlights">{#each (item.stack_name ?? '').split(';').filter((name) => name && name !== 'e') as stack}<span class="card-tag default">{stack}</span>{/each}</div></div></article>{/each}</div></section>
