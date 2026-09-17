// High Templar silhouette paths in scene units (viewBox 1200x450); the
// figure faces right toward the console. Original homage: a tall cowl with
// a back-swept crest, huge angular pauldrons, nerve cords trailing from the
// hood, hovering robes with gold hem trim. Edit here, not in the JSX.

// Cowl: peaks high at the back, slopes forward to an overhanging brow
export const HOOD =
  'M 388 176 C 352 150, 338 96, 350 50 C 356 30, 372 14, 386 16 C 420 20, 470 60, 486 100 C 494 118, 496 136, 492 146 C 490 162, 482 174, 472 182 L 456 190 C 434 198, 408 196, 388 176 Z'
export const HOOD_GOLD_RIM =
  'M 348 56 C 354 30, 372 14, 386 16 C 420 20, 470 60, 486 100'
export const HOOD_CYAN_RIM =
  'M 486 100 C 494 118, 496 136, 492 146 C 490 162, 482 174, 472 182'
export const HOOD_JAW = 'M 388 176 C 408 196, 434 198, 456 190'
export const FACE =
  'M 446 100 C 468 100, 488 116, 490 138 C 491 158, 484 174, 472 184 C 454 180, 442 162, 440 138 C 438 120, 440 108, 446 100 Z'
export const EYES = [
  '452,138 466,132 468,142 455,146',
  '474,136 490,130 492,141 477,145'
]

export const ROBE =
  'M 372 190 C 350 270, 320 340, 260 430 C 280 448, 310 470, 345 480 C 390 462, 430 450, 470 466 C 505 476, 540 460, 552 430 C 546 360, 522 300, 512 240 C 505 210, 490 190, 470 186 Z'
export const ROBE_HEM =
  'M 260 430 C 280 448, 310 470, 345 480 C 390 462, 430 450, 470 466 C 505 476, 540 460, 552 430'
export const ROBE_CYAN_RIM =
  'M 470 186 C 490 190, 505 210, 512 240 C 522 300, 546 360, 552 430'
export const ROBE_FRONT =
  'M 404 250 C 402 330, 396 400, 392 470 C 420 466, 448 462, 472 468 C 476 400, 476 330, 470 252 Z'
export const ROBE_TRIM = 'M 438 250 L 434 468'
export const ROBE_FOLDS = [
  'M 332 296 C 322 360, 300 410, 286 442',
  'M 498 278 C 504 340, 520 400, 532 448'
]

export const TORSO =
  'M 392 176 C 420 196, 456 196, 478 178 L 492 240 C 452 262, 410 262, 392 244 Z'
export const BELT = 'M 392 244 C 410 262, 452 262, 492 240'
export const CHEST_CRYSTAL = '440,196 454,212 440,234 426,212'

export const PAULDRON_NEAR = {
  points: '452,180 490,156 542,170 552,206 522,228 476,222',
  bevel: 'M 490 160 L 540 173',
  seam: 'M 462 214 L 520 222'
}
export const PAULDRON_FAR = {
  points: '400,172 372,156 330,176 328,206 356,220 396,214',
  bevel: 'M 372 160 L 334 178',
  seam: 'M 340 206 L 392 210'
}

// Four nerve cords off the back of the hood + two chin cords (the "beard")
export const CORDS = [
  'M 362 96 C 320 104, 292 140, 286 196',
  'M 358 118 C 322 132, 300 168, 302 224',
  'M 362 140 C 332 158, 318 196, 326 248',
  'M 376 160 C 350 182, 344 220, 358 262',
  'M 456 190 C 452 208, 446 226, 450 248',
  'M 444 194 C 436 214, 430 232, 436 256'
]
export const CORD_RINGS = [
  [311, 128],
  [316, 155],
  [330, 181],
  [352, 204]
]
