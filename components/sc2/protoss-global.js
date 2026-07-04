import { Global } from '@emotion/react'

// Protoss contextual chrome (#9): psionic scrollbar, selection color,
// energy-seam + crystal-gem keyframes. All animation is disabled under
// prefers-reduced-motion.
const ProtossGlobal = () => (
  <Global
    styles={`
      /* Psionic scrollbar — bronze rail, energy thumb */
      ::-webkit-scrollbar { width: 10px; height: 10px; }
      ::-webkit-scrollbar-track { background: #05040c; }
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #8a6d2f, rgba(0, 187, 221, 0.55));
        border: 1px solid rgba(240, 192, 64, 0.35);
        border-radius: 2px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #c89a30, rgba(0, 221, 255, 0.7));
      }
      * { scrollbar-width: thin; scrollbar-color: #8a6d2f #05040c; }

      ::selection { background: rgba(0, 221, 255, 0.35); color: #eafcff; }

      /* Energy seam — cyan pulse travelling along a panel edge */
      @keyframes protoss-seam {
        0% { background-position: -60% 0; }
        100% { background-position: 160% 0; }
      }
      .protoss-seam {
        background-image: linear-gradient(
          90deg, transparent, rgba(0, 221, 255, 0.9), transparent
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

      @media (prefers-reduced-motion: reduce) {
        .protoss-seam, .protoss-gem-core { animation: none; }
      }
    `}
  />
)

export default ProtossGlobal
