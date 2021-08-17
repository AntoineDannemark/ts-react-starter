// Domains
export const BOARD_DOMAIN = 'board';

// Colors
export const WHITE = 'white';
export const BLACK = 'black';

export type Color = typeof WHITE | typeof BLACK;

// Figures
export const PAWN = 'pawn';
export const BISHOP = 'bishop';
export const KNIGHT = 'knight';
export const ROOK = 'rook';
export const QUEEN = 'queen';
export const KING = 'king';

export type Figure =
  | typeof PAWN
  | typeof BISHOP
  | typeof KNIGHT
  | typeof ROOK
  | typeof QUEEN
  | typeof KING;

// Slot status
export const SLOT_STATUS_DEFAULT = 'default';
export const SLOT_STATUS_SELECTED = 'selected';
export const SLOT_STATUS_TARGETED = 'targeted';

export type SlotStatus =
  | typeof SLOT_STATUS_DEFAULT
  | typeof SLOT_STATUS_SELECTED
  | typeof SLOT_STATUS_TARGETED;
