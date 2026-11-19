<script lang="ts">
  import { onMount } from 'svelte';

  export let mobileMenuOpen = false;
  export let pathname = '/';
  const logo = '/assets/logo.svg';
  const logoText = '/assets/logo_an.svg';
  let desktopLinksOpen = false;
  let fixed = false;
  let menuRoot: HTMLDivElement;
  let currentHash = '';
  let currentPath = '/';

  $: currentPath = pathname.replace(/\/$/, '') || '/';
  $: projectsActive = currentHash === '#projects' || currentPath === '/project-list' || currentPath.startsWith('/project-detail/');
  $: if (pathname && typeof window !== 'undefined') currentHash = window.location.hash;

  function closeMenu() {
    mobileMenuOpen = false;
  }

  function handleMenuKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeMenu();
      document.getElementById('nav-ham')?.focus();
    }
  }

  onMount(() => {
    const onScroll = () => { fixed = window.scrollY > 2; };
    const syncLocation = () => {
      currentHash = window.location.hash;
    };
    const onPointerDown = (event: PointerEvent) => {
      if (menuRoot && !menuRoot.contains(event.target as Node)) closeMenu();
    };
    onScroll();
    syncLocation();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', syncLocation);
    window.addEventListener('popstate', syncLocation);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', syncLocation);
      window.removeEventListener('popstate', syncLocation);
      document.removeEventListener('pointerdown', onPointerDown);
      document.body.classList.remove('no-scroll');
    };
  });

  $: if (typeof document !== 'undefined') {
    document.body.classList.toggle('no-scroll', mobileMenuOpen);
  }
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

  <div class="mobile-nav" bind:this={menuRoot}>
    <div class="menu-status"><span class="menu-status-dot"></span>Open to freelance</div>
    <button id="nav-ham" class="nav-hamburger" class:is-open={mobileMenuOpen} aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} aria-controls="nav-mobile" onclick={() => mobileMenuOpen = !mobileMenuOpen}>
      <span class="ham-lines" aria-hidden="true"><span class="ham-line"></span><span class="ham-line"></span><span class="ham-line"></span></span>
    </button>
    <div id="nav-mobile" class="nav-mobile-menu" class:is-open={mobileMenuOpen} aria-hidden={!mobileMenuOpen} inert={!mobileMenuOpen} role="navigation" aria-label="Mobile navigation" onkeydown={handleMenuKeydown}>
      <div class="menu-backdrop"></div>
      <div class="menu-inner">
        <div class="menu-status"><span class="menu-status-dot"></span>Open to freelance</div>
        <ul class="menu-links list-none p-0">
          <li><a href="/#about" class="menu-link" onclick={closeMenu}><span class="menu-link-left"><span class="menu-link-icon">[≡]</span>About</span><span class="menu-link-arrow">›</span></a></li>
          <li><a href="/#services" class="menu-link" onclick={closeMenu}><span class="menu-link-left"><span class="menu-link-icon">[≡]</span>Services</span><span class="menu-link-arrow">›</span></a></li>
          <li><a href="/project-list" class="menu-link" onclick={closeMenu}><span class="menu-link-left"><span class="menu-link-icon">[≡]</span>Projects</span><span class="menu-link-arrow">›</span></a></li>
          <li><a href="/experience" class="menu-link" onclick={closeMenu}><span class="menu-link-left"><span class="menu-link-icon">[≡]</span>Experience</span><span class="menu-link-arrow">›</span></a></li>
          <li><a href="/#contact" class="menu-link" onclick={closeMenu}><span class="menu-link-left"><span class="menu-link-icon">[≡]</span>Contact</span><span class="menu-link-arrow">›</span></a></li>
        </ul>
        <div class="menu-bottom">
          <a href="mailto:akmadnudin.inc@gmail.com" class="menu-cta-primary">✉ Hire Me</a>
          <a href="https://github.com/adex-dev" target="_blank" rel="noopener noreferrer" class="menu-cta-secondary">GitHub</a>
          <div class="menu-social"><a href="https://www.linkedin.com/in/akmadnudin" target="_blank" rel="noopener noreferrer">LinkedIn</a><span class="menu-social-dot"></span><a href="https://akmadnudin.com">akmadnudin.com</a></div>
        </div>
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
