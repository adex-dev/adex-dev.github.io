<script lang="ts">
  import ExpertiseIcon from '../atom/ExpertiseIcon.svelte';
  import { reveal } from '../../lib/reveal';

  const skills = [
    { icon: 'backend', title: 'Backend Architecture', desc: 'REST API design, authentication, business logic, and database architecture with Rust, Python, and PHP.', tags: ['Rust', 'Axum', 'Python', 'FastAPI', 'Flask', 'Go', 'PHP'] },
    { icon: 'code', title: 'Frontend Development', desc: 'Responsive, clean interfaces that connect seamlessly to backend APIs.', tags: ['React', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'jQuery', 'CodeIgniter'] },
    { icon: 'data', title: 'Database & Storage', desc: 'Relational schema design, query optimization, and data modeling for PostgreSQL and MySQL applications.', tags: ['PostgreSQL', 'MySQL'] },
    { icon: 'shield', title: 'System Integration', desc: 'Connecting business applications through APIs, authentication, and ERP workflows.', tags: ['Oracle NetSuite', 'Odoo', 'JWT Auth', 'REST API'] },
    { icon: 'devops', title: 'DevOps & Deployment', desc: 'Docker containerization, Linux server management, Nginx configuration, and CI/CD pipeline setup.', tags: ['Docker', 'CI/CD', 'Linux', 'Git'] },
    { icon: 'mobile', title: 'Mobile', desc: 'Cross-platform mobile apps with Flutter for rapid delivery.', tags: ['Flutter', 'Dart'] },
  ];
  const gradients = ['linear-gradient(90deg,transparent,#d34516,transparent)', 'linear-gradient(90deg,transparent,#38bdf8,transparent)', 'linear-gradient(90deg,transparent,#facc15,transparent)', 'linear-gradient(90deg,transparent,#22c55e,transparent)'];
  const colors = ['#d34516', '#38bdf8', '#facc15', '#22c55e'];
</script>

<section id="skills" class="default-section default skill-section default">
  <div class="section-tag default"><span class="section-tag-icon default">⚙</span><span class="section-tag-text default">Expertise</span><span class="section-tag-line"></span></div>
  <h2 class="section-text-header">What I work with</h2>
  <p class="section-subtitle">Backend-focused engineering across APIs, data, integrations, and the interfaces teams use every day.</p><div class="divider"></div>
  <div class="skill-grid tall" use:reveal={'.tech-card'}>
    {#each skills as skill, i}
      <article class="tech-card default group visible" style={`--accent-gradient:${gradients[i % 4]}`}>
        <div class="card-corner" style={`--accent-color:${colors[i % 4]}6e`}></div>
        <div class="card-icon" style={`color:${colors[i % 4]}`}><div class="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={`background-color:color-mix(in srgb,${colors[i % 4]} 20%,transparent)`}>{#if skill.icon === 'mobile'}[◈]{:else}<ExpertiseIcon name={skill.icon} />{/if}</div></div>
        <h3 class="card-title default">{skill.title}</h3><p class="card-desc default">{skill.desc}</p>
        <div class="card-stack">{#each skill.tags as tag}<span class="card-tag default" class:rust={tag === 'Rust' || tag === 'Axum'}>{tag}</span>{/each}</div>
      </article>
    {/each}
  </div>
</section>
