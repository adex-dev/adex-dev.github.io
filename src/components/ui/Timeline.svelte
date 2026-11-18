<script lang="ts">
  import type { TimelineItem } from '../../lib/supabase';
  import { richHtml } from '../../lib/rich-text';
  import { reveal } from '../../lib/reveal';
  import Beam from '../beam/Beam.svelte';
  export let items: TimelineItem[] = [];
  let hoveredId: number | null = null;

  function hoverTimeline(node: HTMLElement, id: number) {
    const enter = () => { hoveredId = id; };
    const leave = () => { if (hoveredId === id) hoveredId = null; };
    node.addEventListener('pointerenter', enter);
    node.addEventListener('pointerleave', leave);
    return { destroy() {
      node.removeEventListener('pointerenter', enter);
      node.removeEventListener('pointerleave', leave);
    } };
  }
</script>

<section id="process" class="default-section default">
  <div class="section-tag"><span class="section-tag-text">Project engagement</span><span class="section-tag-line"></span></div>
  <h2 class="section-text-header">A clear process,<br /><span class="highlight">from scope to handover</span></h2>
  <p class="section-subtitle timeline-SubTitle default">We agree on goals, scope, timeline, and cost before implementation. Progress updates keep decisions visible through delivery and handover.</p>
  <div class="timeline default" use:reveal>{#each items as item, index (item.id)}<article class="tl-item default group" style={`animation-delay:${index * 0.1}s`} use:hoverTimeline={item.id}><Beam variant="rust" radius={50} gradientKey={`timeline-${item.id}`} classBeam="rounded-full!" className={hoveredId === item.id ? 'beam-active border-0!' : ''} active={hoveredId === item.id}><div class={`tl-dot default ${hoveredId === item.id ? 'border-0!' : ''}`}><span class="absolute">{item.dot}</span></div></Beam><div class="tl-content default"><span class="tl-label default">{item.labels}</span><h3 class="tl-title">{item.name}</h3><div class="tl-desc">{@html richHtml(item.desc)}</div></div></article>{/each}</div>
</section>
