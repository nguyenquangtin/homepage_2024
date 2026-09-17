import {
  KHALA_GOLD,
  PROTOSS_BRONZE,
  PROTOSS_CYAN,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_DEEP_GOLD,
  PROTOSS_GOLD_LIGHT
} from '../../lib/site-theme-context'
import { SCENE_HEX } from './templar-scene-style'
import TemplarFigureDefs from './templar-figure-defs-svg'
import { TemplarArm, PsionicEnergy } from './templar-arms-energy-svg'
import * as P from './templar-figure-paths'

const url = (id, name) => `url(#${id(name)})`

const Pauldron = ({ id, shape }) => (
  <g>
    <polygon
      points={shape.points}
      fill={url(id, 'gold')}
      stroke={PROTOSS_BRONZE}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d={shape.bevel}
      fill="none"
      stroke={PROTOSS_GOLD_LIGHT}
      strokeOpacity="0.85"
      strokeWidth="1.5"
    />
    <path
      d={shape.seam}
      fill="none"
      stroke={PROTOSS_CYAN}
      strokeOpacity="0.55"
      strokeWidth="1"
    />
  </g>
)

// Layer order matters: aura → cords → robes → torso → far arm → far
// pauldron → hood → near pauldron → near arm → energy (front-most).
const TemplarFigure = ({ id }) => (
  <g className="tc-figure">
    <TemplarFigureDefs id={id} />

    {/* psionic aura — breathing */}
    <ellipse
      className="tc-aura"
      cx="410"
      cy="250"
      rx="210"
      ry="250"
      fill={url(id, 'aura')}
    />
    <ellipse
      className="tc-pulse"
      cx="430"
      cy="110"
      rx="130"
      ry="105"
      fill={url(id, 'aura')}
    />

    {/* nerve cords trail behind the hood */}
    <g className="tc-cords" fill="none" strokeLinecap="round">
      {P.CORDS.map((d, i) => (
        <g key={i}>
          <path d={d} stroke={SCENE_HEX.cord} strokeWidth={i < 4 ? 12 : 7} />
          <path d={d} stroke={SCENE_HEX.cordLit} strokeWidth={i < 4 ? 4 : 2} />
        </g>
      ))}
      {P.CORD_RINGS.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="4.5"
          stroke={KHALA_GOLD}
          strokeOpacity="0.85"
          strokeWidth="2"
        />
      ))}
    </g>

    {/* robes: wide back layer, front fold, folds, gold trim, cyan rim */}
    <path d={P.ROBE} fill={url(id, 'robe')} />
    <path d={P.ROBE_FRONT} fill={SCENE_HEX.robeLit} opacity="0.55" />
    {P.ROBE_FOLDS.map(d => (
      <path
        key={d}
        d={d}
        fill="none"
        stroke={SCENE_HEX.robeDeep}
        strokeOpacity="0.7"
        strokeWidth="3"
        strokeLinecap="round"
      />
    ))}
    <path
      d={P.ROBE_TRIM}
      stroke={KHALA_GOLD}
      strokeOpacity="0.45"
      strokeWidth="2"
    />
    <path
      d={P.ROBE_HEM}
      fill="none"
      stroke={KHALA_GOLD}
      strokeOpacity="0.6"
      strokeWidth="2"
    />
    <path
      d={P.ROBE_CYAN_RIM}
      fill="none"
      stroke={url(id, 'cyan-rim')}
      strokeWidth="2.5"
    />

    {/* torso + chest khaydarin crystal */}
    <path d={P.TORSO} fill={url(id, 'robe')} />
    <path
      d={P.BELT}
      fill="none"
      stroke={KHALA_GOLD}
      strokeOpacity="0.5"
      strokeWidth="1.5"
    />
    <circle
      className="tc-pulse"
      cx="440"
      cy="214"
      r="26"
      fill={url(id, 'hand-glow')}
    />
    <polygon
      points={P.CHEST_CRYSTAL}
      fill={url(id, 'crystal')}
      stroke={PROTOSS_DEEP_GOLD}
      strokeWidth="1.5"
    />

    <TemplarArm id={id} side="far" />
    <Pauldron id={id} shape={P.PAULDRON_FAR} />

    {/* hood: shadowed face, glowing slit eyes, gold crest, cyan screen rim */}
    <path d={P.HOOD} fill={url(id, 'robe')} />
    <path d={P.FACE} fill={url(id, 'face')} />
    <ellipse
      className="tc-pulse"
      cx="472"
      cy="140"
      rx="34"
      ry="22"
      fill={url(id, 'hand-glow')}
    />
    {P.EYES.map(pts => (
      <polygon
        key={pts}
        points={pts}
        fill={PROTOSS_CYAN_BRIGHT}
        stroke={PROTOSS_CYAN}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    ))}
    <path
      d={P.HOOD_GOLD_RIM}
      fill="none"
      stroke={KHALA_GOLD}
      strokeOpacity="0.8"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d={P.HOOD_CYAN_RIM}
      fill="none"
      stroke={PROTOSS_CYAN}
      strokeOpacity="0.6"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d={P.HOOD_JAW}
      fill="none"
      stroke={KHALA_GOLD}
      strokeOpacity="0.5"
      strokeWidth="1.5"
    />

    <Pauldron id={id} shape={P.PAULDRON_NEAR} />
    <TemplarArm id={id} side="near" />
    <PsionicEnergy />
  </g>
)

export default TemplarFigure
