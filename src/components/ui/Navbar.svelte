<script lang="ts">
  import { onMount } from 'svelte';

  export let pathname = '/';
  export let showBlogReaderSettings = false;
  export let blogReaderSettingsOpen = false;
  const logo = '/assets/logo.svg';
  const logoText = '/assets/logo_an.svg';
  let desktopLinksOpen = false;
  let fixed = false;
  let currentHash = '';
  let currentPath = '/';

  $: currentPath = pathname.replace(/\/$/, '') || '/';
  $: projectsActive = currentHash === '#projects' || currentPath === '/project-list' || currentPath.startsWith('/project-detail/');
  $: if (pathname && typeof window !== 'undefined') currentHash = window.location.hash;

  onMount(() => {
    const onScroll = () => { fixed = window.scrollY > 2; };
    const syncLocation = () => {
      currentHash = window.location.hash;
    };
    onScroll();
    syncLocation();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', syncLocation);
    window.addEventListener('popstate', syncLocation);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', syncLocation);
      window.removeEventListener('popstate', syncLocation);
    };
  });

</script>

<nav class="site-nav" aria-label="Main navigation" class:nav-fixed={fixed}>
  <a href="/" class="nav-logo" aria-label="Akmad Nudin home">
    <div class="logo-text flex gap-10">
      <img src={logoText} class="logo-text-image" alt="" />
      <span class="nav-brand-an">AN</span><span class="nav-brand-rest">&nbsp;//&nbsp;dev</span><span class="nav-brand-line"></span>
    </div>
    <img src={logo} class="logoimage" alt="Akmad Nudin" />
  </a>

  <div class="desktop-nav">
    <div class="desktop-nav-links" class:open={desktopLinksOpen}>
      <div id="nav-links" class="nav-links" class:show={desktopLinksOpen} class:hide={!desktopLinksOpen}>
        <a href="/#about">About</a><a href="/#services">Services</a><a href="/project-list">Projects</a><a href="/#contact">Contact</a>
      </div>
      <button class="nav-code-tag" aria-label={desktopLinksOpen ? 'Hide navigation links' : 'Show navigation links'} aria-expanded={desktopLinksOpen} aria-controls="nav-links" onclick={() => desktopLinksOpen = !desktopLinksOpen}>
        {desktopLinksOpen ? '</\\>' : '< / >'}
      </button>
    </div>
  </div>

  <div class="mobile-nav">
    <div class="mobile-socials" aria-label="Social links">
      <a class="mobile-social-link" href="https://www.linkedin.com/in/akmadnudin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.2 3.3a2.1 2.1 0 1 1-.1 4.2 2.1 2.1 0 0 1 .1-4.2ZM3.4 9h3.7v11.7H3.4V9Zm6 0H13v1.6h.1a4 4 0 0 1 3.6-2c3.9 0 4.6 2.6 4.6 5.8v6.3h-3.7v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.7H9.4V9Z"/></svg>
      </a>
      <a class="mobile-social-link" href="https://github.com/adex-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.4.1-2.9 0 0 1-.3 3.1 1.1a10.7 10.7 0 0 1 5.7 0c2.2-1.4 3.1-1.1 3.1-1.1.6 1.5.2 2.6.1 2.9.8.8 1.2 1.8 1.2 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2v3.2c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z"/></svg>
      </a>
      <a class="mobile-social-link mobile-social-email" href="mailto:akmadnudin.inc@gmail.com" aria-label="Email">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>
      </a>
    </div>

    <div class="mobile-header-actions">
      <div class="mobile-link-pill" role="navigation" aria-label="Quick links">
        <a href="/#about" class="mobile-pill-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></svg>
          <span>About</span>
        </a>
        <span class="mobile-pill-divider" aria-hidden="true"></span>
        <a href="/experience" class="mobile-pill-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 7v14"/></svg>
          <span>Experience</span>
        </a>
        {#if showBlogReaderSettings}
          <span class="mobile-pill-divider" aria-hidden="true"></span>
          <button class="blog-reader-nav-button" type="button" aria-label="Reading settings" aria-controls="blog-display-settings" aria-expanded={blogReaderSettingsOpen} onclick={() => blogReaderSettingsOpen = !blogReaderSettingsOpen}><span aria-hidden="true">Aa</span></button>
        {/if}
      </div>
    </div>
  </div>
</nav>

<div class="bottom-nav" role="navigation" aria-label="Mobile quick navigation">
  <div class="mobileNav">
    <a href="/" class="mobileNav-item" class:activeMobile={currentPath === '/' && !currentHash} aria-current={currentPath === '/' && !currentHash ? 'page' : undefined}>
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg><span>Overview</span>
    </a>
    <a href="/#projects" class="mobileNav-item" class:activeMobile={projectsActive} aria-current={projectsActive ? 'location' : undefined}>
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M8 11h8M8 15h5"/></svg><span>Projects</span>
    </a>
    <a href="/#services" class="mobileNav-item" class:activeMobile={currentHash === '#services'} aria-current={currentHash === '#services' ? 'location' : undefined}>
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg><span>Services</span>
    </a>
    <a href="/#contact" class="mobileNav-item" class:activeMobile={currentHash === '#contact'} aria-current={currentHash === '#contact' ? 'location' : undefined}>
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7Z"/></svg><span>Hire Me</span>
    </a>
    <div class="home-indicator" aria-hidden="true"></div>
  </div>
</div>
