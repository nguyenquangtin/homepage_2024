import { Global } from '@emotion/react'
import {
  PROTOSS_BRONZE,
  PROTOSS_DEEP_GOLD,
  PROTOSS_TEAL_RGB,
  PROTOSS_CYAN_RGB,
  KHALA_GOLD_RGB
} from '../../lib/site-theme-context'

// One-off decorative constant — scrollbar rail; darker than any panel token
const TRACK_BG = '#05040c'

// Protoss contextual chrome (#9): psionic scrollbar, selection color,
// energy-seam + crystal-gem keyframes. All animation is disabled under
// prefers-reduced-motion.
const ProtossGlobal = () => (
  <Global
    styles={`
      /* Psionic scrollbar — bronze rail, energy thumb */
      ::-webkit-scrollbar { width: 10px; height: 10px; }
      ::-webkit-scrollbar-track { background: ${TRACK_BG}; }
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, ${PROTOSS_BRONZE}, rgba(${PROTOSS_TEAL_RGB}, 0.55));
        border: 1px solid rgba(${KHALA_GOLD_RGB}, 0.35);
        border-radius: 2px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, ${PROTOSS_DEEP_GOLD}, rgba(${PROTOSS_CYAN_RGB}, 0.7));
      }
      * { scrollbar-width: thin; scrollbar-color: ${PROTOSS_BRONZE} ${TRACK_BG}; }

      ::selection { background: rgba(${PROTOSS_CYAN_RGB}, 0.35); color: #eafcff; }

      /* Energy seam — cyan pulse travelling along a panel edge */
      @keyframes protoss-seam {
        0% { background-position: -60% 0; }
        100% { background-position: 160% 0; }
      }
      .protoss-seam {
        background-image: linear-gradient(
          90deg, transparent, rgba(${PROTOSS_CYAN_RGB}, 0.9), transparent
        );
        background-size: 45% 100%;
        background-repeat: no-repeat;
        animation: protoss-seam 3.2s linear infinite;
      }

      /* Crystal gem core pulse */
      @keyframes protoss-gem-pulse {
        0%, 100% { opacity: 0.35; }
        50% { opacity: 0.95; }
      }
      .protoss-gem-core { animation: protoss-gem-pulse 2.4s ease-in-out infinite; }

      /* Plasma-shield layer (#16): lattice shimmer + expanding ripples */
      @keyframes protoss-shield-shimmer {
        0%, 100% { opacity: 0.55; }
        50% { opacity: 1; }
      }
      .protoss-shield-shimmer {
        animation: protoss-shield-shimmer 9s ease-in-out infinite;
        will-change: opacity;
      }
      @keyframes protoss-shield-ripple {
        0% { transform: scale(0.15); opacity: 0.45; }
        100% { transform: scale(1.5); opacity: 0; }
      }
      .protoss-shield-ripple {
        animation: protoss-shield-ripple 8s ease-out infinite;
        will-change: transform, opacity;
      }

      /* One-shot cyan scan sweep on hover (LotV pass). Put .protoss-scan on
         an absolutely-positioned overlay inside a hover host: either a Chakra
         role="group" parent or any element with .protoss-scan-host. */
      @keyframes protoss-scan {
        from { background-position: -100% 0; }
        to { background-position: 200% 0; }
      }
      .protoss-scan {
        background-image: linear-gradient(
          90deg, transparent, rgba(${PROTOSS_CYAN_RGB}, 0.22), transparent
        );
        background-size: 60% 100%;
        background-repeat: no-repeat;
        background-position: -100% 0;
        opacity: 0;
      }
      .protoss-scan-host:hover .protoss-scan,
      [role='group']:hover .protoss-scan {
        opacity: 1;
        animation: protoss-scan 600ms ease-out 1;
      }

      /* Slow breathing ring — hero portrait frame (LotV pass) */
      @keyframes protoss-ring-pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      .protoss-ring-pulse { animation: protoss-ring-pulse 4s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .protoss-seam, .protoss-gem-core,
        .protoss-shield-shimmer, .protoss-shield-ripple,
        .protoss-ring-pulse { animation: none; }
        .protoss-shield-ripple { opacity: 0; }
        .protoss-scan-host:hover .protoss-scan,
        [role='group']:hover .protoss-scan { animation: none; opacity: 0; }
      }
    `}
  />
)

export default ProtossGlobal
