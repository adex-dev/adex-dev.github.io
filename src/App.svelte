<script lang="ts">
  import { onMount } from 'svelte';
  import Lottie from './components/atom/Lottie.svelte';
  import BlogsPage from './components/ui/BlogsPage.svelte';
  import BlogDetailPage from './components/ui/BlogDetailPage.svelte';
  import { blogExcerpt, fetchBlog, fetchBlogCategories, fetchBlogPage, fetchLatestBlogs, incrementBlogReading } from './lib/blog';
  import type { Blog, BlogCategory, BlogPage, BlogPreview } from './lib/blog';
  import About from './components/ui/About.svelte';
  import Contact from './components/ui/Contact.svelte';
  import ExperiencePage from './components/ui/ExperiencePage.svelte';
  import FeaturedProjects from './components/ui/FeaturedProjects.svelte';
  import Footer from './components/ui/Footer.svelte';
  import Hero from './components/ui/Hero.svelte';
  import Navbar from './components/ui/Navbar.svelte';
  import ProjectDetailPage from './components/ui/ProjectDetailPage.svelte';
  import ProjectListPage from './components/ui/ProjectListPage.svelte';
  import Services from './components/ui/Services.svelte';
  import Skills from './components/ui/Skills.svelte';
  import Testimonials from './components/ui/Testimonials.svelte';
  import Timeline from './components/ui/Timeline.svelte';
  import { reveal } from './lib/reveal';
  import { parallax } from './lib/parallax';
  import type { Category, ExperienceItem, Price, Project, Service, Testimonial, TimelineItem } from './lib/supabase';
  import { projectSelect, supabase } from './lib/supabase';

  type Page = 'home' | 'projects' | 'experience' | 'detail' | 'blogs' | 'blog-detail' | 'notfound';
  interface InitialPageData {
    path: string;
    page: Page;
    homeProjects?: Project[];
    projects?: Project[];
    categories?: Category[];
    experiences?: ExperienceItem[];
    services?: Service[];
    prices?: Price[];
    testimonials?: Testimonial[];
    timelines?: TimelineItem[];
    activeProject?: Project | null;
    relatedProjects?: Project[];
    blogs?: BlogPage;
    blogCategories?: BlogCategory[];
    activeBlog?: Blog | null;
    latestBlogs?: BlogPreview[];
    loadFailed?: boolean;
  }
  export let initialData: InitialPageData | undefined = undefined;
  const PAGE_SIZE = 12;
  const indonesiaFlag = '/assets/flags/indonesia.svg';
  const malaysiaFlag = '/assets/flags/malaysia.svg';
  const singaporeFlag = '/assets/flags/singapore.svg';
  const usFlag = '/assets/flags/us.svg';

  let pathname = initialData?.path ?? (typeof window === 'undefined' ? '/' : window.location.pathname);
  let page: Page = initialData?.page ?? getPage(pathname);
  let pageLoading = !initialData;
  let loadError = '';
  let mobileMenuOpen = false;
  let mobileBlogReaderSettingsOpen = false;
  let blogs: BlogPage = initialData?.blogs ?? { posts: [], hasMore: false };
  let blogCategories = initialData?.blogCategories ?? [];
  let activeBlog = initialData?.activeBlog ?? null;
  let latestBlogs = initialData?.latestBlogs ?? [];
  let homeProjects: Project[] = initialData?.homeProjects ?? [];
  let projects: Project[] = initialData?.projects ?? [];
  let categories: Category[] = initialData?.categories ?? [];
  let experiences: ExperienceItem[] = initialData?.experiences ?? [];
  let services: Service[] = initialData?.services ?? [];
  let prices: Price[] = initialData?.prices ?? [];
  let testimonials: Testimonial[] = initialData?.testimonials ?? [];
  let timelines: TimelineItem[] = initialData?.timelines ?? [];
  let activeProject: Project | null = initialData?.activeProject ?? null;
  let relatedProjects: Project[] = initialData?.relatedProjects ?? [];
  let filter = 'all';
  let hasMore = false;
  let loadingMore = false;
  let currency = 'USD';
  let currencyFlag = usFlag;
  let pricesLoading = page === 'home';
  let selectedImage = 0;
  let requestNumber = 0;
  let pageTitle = 'Akmad Nudin | Full Stack Engineer';
  let pageDescription = 'Akmad Nudin is an Indonesia-based full stack engineer building business software, REST APIs, workforce systems, and ERP integrations.';
  let structuredData: object[] = [];
  let structuredDataScript = '';

  $: structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://akmadnudin.com/#person',
      name: 'Akmad Nudin',
      jobTitle: 'Full Stack Engineer',
      description: 'Full Stack Engineer based in Indonesia, working on business software, REST APIs, workforce systems, and ERP integrations since 2019.',
      url: 'https://akmadnudin.com',
      email: 'akmadnudin.inc@gmail.com',
      image: 'https://akmadnudin.com/logo_an.svg',
      sameAs: ['https://www.linkedin.com/in/akmadnudin', 'https://github.com/adex-dev'],
      address: { '@type': 'PostalAddress', addressCountry: 'ID' },
      knowsAbout: ['Python', 'FastAPI', 'Flask', 'Go', 'PHP', 'React', 'TypeScript', 'PostgreSQL', 'MySQL', 'Docker', 'Oracle NetSuite', 'Odoo', 'REST API', 'ERP Integration', 'HRIS', 'POS System', 'Backend Development'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://akmadnudin.com/#website',
      name: 'Akmad Nudin — Portfolio',
      url: 'https://akmadnudin.com/',
      publisher: { '@id': 'https://akmadnudin.com/#person' },
    },
    ...(page === 'detail' && activeProject ? [{
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://akmadnudin.com/' },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://akmadnudin.com/project-list' },
        { '@type': 'ListItem', position: 3, name: activeProject.prefix_url, item: `https://akmadnudin.com${pathname}` },
      ],
    }] : []),
  ];
  $: structuredDataScript = `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}<\/script>`;

  $: if (page === 'projects') {
    pageTitle = 'Projects | Akmad Nudin';
    pageDescription = "Explore Akmad Nudin's software case studies across workforce management, restaurant operations, business integrations, and Rust APIs.";
  } else if (page === 'experience') {
    pageTitle = 'Professional Experience | Akmad Nudin';
    pageDescription = "Review Akmad Nudin's professional experience building business software, web applications, APIs, and integrated production systems.";
  } else if (page === 'detail' && activeProject) {
    pageTitle = `${activeProject.title_short || 'Project Detail'} | Akmad Nudin`;
    pageDescription = activeProject.short_desc || `Details about ${activeProject.title_short} by Akmad Nudin.`;
  } else if (page === 'blogs') {
    pageTitle = 'Blog | Akmad Nudin';
    pageDescription = 'Articles on backend engineering, integrations, and building reliable software.';
  } else if (page === 'blog-detail' && activeBlog) {
    pageTitle = activeBlog.title + ' | Akmad Nudin';
    pageDescription = blogExcerpt(activeBlog.article) || activeBlog.title;
  } else if (page === 'notfound') {
    pageTitle = 'Page Not Found | Akmad Nudin';
    pageDescription = 'The requested page could not be found. Browse Akmad Nudin’s projects or return to the homepage.';
  } else {
    pageTitle = 'Akmad Nudin | Full Stack Engineer';
    pageDescription = 'Akmad Nudin is an Indonesia-based full stack engineer building business software, REST APIs, workforce systems, and ERP integrations.';
  }

  function getPage(path: string): Page {
    if (path === '/' || path === '/index.html') return 'home';
    if (path.replace(/\/$/, '') === '/project-list') return 'projects';
    if (path.replace(/\/$/, '') === '/experience') return 'experience';
    if (path.startsWith('/project-detail/')) return 'detail';
    if (path === '/blogs' || path === '/blogs/') return 'blogs';
    if (/^\/blogs\/[^/]+\/?$/.test(path)) return 'blog-detail';
    return 'notfound';
  }

  async function recordBlogReading(id: number, routeRequest: number) {
    try {
      const readings = await incrementBlogReading(id);
      if (readings !== null && requestNumber === routeRequest && activeBlog?.id === id) {
        activeBlog = { ...activeBlog, readings };
      }
    } catch {
      console.warn('Unable to update the article reading count.');
    }
  }

  async function loadRoute(path: string) {
    const currentRequest = ++requestNumber;
    pathname = path;
    page = getPage(path);
    pageLoading = true;
    pricesLoading = page === 'home';
    loadError = '';
    activeProject = null;
    activeBlog = null;
    latestBlogs = [];
    relatedProjects = [];
    if (!supabase) {
      if (page === 'blogs' || page === 'blog-detail') loadError = 'The blog is currently unavailable.';
      pageLoading = false;
      pricesLoading = false;
      return;
    }
    try {
      if (page === 'home') {
        const [featured, serviceResult, priceResult, testimonialResult, timelineResult] = await Promise.all([
          supabase.rpc('get_projects_random').select('id,title_short,stacks,vendor,status_category,short_desc,stack_colors,category,prefix_url').eq('status_project_primary', 'primary').limit(3).returns<Project[]>(),
          supabase.rpc('get_services').returns<Service[]>(),
          supabase.from('pricelist').select('id,prefix,price,state,services_id').eq('prefix', currency).returns<Price[]>(),
          supabase.from('testimonials').select('*').order('id', { ascending: true }).returns<Testimonial[]>(),
          supabase.from('timelines').select('*').order('id', { ascending: true }).returns<TimelineItem[]>(),
        ]);
        if (featured.error) throw featured.error;
        if (serviceResult.error) throw serviceResult.error;
        if (priceResult.error) throw priceResult.error;
        if (testimonialResult.error) throw testimonialResult.error;
        if (timelineResult.error) throw timelineResult.error;
        if (currentRequest !== requestNumber) return;
        homeProjects = (featured.data as unknown as Project[] | null) ?? [];
        services = (serviceResult.data as unknown as Service[] | null) ?? [];
        prices = (priceResult.data as unknown as Price[] | null) ?? [];
        pricesLoading = false;
        testimonials = (testimonialResult.data as unknown as Testimonial[] | null) ?? [];
        timelines = (timelineResult.data as unknown as TimelineItem[] | null) ?? [];
      } else if (page === 'projects') {
        const [categoryResult, projectResult] = await Promise.all([
          supabase.from('categories').select('id,name').eq('status', 'true').returns<Category[]>(),
          fetchProjectPage('all', 0),
        ]);
        if (categoryResult.error) throw categoryResult.error;
        if (currentRequest !== requestNumber) return;
        categories = categoryResult.data ?? [];
        projects = projectResult;
        filter = 'all';
        hasMore = projectResult.length === PAGE_SIZE;
      } else if (page === 'experience') {
        const result = await supabase.rpc('get_experiences').order('id', { ascending: false }).returns<ExperienceItem[]>();
        if (result.error) throw result.error;
        if (currentRequest !== requestNumber) return;
        experiences = (result.data as unknown as ExperienceItem[] | null) ?? [];
      } else if (page === 'blogs') {
        const [posts, categories] = await Promise.all([fetchBlogPage(), fetchBlogCategories()]);
        if (currentRequest !== requestNumber) return;
        blogs = posts;
        blogCategories = categories;
      } else if (page === 'blog-detail') {
        const [post, latest] = await Promise.all([
          fetchBlog(decodeURIComponent(path.split('/')[2])),
          fetchLatestBlogs().catch(() => []),
        ]);
        if (currentRequest !== requestNumber) return;
        activeBlog = post;
        latestBlogs = latest;
        if (post) void recordBlogReading(post.id, currentRequest);
        else page = 'notfound';
      } else if (page === 'detail') {
        const parts = path.split('/').filter(Boolean).map((part) => decodeURIComponent(part));
        const category = parts[1]?.toLowerCase();
        const slug = parts[2];
        if (!category || !slug) throw new Error('Project route is incomplete.');
        const result = await supabase.rpc('get_projects').select(projectSelect).eq('category', category).eq('prefix_url', slug).order('id', { ascending: false }).returns<Project[]>();
        if (result.error) throw result.error;
        if (currentRequest !== requestNumber) return;
        activeProject = ((result.data as unknown as Project[] | null) ?? [])[0] ?? null;
        if (activeProject) {
          const related = await supabase.rpc('get_projects_random').select('id,title_short,stacks,vendor,status_category,prefix_url,category').eq('category', category).neq('prefix_url', slug).limit(3).returns<Project[]>();
          if (related.error) throw related.error;
          if (currentRequest !== requestNumber) return;
          relatedProjects = (related.data as unknown as Project[] | null) ?? [];
        } else {
          page = 'notfound';
        }
        selectedImage = 0;
      }
    } catch (error) {
      console.error('Unable to load portfolio content:', error);
      if (currentRequest === requestNumber) loadError = 'Some portfolio content could not be loaded. Please try again later.';
    } finally {
      if (currentRequest === requestNumber) {
        pageLoading = false;
        pricesLoading = false;
      }
    }
  }

  async function fetchProjectPage(category: string, offset: number) {
    if (!supabase) return [];
    let query = supabase.rpc('get_projects').select(projectSelect).order('id', { ascending: false });
    if (category !== 'all') query = query.eq('category', category.toLowerCase());
    const result = await query.range(offset, offset + PAGE_SIZE - 1).returns<Project[]>();
    if (result.error) throw result.error;
    return (result.data as unknown as Project[] | null) ?? [];
  }

  async function selectCategory(category: string) {
    filter = category.toLowerCase();
    pageLoading = true;
    loadError = '';
    try {
      const result = await fetchProjectPage(filter, 0);
      projects = result;
      hasMore = result.length === PAGE_SIZE;
    } catch (error) {
      console.error(error);
      loadError = 'Projects could not be loaded. Please try again.';
    } finally {
      pageLoading = false;
    }
  }

  async function loadMore() {
    if (!hasMore || loadingMore || pageLoading) return;
    loadingMore = true;
    try {
      const next = await fetchProjectPage(filter, projects.length);
      projects = [...projects, ...next];
      hasMore = next.length === PAGE_SIZE;
    } catch (error) {
      console.error(error);
      loadError = 'More projects could not be loaded. Please try again.';
    } finally {
      loadingMore = false;
    }
  }

  function observeMore(node: HTMLElement) {
    if (!('IntersectionObserver' in window)) return { destroy() {} };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void loadMore();
    }, { rootMargin: '500px 0px' });
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }

  async function setCurrency(event: Event) {
    currency = (event.currentTarget as HTMLSelectElement).value;
    currencyFlag = currency === 'IDR' ? indonesiaFlag : currency === 'SGD' ? singaporeFlag : currency === 'RM' ? malaysiaFlag : usFlag;
    if (!supabase) return;
    pricesLoading = true;
    const result = await supabase.from('pricelist').select('id,prefix,price,state,services_id').eq('prefix', currency).returns<Price[]>();
    if (!result.error) prices = result.data ?? [];
    pricesLoading = false;
  }

  function go(event: MouseEvent) {
    const anchor = (event.target as HTMLElement).closest('a');
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
    event.preventDefault();
    mobileMenuOpen = false;
    history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
    void loadRoute(url.pathname).then(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (url.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView());
    });
  }

  onMount(() => {
    const handlePop = () => void loadRoute(window.location.pathname);
    document.addEventListener('click', go);
    window.addEventListener('popstate', handlePop);
    if (!initialData || initialData.path !== window.location.pathname || initialData.loadFailed || (initialData.page === 'detail' && !initialData.activeProject)) {
      void loadRoute(window.location.pathname);
    } else if (initialData.page === 'blog-detail' && activeBlog) {
      void recordBlogReading(activeBlog.id, requestNumber);
    } else if (initialData.page === 'home' && supabase) {
      void supabase.from('pricelist').select('id,prefix,price,state,services_id').eq('prefix', currency).returns<Price[]>().then(({ data, error }) => {
        if (!error) prices = data ?? [];
        pricesLoading = false;
      });
    }
    return () => {
      document.removeEventListener('click', go);
      window.removeEventListener('popstate', handlePop);
    };
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <meta name="robots" content={page === 'notfound' ? 'noindex, follow' : 'index, follow'} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:site_name" content="Akmad Nudin" />
  <meta property="og:type" content={page === 'detail' || page === 'blog-detail' ? 'article' : 'website'} />
  <meta property="og:url" content={`https://akmadnudin.com${pathname}`} />
  <meta property="og:image" content="https://akmadnudin.com/og-image.jpg" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />
  <meta name="twitter:card" content="summary_large_image" />
  {@html structuredDataScript}
  {#if page !== 'notfound'}
    <link rel="canonical" href={`https://akmadnudin.com${pathname}`} />
  {/if}
</svelte:head>

<div class="main-screen bg-primary text-text relative min-h-screen w-full">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <main id="main-content" class="relative" use:reveal={'.reveal, .tech-card'} use:parallax={{ enabled: page === 'home' }}>
    <Navbar bind:mobileMenuOpen {pathname} showBlogReaderSettings={page === 'blog-detail'} bind:blogReaderSettingsOpen={mobileBlogReaderSettingsOpen} />

    {#if pageLoading}
      <div class="page-loading" role="status">
        <span class="sr-only">Loading page…</span>
        <Lottie size={64} />
      </div>
    {:else if loadError}
      <div class="page-message" role="alert">{loadError}</div>
    {:else if page === 'home'}
      <Hero />

      <div class="container">
        <Skills />

                <FeaturedProjects projects={homeProjects} />

        <Services {services} {prices} {pricesLoading} bind:currency {currencyFlag} onCurrencyChange={setCurrency} />

                <Testimonials {testimonials} />

                <Timeline items={timelines} />

                <About />
                <Contact />
      </div>
    {:else if page === 'blogs'}
      <BlogsPage initial={blogs} categories={blogCategories} />
    {:else if page === 'blog-detail' && activeBlog}
      <BlogDetailPage post={activeBlog} latest={latestBlogs} bind:mobileReaderMenuOpen={mobileBlogReaderSettingsOpen} />
    {:else if page === 'projects'}
      <ProjectListPage {categories} {projects} {filter} {loadingMore} {hasMore} onSelectCategory={selectCategory} onLoadMore={loadMore} />
    {:else if page === 'experience'}
      <ExperiencePage {experiences} />
    {:else if page === 'detail' && activeProject}
      <ProjectDetailPage project={activeProject} {relatedProjects} bind:selectedImage />
    {:else}
      <section class="page-message"><div class="section-tag"><span class="section-tag-text">404</span><span class="section-tag-line"></span></div><h1 class="section-text-header">Page not found</h1><p class="section-subtitle">The page you're looking for doesn't exist.</p><a href="/" class="btn-glow glow-rust">Back to Home</a></section>
    {/if}
  </main>
  <Footer />
</div>
