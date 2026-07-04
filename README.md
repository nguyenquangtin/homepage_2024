# Tony's Homepage

My personal homepage built with Next.js, styled as a **StarCraft II Protoss command console** — gold ornate frames, khaydarin crystals, psionic energy, and full Protoss terminology.

## Features

- **Protoss Command Console UI** — Gold/bronze ornate panels with SVG corner wings, crystal gems, and travelling energy seams across every page
- **Warp-In Hero** — Homepage hero materializes with a Protoss warp-in reveal; Tony presents as *Engineer of the Protoss Race* (En Taro Adun)
- **Psionic Background** — Rising energy motes + plasma-shield hex lattice with shimmer and expanding ripples
- **3D Protoss Pylon** — Interactive Three.js khaydarin crystal with power-field shockwaves and orbit controls
- **Tactical Minimap** — Location panel styled as an SC2 minimap: terrain grid, unit blips, camera viewport, NEXUS base marker at Danang
- **LotV Capsule Menu** — Navigation styled after the Legacy of the Void menu system
- **Khala Transmissions** — Blog feed via RSS from [Coder Horizon](https://coderhorizon.com) in a console archive panel
- **Protoss Terminology** — Chronicles of the Khala (works), Path of the Templar (career), Relics (featured), Star Chart (location)
- **Hidden FFIX Theme** — The previous Final Fantasy IX skin (battle system, Moogles, Tetra Master) lives on dormant in the codebase, toggleable by re-enabling one flag
- **Accessibility** — Full `prefers-reduced-motion` support; keyboard-visible focus on all interactive elements

## Stack

- [Next.js](https://nextjs.org/) 13 (Pages Router) — React framework with SSR
- [Chakra UI](https://chakra-ui.com/) v2 — Component library with theming
- [Three.js](https://threejs.org/) — 3D pylon rendering
- [Framer Motion](https://www.framer.com/motion/) — Warp-in reveals, page transitions
- [Vercel Analytics](https://vercel.com/analytics) — Usage tracking

## Project Structure

```
$PROJECT_ROOT
├── pages              # Routes (index, works, posts, 404)
│   └── works          # Individual project detail pages
├── components
│   ├── sc2            # Protoss console primitives (panel, button, ornaments, global chrome)
│   ├── battle         # Dormant FFIX battle system
│   ├── layouts        # Main layout and article layout wrappers
│   └── ffix-*         # Theme-aware components (char sheet, world map, etc.)
├── lib                # Theme config, color tokens, Protoss terminology map
└── public
    ├── images         # Profile photo, work thumbnails
    ├── *.glb          # 3D models
    └── *.ico/svg/png  # Favicons and OG image
```

## Getting Started

```bash
yarn install   # Install dependencies
yarn dev       # Start dev server
yarn build     # Production build
yarn lint      # Run ESLint
yarn prettier  # Format code
```

## License

MIT License. This site began years ago from [Takuya Matsuyama's homepage template](https://www.craftz.dog/) and has since been fully redesigned and rewritten.

You can fork this project for your own homepage under the following conditions:

- Do not use my personal images and content
- Do not use the 3D models

Check out [LICENSE](./LICENSE) for more detail.
