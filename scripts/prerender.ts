import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const root = process.cwd();
const outputDir = path.resolve(root, 'dist');
const vite = await createServer({
  configFile: path.resolve(root, 'vite.config.ts'),
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
});

type PageKind = 'home' | 'projects' | 'experience' | 'detail' | 'notfound';
const pageFor = (route: string): PageKind => {
  if (route === '/') return 'home';
  if (route === '/project-list') return 'projects';
  if (route === '/experience') return 'experience';
  if (route.startsWith('/project-detail/')) return 'detail';
  return 'notfound';
};

try {
  const [{ default: App }, db, svelteServer] = await Promise.all([
    vite.ssrLoadModule('/src/App.svelte'),
    vite.ssrLoadModule('/src/lib/supabase.ts'),
    vite.ssrLoadModule('svelte/server'),
  ]);
  const render = svelteServer.render as typeof import('svelte/server').render;
  const supabase = db.supabase;
  const projectSelect = db.projectSelect as string;
  const template = await readFile(path.join(outputDir, 'index.html'), 'utf8');
  const routes = new Set(['/','/project-list','/experience','/notfound']);
  if (supabase) {
    try {
      const projectRoutes = await supabase.rpc('get_projects').select('category,prefix_url');
      if (projectRoutes.error) throw projectRoutes.error;
      for (const item of projectRoutes.data ?? []) {
        const route = `/project-detail/${encodeURIComponent(item.category)}/${encodeURIComponent(item.prefix_url)}`;
        routes.add(route);
      }
    } catch (error) {
      console.warn('Project route discovery skipped; browser-side routing remains available.', error);
    }
  }

  async function loadPage(route: string) {
    const page = pageFor(route);
    const initialData: Record<string, unknown> = { path: route, page, loadFailed: false };
    if (!supabase || page === 'notfound') return initialData;
    try {
      if (page === 'home') {
        const [featured, serviceResult, priceResult, testimonialResult, timelineResult] = await Promise.all([
          supabase.rpc('get_projects_random').select('id,title_short,stacks,vendor,status_category,short_desc,stack_colors,category,prefix_url').eq('status_project_primary', 'primary').limit(3),
          supabase.rpc('get_services'),
          supabase.from('pricelist').select('id,prefix,price,state,services_id').eq('prefix', 'USD'),
          supabase.from('testimonials').select('*').order('id', { ascending: true }),
          supabase.from('timelines').select('*').order('id', { ascending: true }),
        ]);
        for (const result of [featured, serviceResult, priceResult, testimonialResult, timelineResult]) if (result.error) throw result.error;
        Object.assign(initialData, {
          homeProjects: featured.data ?? [], services: serviceResult.data ?? [], prices: priceResult.data ?? [],
          testimonials: testimonialResult.data ?? [], timelines: timelineResult.data ?? [],
        });
      } else if (page === 'projects') {
        const [categoryResult, projectsResult] = await Promise.all([
          supabase.from('categories').select('id,name').eq('status', 'true'),
          supabase.rpc('get_projects').select(projectSelect).order('id', { ascending: false }).range(0, 11),
        ]);
        if (categoryResult.error) throw categoryResult.error;
        if (projectsResult.error) throw projectsResult.error;
        Object.assign(initialData, { categories: categoryResult.data ?? [], projects: projectsResult.data ?? [] });
      } else if (page === 'experience') {
        const result = await supabase.rpc('get_experiences').order('id', { ascending: false });
        if (result.error) throw result.error;
        Object.assign(initialData, { experiences: result.data ?? [] });
      } else if (page === 'detail') {
        const [category, slug] = route.split('/').filter(Boolean).slice(1).map(decodeURIComponent);
        const result = await supabase.rpc('get_projects').select(projectSelect).eq('category', category.toLowerCase()).eq('prefix_url', slug).order('id', { ascending: false });
        if (result.error) throw result.error;
        const project = result.data?.[0] ?? null;
        if (!project) return { ...initialData, page: 'notfound' };
        const related = await supabase.rpc('get_projects_random').select('id,title_short,stacks,vendor,status_category,prefix_url,category').eq('category', category.toLowerCase()).neq('prefix_url', slug).limit(3);
        if (related.error) throw related.error;
        Object.assign(initialData, { activeProject: project, relatedProjects: related.data ?? [] });
      }
    } catch (error) {
      console.warn(`Could not prerender ${route}; it will load from Supabase in the browser.`, error);
      initialData.loadFailed = true;
    }
    return initialData;
  }

  for (const route of routes) {
    const initialData = await loadPage(route);
    const rendered = render(App, { props: { initialData } });
    const safeData = JSON.stringify(initialData).replace(/</g, '\\u003c');
    const cleanTemplate = template
      .replace(/\s*<meta name="description"[^>]*\/>/i, '')
      .replace(/\s*<link rel="canonical"[^>]*\/>/i, '')
      .replace(/\s*<title>[^<]*<\/title>/i, '');
    const html = cleanTemplate
      .replace('<div id="app"></div>', `<div id="app">${rendered.body}</div><script id="portfolio-initial-data" type="application/json">${safeData}</script>`)
      .replace('</head>', `${rendered.head}\n</head>`);
    if (route === '/notfound') {
      await writeFile(path.join(outputDir, '404.html'), html, 'utf8');
    } else {
      const directory = route === '/' ? outputDir : path.join(outputDir, ...route.slice(1).split('/').map(decodeURIComponent));
      await mkdir(directory, { recursive: true });
      await writeFile(path.join(directory, 'index.html'), html, 'utf8');
    }
    console.log(`Prerendered ${route}`);
  }

  const sitemapRoutes = [...routes].filter((route) => route !== '/notfound');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes.map((route) => `  <url><loc>${new URL(route, 'https://akmadnudin.com').href}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(path.join(outputDir, 'sitemap.xml'), sitemap, 'utf8');
} finally {
  await vite.close();
}
