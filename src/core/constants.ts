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

// Pieces
export type Piece = {
  figure: Figure;
  color: Color;
};

// Symbols
export const WHITE_KING_SYMBOL = '♔';
export const WHITE_QUEEN_SYMBOL = '♕';
export const WHITE_ROOK_SYMBOL = '♖';
export const WHITE_BISHOP_SYMBOL = '♗';
export const WHITE_KNIGHT_SYMBOL = '♘';
export const WHITE_PAWN_SYMBOL = '♙';
export const BLACK_KING_SYMBOL = '♚';
export const BLACK_QUEEN_SYMBOL = '♛';
export const BLACK_ROOK_SYMBOL = '♜';
export const BLACK_BISHOP_SYMBOL = '♝';
export const BLACK_KNIGHT_SYMBOL = '♞';
export const BLACK_PAWN_SYMBOL = '♟';

export type FigureSymbol =
  | typeof WHITE_KING_SYMBOL
  | typeof WHITE_QUEEN_SYMBOL
  | typeof WHITE_ROOK_SYMBOL
  | typeof WHITE_BISHOP_SYMBOL
  | typeof WHITE_KNIGHT_SYMBOL
  | typeof WHITE_PAWN_SYMBOL
  | typeof BLACK_KING_SYMBOL
  | typeof BLACK_QUEEN_SYMBOL
  | typeof BLACK_ROOK_SYMBOL
  | typeof BLACK_BISHOP_SYMBOL
  | typeof BLACK_KNIGHT_SYMBOL
  | typeof BLACK_PAWN_SYMBOL;

// Empty String
export const EMPTY_STRING = '';

export type EmptyString = typeof EMPTY_STRING;

// Slot status
export const SLOT_STATUS_DEFAULT = 'default';
export const SLOT_STATUS_SELECTED = 'selected';
export const SLOT_STATUS_TARGETED = 'targeted';

export type SlotStatus =
  | typeof SLOT_STATUS_DEFAULT
  | typeof SLOT_STATUS_SELECTED
  | typeof SLOT_STATUS_TARGETED;
