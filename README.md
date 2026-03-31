# Tony's Homepage

My personal homepage built with Next.js and themed after Final Fantasy IX.

> **A message to [Takuya Matsuyama](https://www.devas.life/):** This project started as a fork of your beautiful homepage template. Your work inspired me to build my own corner of the internet, and I'm deeply grateful for that foundation. Over time, I've taken it in a very different direction — wrapping everything in a Final Fantasy IX aesthetic with battle systems, character sheets, and Moogle mascots — but the spark came from you. Thank you for sharing your craft with the world.

## Features

- **FFIX Character Sheet** — Stats, equipment panel, and status effects styled as a Final Fantasy IX UI
- **Battle System** — Hidden turn-based RPG encounter triggered by clicking the Moogle 5 times. Fight random enemies as a Black Mage with Fire, Ice, and Thunder spells
- **Tetra Master Cards** — Featured projects displayed as collectible cards from the FFIX card game
- **Moogle Mascot** — Animated SVG Moogle with flying animation
- **Mognet Newsletter** — Email signup themed as the FFIX mail delivery service
- **World Map** — Location visualization (Danang, Vietnam)
- **Blog Feed** — RSS aggregation from Coder Horizon Substack with FFIX-styled panels
- **3D Voxel Dog** — Interactive Three.js model with Excalibur sword sparkle effects and orbit controls
- **Wallpaper Store** — Downloadable wallpaper packs (Cherry Blossoms, Machiya) via Payhip
- **Dark/Light Mode** — Cookie-based color mode persistence with system preference detection
- **Page Transitions** — Smooth animations between routes via Framer Motion

## Stack

- [Next.js](https://nextjs.org/) 13 (Pages Router) — React framework with SSR and route pre-fetching
- [Chakra UI](https://chakra-ui.com/) v2 — Accessible component library with theming
- [Three.js](https://threejs.org/) — 3D rendering for the voxel dog model
- [Framer Motion](https://www.framer.com/motion/) — Page transition and UI animations
- [React Icons](https://react-icons.github.io/react-icons/) — Icon library
- [Vercel Analytics](https://vercel.com/analytics) — Usage tracking
- [Payhip](https://payhip.com/) — Digital product sales (wallpaper packs)

## Project Structure

```
$PROJECT_ROOT
├── pages              # Routes (index, works, posts, wallpapers, 404)
│   ├── works          # Individual project detail pages
│   └── wallpapers     # Wallpaper pack gallery pages
├── components
│   ├── battle         # Turn-based battle system (engine, UI, sprites, effects, enemies)
│   ├── icons          # Custom SVG icon components
│   ├── layouts        # Main layout and article layout wrappers
│   └── ffix-*         # FFIX-themed UI components (char sheet, battle menu, moogle, etc.)
├── lib                # Theme config and 3D model loader
└── public
    ├── images         # Profile photo, work thumbnails, wallpaper galleries
    ├── *.glb          # 3D models (dog, sword)
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

MIT License.

You can create your own homepage for free without notifying me by forking this project under the following conditions:

- Add a link to [Takuya Matsuyama's homepage](https://www.craftz.dog/) as attribution for the original template
- Do not use the 3D voxel dog model
- Do not use my personal images and content

Check out [LICENSE](./LICENSE) for more detail.
