// Master phase-smith silhouette paths in scene units (viewBox 1200x450);
// the figure faces right toward the console. Original homage to a Khalai
// engineer: open crested helm with a tech visor, layered gold plates over a
// navy suit, short work tabard, digitigrade legs fading out below the knee.
// Edit here, not in the JSX.

// Open helm: plated crown over a back-swept cranium, the face is left open
export const HELM =
  'M 446 98 C 440 76, 424 64, 406 64 C 382 62, 356 78, 344 100 C 362 108, 384 126, 402 140 C 414 148, 424 154, 432 156 C 428 134, 434 114, 446 98 Z'
export const HELM_CREST =
  'M 446 98 C 440 78, 424 66, 406 66 C 384 64, 360 80, 348 100'
export const HELM_EDGE = 'M 432 156 C 428 134, 434 114, 446 98'
export const HELM_VENTS = ['M 398 100 L 412 116', 'M 408 92 L 422 108']
export const FACE =
  'M 446 98 C 470 90, 494 106, 496 132 C 498 156, 488 178, 468 190 C 452 186, 442 168, 440 146 C 438 124, 440 106, 446 98 Z'
export const FACE_RIM =
  'M 470 92 C 490 102, 498 122, 496 146 C 494 166, 486 180, 470 190'
export const CHIN_STRAP = 'M 436 160 C 446 178, 458 188, 470 190'
// Tech visor band across the eyes + a loupe-style eyepiece on the far side
export const VISOR = '440,126 502,116 504,132 442,142'
export const EYEPIECE = { cx: 454, cy: 134, r: 7 }
export const EYEPIECE_ARM = 'M 434 118 L 447 128'

// Nerve cords off the underside of the cranium, sheathed in gold rings
export const CORDS = [
  'M 360 108 C 334 122, 322 152, 326 198',
  'M 380 118 C 352 134, 340 166, 344 212',
  'M 392 132 C 366 150, 356 184, 362 228',
  'M 404 144 C 380 164, 372 200, 380 240'
]
export const CORD_RINGS = [
  [332, 141],
  [350, 154],
  [365, 170],
  [380, 185]
]

// Torso: navy suit showing between a gorget, a breastplate and the belt;
// the abdomen is suit with gold seam ribs, not more plate
export const GORGET = '418,190 488,184 494,200 478,206 424,206 412,200'
export const TORSO =
  'M 398 194 C 426 210, 462 210, 490 194 L 502 268 C 458 290, 412 290, 392 268 Z'
export const CHEST_PLATE = {
  points: '406,204 490,198 496,238 448,256 400,242',
  bevel: 'M 410 208 L 486 202'
}
export const ABS_SEAMS = ['M 410 268 L 488 264', 'M 414 288 L 484 284']
export const CHEST_CRYSTAL = '446,208 458,224 446,242 434,224'
export const BELT = '402,312 494,306 496,322 400,326'
export const BUCKLE = '440,308 456,308 460,316 456,324 440,324 436,316'

// Short work tabard hanging from the belt, cyan rim on the screen side
export const TABARD =
  'M 424 324 C 420 350, 418 376, 420 402 L 474 400 C 476 374, 476 348, 472 322 Z'
export const TABARD_TRIM = ['M 428 328 L 426 398', 'M 468 326 L 470 396']
export const TABARD_RIM = 'M 472 322 C 476 348, 476 374, 474 400'

// Digitigrade legs as thick strokes that fade out past the knee
export const LEG_NEAR =
  'M 468 330 C 492 348, 508 366, 510 390 C 508 414, 498 436, 492 460'
export const LEG_FAR =
  'M 420 332 C 402 352, 394 372, 396 392 C 400 416, 408 438, 410 460'
export const THIGH_NEAR = '470,336 500,352 510,382 490,388 470,362'
export const THIGH_FAR = '404,340 428,334 424,370 402,378 394,356'
export const KNEES = [
  [508, 392],
  [398, 396]
]

// Compact engineer pauldrons with a cyan seam and a small status light
export const PAULDRON_NEAR = {
  points: '456,190 496,176 540,186 546,218 518,232 478,228',
  bevel: 'M 496 180 L 538 189',
  seam: 'M 466 220 L 516 226',
  light: [522, 202]
}
export const PAULDRON_FAR = {
  points: '404,186 380,172 342,184 340,214 366,226 400,224',
  bevel: 'M 380 176 L 344 186',
  seam: 'M 350 214 L 396 218',
  light: [358, 200]
}

// Hovering phase-probe helper at the engineer's far hip: hex body inside
// an orbit ring (back half drawn behind the body, front arc over it)
export const DRONE = {
  body: '320,270 348,270 360,282 348,294 320,294 308,282',
  core: [334, 282],
  ringBack: 'M 310 288 A 24 9 0 0 1 358 288',
  ringFront: 'M 310 288 A 24 9 0 0 0 358 288'
}
