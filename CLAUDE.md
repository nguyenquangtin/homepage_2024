# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server on 0.0.0.0
yarn build      # Production build
yarn lint       # ESLint via Next.js
yarn prettier   # Format all files
```

No test suite is configured.

## Stack

- **Next.js 13** (Pages Router) with React 18
- **Chakra UI v2** for components and theming
- **Framer Motion** for page transition animations
- **Three.js** for the interactive 3D voxel dog on the homepage
- **Vercel Analytics** for usage tracking

## Architecture

### Pages Router structure
All routes live in `pages/`. Dynamic subpages (e.g. individual work items) are plain files under `pages/works/` and `pages/wallpapers/` — not using Next.js dynamic routes.

### Theme & Styling
- Global theme defined in `lib/theme.js` — extends Chakra with custom colors, fonts, and component variants.
- Color mode defaults to dark, respects system preference.
- Chakra provider with cookie-based color mode persistence is in `components/chakra.js`.

### Layout
`components/layouts/main.js` is the single shared layout wrapping all pages. It renders:
1. `NavBar` (top navigation)
2. `LazyVoxelDog` — Three.js canvas, loaded client-side only (`ssr: false`) with a spinner fallback
3. Page content (`children`)
4. `Footer`

`_app.js` wraps everything in `<Chakra>`, `<Fonts>`, `<Payhip>` (embed script), and `<AnimatePresence>` for page transitions.

### 3D Model
`components/voxel-dog.js` renders a `.glb` model via Three.js with mouse-drag orbit. `components/voxel-dog-loader.js` is the spinner shown while it loads. The model file lives in `public/`.

### Content pages
- `pages/index.js` — homepage/bio
- `pages/works.js` — works listing using `components/work.js` grid items
- `pages/works/*.js` — individual work detail pages using `components/layouts/article.js`
- `pages/posts.js` — blog posts (external links)
- `pages/wallpapers/` — wallpaper gallery pages

### Deployment
Deployed to Vercel. `vercel.json` is present for any custom config.
