<script lang="ts">
  import AboutIllustration from './AboutIllustration.svelte';
  let trackRecordHovered = false;
  const experienceYears = Math.max(0, new Date().getFullYear() - 2019);
</script>

<section id="about" class="about-section default">
  <div class="about-section-card default">
    <div class="about-left default">
      <div class="illustration-wrapper default">
        <AboutIllustration ctaHovered={trackRecordHovered} />
        <div class="corner-accent top-left defaulttop"></div>
        <div class="corner-accent bottom-right defaultbottom"></div>
        <div class="about-badge default"><div class="about-badge-label default">Status</div><div class="about-badge-val default">Open to work</div></div>
      </div>
    </div>
    <div class="about-right">
      <div class="section-tag default"><span class="section-tag-icon default">👤</span><span class="section-tag-text default">About Me</span><span class="section-tag-line"></span></div>
      <h2 class="section-text-header">Software for real operations,<br /><span class="highlight">from API to interface</span></h2>
      <p class="section-subtitle">I'm Akmad Nudin, a <strong>Full Stack Engineer</strong> based in Indonesia, working professionally experience <span class="keyword">{experienceYears}+ years </span>. I build and maintain business software across backend services, internal tools, and user-facing applications.</p>
      <p class="section-subtitle">I started my career as a Senior Programmer at <span class="keyword">PT. Jaygee Group</span> in 2019, building <span class="tech-keyword">attendance and web systems</span>. From there I grew into leading full product development — <span class="tech-keyword">POS systems</span> for restaurants, <span class="tech-keyword">HRIS</span> for HR automation, and real-time data pipelines across multi-branch companies. Today I work at <span class="keyword">PT. Indobara Bahana</span> managing internal systems and <span class="tech-keyword">Oracle NetSuite ERP</span> integration.</p>
      <p class="section-subtitle">I also build backend projects with <span class="tech-keyword">Java</span>, <span class="tech-keyword">Rust</span> and <span class="tech-keyword">Axum</span>, applying the same focus on clear API design and reliable data handling.</p>
      <div class="info-grid default"><div class="info-item default"><span class="info-bullet default"></span><span>Based in Indonesia</span></div><div class="info-item default"><span class="info-bullet default"></span><span>Available for remote freelance</span></div><div class="info-item default"><span class="info-bullet default"></span><span>Speaks Indonesian &amp; English</span></div><div class="info-item default"><span class="info-bullet default"></span><span>Building with Java, Rust and Axum</span></div></div>
      <a href="/experience" class="about-cta default" onmouseenter={() => trackRecordHovered = true} onmouseleave={() => trackRecordHovered = false}>See my track record <span class="about-cta-arrow">→</span></a>
    </div>
  </div>
</section>
