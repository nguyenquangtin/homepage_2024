import {
  KHALA_GOLD,
  PROTOSS_BRONZE,
  PROTOSS_CYAN,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_DEEP_GOLD,
  PROTOSS_GOLD_LIGHT
} from '../../lib/site-theme-context'
import { SCENE_HEX } from './phase-smith-scene-style'
import PhaseSmithFigureDefs from './phase-smith-figure-defs-svg'
import PhaseSmithHead from './phase-smith-figure-head-svg'
import { PhaseSmithArm } from './phase-smith-arms-energy-svg'
import PhaseBeams from './phase-smith-phase-beams-svg'
import * as P from './phase-smith-figure-paths'

const url = (id, name) => `url(#${id(name)})`

// Gold armour plate: gradient fill, bronze edge, optional light bevel
const Plate = ({ id, points, bevel }) => (
  <g>
    <polygon
      points={points}
      fill={url(id, 'gold')}
      stroke={SCENE_HEX.suitDeep}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {bevel && (
      <path
        d={bevel}
        fill="none"
        stroke={PROTOSS_GOLD_LIGHT}
        strokeOpacity="0.85"
        strokeWidth="1.5"
      />
    )}
  </g>
)

const Pauldron = ({ id, shape }) => (
  <g>
    <Plate id={id} points={shape.points} bevel={shape.bevel} />
    <path d={shape.seam} fill="none" stroke={PROTOSS_CYAN} strokeOpacity="0.55" />
    <circle
      className="tc-pulse"
      cx={shape.light[0]}
      cy={shape.light[1]}
      r="4"
      fill={PROTOSS_CYAN_BRIGHT}
    />
  </g>
)

// Small phase-probe helper hovering at the far hip
const Drone = ({ id }) => (
  <g className="tc-drone">
    <ellipse cx={P.DRONE.core[0]} cy={P.DRONE.core[1] + 18} rx="24" ry="10" fill={url(id, 'hand-glow')} opacity="0.6" />
    <path d={P.DRONE.ringBack} fill="none" stroke={PROTOSS_CYAN} strokeOpacity="0.4" strokeWidth="1.5" />
    <Plate id={id} points={P.DRONE.body} />
    <circle className="tc-pulse" cx={P.DRONE.core[0]} cy={P.DRONE.core[1]} r="6" fill={PROTOSS_CYAN_BRIGHT} />
    <path d={P.DRONE.ringFront} fill="none" stroke={PROTOSS_CYAN} strokeOpacity="0.8" strokeWidth="1.5" />
  </g>
)

const Leg = ({ id, path, thigh, knee, shade }) => (
  <g opacity={shade}>
    <path d={path} fill="none" stroke={url(id, 'leg')} strokeWidth="30" strokeLinecap="round" />
    {thigh && <Plate id={id} points={thigh} />}
    <polygon
      points={`${knee[0] - 9},${knee[1]} ${knee[0] - 4},${knee[1] - 8} ${knee[0] + 4},${knee[1] - 8} ${knee[0] + 9},${knee[1]} ${knee[0] + 4},${knee[1] + 8} ${knee[0] - 4},${knee[1] + 8}`}
      fill={url(id, 'gold')}
      stroke={PROTOSS_BRONZE}
      strokeWidth="1.5"
    />
  </g>
)

// Layer order matters: drone → cords → far arm (its forearm emerges from
// behind the hip) → legs → tabard → torso plates → far pauldron → head →
// near pauldron → near arm → beams (front).
const PhaseSmithFigure = ({ id }) => (
  <g className="tc-figure">
    <PhaseSmithFigureDefs id={id} />
    <Drone id={id} />

    {/* short sheathed nerve cords off the nape */}
    <g fill="none" strokeLinecap="round">
      {P.CORDS.map(d => (
        <g key={d}>
          <path d={d} stroke={SCENE_HEX.cord} strokeWidth="10" />
          <path d={d} stroke={SCENE_HEX.cordLit} strokeWidth="3.5" />
        </g>
      ))}
      {P.CORD_RINGS.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="4.5" stroke={KHALA_GOLD} strokeOpacity="0.85" strokeWidth="2" />
      ))}
    </g>

    <PhaseSmithArm id={id} side="far" />
    {/* far leg has no thigh plate: too small at scene scale, cleaner silhouette */}
    <Leg id={id} path={P.LEG_FAR} knee={P.KNEES[1]} shade="0.8" />
    <Leg id={id} path={P.LEG_NEAR} thigh={P.THIGH_NEAR} knee={P.KNEES[0]} shade="1" />

    {/* tabard: navy apron with gold trim and a cyan rim on the screen side */}
    <path d={P.TABARD} fill={url(id, 'suit')} />
    {P.TABARD_TRIM.map(d => (
      <path key={d} d={d} fill="none" stroke={KHALA_GOLD} strokeOpacity="0.5" strokeWidth="1.5" />
    ))}
    <path d={P.TABARD_RIM} fill="none" stroke={url(id, 'cyan-rim')} strokeWidth="2.5" />

    {/* torso: navy suit with gold rib seams, breastplate with the core crystal */}
    <path d={P.TORSO} fill={url(id, 'suit')} />
    {P.ABS_SEAMS.map(d => (
      <path key={d} d={d} fill="none" stroke={KHALA_GOLD} strokeOpacity="0.5" strokeWidth="2" />
    ))}
    <Plate id={id} points={P.CHEST_PLATE.points} bevel={P.CHEST_PLATE.bevel} />
    <circle className="tc-pulse" cx="446" cy="222" r="22" fill={url(id, 'hand-glow')} />
    <polygon
      points={P.CHEST_CRYSTAL}
      fill={url(id, 'crystal')}
      stroke={PROTOSS_DEEP_GOLD}
      strokeWidth="1.5"
    />
    <Plate id={id} points={P.BELT} />
    <polygon points={P.BUCKLE} fill={PROTOSS_GOLD_LIGHT} stroke={PROTOSS_BRONZE} strokeWidth="1" />
    <Plate id={id} points={P.GORGET} />

    <Pauldron id={id} shape={P.PAULDRON_FAR} />
    <PhaseSmithHead id={id} />
    <Pauldron id={id} shape={P.PAULDRON_NEAR} />
    <PhaseSmithArm id={id} side="near" />
    <PhaseBeams id={id} />
  </g>
)

export default PhaseSmithFigure
