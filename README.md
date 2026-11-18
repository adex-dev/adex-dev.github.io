# Akmad Nudin Portfolio

Portfolio site built with Svelte 5, TypeScript, Vite, Tailwind CSS, and Supabase. This is a Svelte + Vite application; it does not use SvelteKit.

## Development

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env.local`, then run:

```sh
bun install
bun run dev
```

## Build and checks

```sh
bun run check
bun run build
bun run preview
```

The build generates the service worker and web app manifest, plus static route entry files for `/project-list`, `/experience`, and the host's `404.html` fallback. Dynamic page metadata is updated by the Svelte app as route data loads.

The app reads the existing Supabase RPCs and tables; it does not change the database schema. Project pages use the `get_projects` and `get_projects_random` RPCs, experience uses `get_experiences`, and home page sections read services, pricing, testimonials, and timelines.
