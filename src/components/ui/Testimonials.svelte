<script lang="ts">
  import type { Testimonial } from '../../lib/supabase';
  import { richHtml } from '../../lib/rich-text';
  export let testimonials: Testimonial[] = [];
  let viewport: HTMLDivElement;
  $: sortedTestimonials = [...testimonials].sort((a, b) => b.id - a.id);

  function move(direction: -1 | 1) {
    if (!viewport) return;
    const end = viewport.scrollWidth - viewport.clientWidth;
    if (direction < 0 && viewport.scrollLeft <= 1) {
      viewport.scrollTo({ left: end, behavior: 'smooth' });
    } else if (direction > 0 && viewport.scrollLeft >= end - 1) {
      viewport.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      viewport.scrollBy({ left: direction * viewport.clientWidth / 2, behavior: 'smooth' });
    }
  }
</script>

<section id="testimonial" class="default-section default testimonial-section" aria-label="Client testimonials" aria-roledescription="carousel">
  <div class="section-tag"><span class="section-tag-icon">🤝</span><span class="section-tag-text">Testimonials</span><span class="section-tag-line"></span></div>
  <h2 class="section-text-header">What Clients Say</h2><p class="section-subtitle">Feedback from people I've worked with directly — in their own words.</p>
  {#if testimonials.length}
    <div class="testimonial-list">
      <div class="embla__viewport default" bind:this={viewport}><div class="embla__container">
        {#each sortedTestimonials as testimonial (testimonial.id)}
          <div class="embla__slide default" role="group" aria-roledescription="slide">
            <article class={`testimonial-card group ${testimonial.types ?? ''}`}>
              <blockquote class="testimonial-quote"><span aria-hidden="true">“</span><div>{@html richHtml(testimonial.quote)}</div><span aria-hidden="true">”</span></blockquote>
              <div class="testimonial-author"><div class="author-avatar">{testimonial.avatar}</div><div><div class="author-name">{testimonial.name}</div><div class="author-role">{testimonial.role}</div></div></div>
            </article>
          </div>
        {/each}
      </div></div>
      <div class="embla"><button type="button" class="embla-arrow" aria-label="Previous testimonial" onclick={() => move(-1)}>‹</button><button type="button" class="embla-arrow" aria-label="Next testimonial" onclick={() => move(1)}>›</button></div>
    </div>
  {/if}
</section>
