---
name: review-verification-gotchas
description: Non-obvious traps when verifying this site's UI in review (headless Chrome min width, framer useReducedMotion hydration, Chakra Container prop no-ops)
metadata:
  type: project
---

Three things that produced false or missed findings during the LotV polish-pass review (2026-09-14):

- Headless Chrome (`--headless=new --window-size=390,...`) clamps the window to ~500px wide on macOS and crops the PNG to 390. Content looks like it overflows when it does not. **How to apply:** for sub-500px layout checks use the phase QA `scrollWidth === innerWidth` number, gstack `/browse` with device emulation, or DevTools; do not trust raw `--screenshot` at phone widths. Also add `--force-prefers-reduced-motion` + `--virtual-time-budget=15000` or framer `Section` fades are still at opacity 0 in the capture.
- framer-motion `useReducedMotion()` seeds `useState` synchronously from `prefersReducedMotion.current`, so it is `true` on the first client render but falsy during SSR. Any component that changes DOM *structure* on it (`protoss-warp-in.js`, `ffix-world-map.js`, `game-theme-toggle.js`) hydration-fails for reduce-motion users. **How to apply:** whenever a review touches these wrappers, test with reduced motion on; the fix is a post-mount flag or same-structure-different-props.
- Chakra v2 only maps `justify` / `align` / `wrap` to flex CSS on `Flex`/`Stack`. On `Container`/`Box` they leak as inert HTML attributes (`justify="space-between"` visible in SSR HTML). The navbar Container relies on this by accident. **How to apply:** grep the SSR HTML for ` align="| wrap="| justify="` when reviewing layout changes.

**Why:** all three wasted review time or would have shipped a wrong verdict; none are visible from the diff alone.
