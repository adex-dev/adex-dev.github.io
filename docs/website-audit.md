# Website audit and improvement plan

Audit date: 2026-11-14  
Scope: repository source, build configuration, static assets, supplied desktop/mobile screenshots, and production prerender output. The live site could not be inspected with the available browser tool.

## Findings

### Priority 0: security and correctness

- Database supplied copy is rendered with `dangerouslySetInnerHTML` in project descriptions, cards, timelines, and testimonials. These fields need safe rendering because the content source can change independently of the frontend.
- Project detail contained references to route variables that were not in scope, which caused server rendering to fail. The project list also passed an undefined variable into its cards. These defects undermine prerendered content and navigation.
- The project detail CTA linked to `services.html`, a path that is not defined by the router.
- External links opened in new tabs without consistently declaring `rel="noopener noreferrer"`.

### Priority 1: accessibility and responsive UX

- The clickable logo was a `div`, so it was not a keyboard link. Navigation controls have inconsistent accessible names and expanded state, and carousel controls had no labels.
- Keyboard focus styles were not defined consistently. Reduced-motion support existed in a few stylesheets but was not applied to the reveal hook.
- The supplied desktop screenshot shows a wide empty area beside the hero copy. The project uses viewport-height-based breakpoint selection and responsive presets that were not mapped for every declared breakpoint; the initial responsive state is `0 × 0` until an effect runs.
- Logo alt text was generic, service flag alt text exposed an asset URL, and project-detail images used static placeholder alt text.
- Some page headings lacked a page-level `h1` or used semantic elements inconsistently.

### Priority 1: search and content

- Page metadata and structured data must exist in server-rendered HTML for each route. Project details and the experience page need distinct titles, descriptions, and canonical URLs.
- The source sitemap contained fragment URLs and a generic project-detail URL. It did not enumerate the database-backed project pages.
- A generic `404.tsx` component existed, but the static deployment did not emit a root `404.html` file.
- Contact currently offers email and social links rather than a form; preserve that working contact path.
- Keep existing testimonials, work history, and impact figures; do not create new claims.

### Priority 1: performance

- The production build emits a JavaScript entry chunk around 950 kB, alongside separate React and Lottie chunks. The syntax highlighter imports the broad Prism bundle although project pages use only a few languages.
- Lottie code is dynamically loaded from the loading component, but its third-party `eval` warning remains. The generated production build also warns about large chunks.
- Current static assets are modest in total size; the social preview image was a JPEG stored with a `.png` extension, now corrected to `.jpg`.

### Priority 2: maintainability and verification

- Responsive layout is spread across many preset files and CSS layers. Keep the system, but fill missing breakpoint mappings and use a shared source of truth where practical.
- The repository has no dedicated test script. Use the production build, prerender output checks, and focused static checks for the current QA pass.
- Deployment-specific HTTP security headers cannot be verified or configured from this repository alone. The Supabase publishable key is client-side by design; access control must remain enforced by Supabase RLS policies.

## Implementation order

1. Fix server rendering, route links, and safe text rendering. **Done.** Database content now passes through an allowlist renderer; route links, project page rendering, and static 404 generation are fixed.
2. Improve navigation, focus, reduced motion, headings, image descriptions, and responsive presets. **Implemented; visual device QA remains pending.** The responsive provider starts from a stable mobile preset; tablet widths use the compact menu, and mobile/tablet sections no longer force a fixed viewport-height table layout. Additional width-specific CSS protects the hero, cards, and content gutters.
3. Reduce the syntax-highlighter bundle and retain route-based loading. **Done.** The initial JavaScript chunk fell from about 949 kB to about 363 kB in the latest successful build.
4. Keep unique route metadata, JSON-LD, canonical URLs, generated sitemap, robots, and a deployable 404 document. **Done.** Project routes and experience data are prerendered; the sitemap is generated from current project routes.
5. Run production build and inspect generated pages, route metadata, sitemap, and bundle sizes. **Done.** TypeScript and production build pass; prerendered pages have unique title/description/canonical metadata and H1s, applicable routes include parseable JSON-LD, the sitemap XML and structured-data JSON parse, and the 404 output is marked `noindex` with no canonical. Desktop/mobile visual checks and live Core Web Vitals/HTTP-header checks remain unavailable in this local pass.

## Limits

No live browser audit, automated accessibility scan, Core Web Vitals field data, or Supabase policy review was available in this environment. Those checks require the deployed site, real device/browser sessions, field data, or database-console access.
