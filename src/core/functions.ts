import {
  BISHOP,
  BLACK,
  SLOT_STATUS_DEFAULT,
  WHITE,
  BLACK_BISHOP_SYMBOL,
  BLACK_KING_SYMBOL,
  BLACK_KNIGHT_SYMBOL,
  BLACK_PAWN_SYMBOL,
  BLACK_QUEEN_SYMBOL,
  BLACK_ROOK_SYMBOL,
  Color,
  FigureSymbol,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
  WHITE_BISHOP_SYMBOL,
  WHITE_KING_SYMBOL,
  WHITE_PAWN_SYMBOL,
  WHITE_QUEEN_SYMBOL,
  WHITE_ROOK_SYMBOL,
  EmptyString,
  EMPTY_STRING,
  Piece,
} from './constants';

import { IBoard, IRow } from '../features/board/interfaces';

const getPieceColor = (row: number): Color => (row < 2 ? WHITE : BLACK);

const getFirstRow = (row: number, col: number): Piece | null => {
  switch (col) {
    case 0:
    case 7:
      return {
        figure: ROOK,
        color: getPieceColor(row),
      };
    case 1:
    case 6:
      return {
        figure: KNIGHT,
        color: getPieceColor(row),
      };
    case 2:
    case 5:
      return {
        figure: BISHOP,
        color: getPieceColor(row),
      };
    case 3:
      return {
        figure: QUEEN,
        color: getPieceColor(row),
      };
    case 4:
      return {
        figure: KING,
        color: getPieceColor(row),
      };
    default:
      return null;
  }
};

const getPiece = (row: number, col: number): Piece | null => {
  switch (row) {
    case 0:
    case 7:
      return getFirstRow(row, col);
    case 1:
    case 6:
      return {
        figure: PAWN,
        color: getPieceColor(row),
      };
    default:
      return null;
  }
};

export const generateBoard = (): IBoard => {
  const result = {} as IBoard;

  let slotIsBlack = true;

  for (let ri = 0; ri < 8; ri++) {
    const row = {} as IRow;

    for (let ci = 0; ci < 8; ci++) {
      row[ci] = {
        piece: getPiece(ri, ci),
        color: slotIsBlack ? BLACK : WHITE,
        status: SLOT_STATUS_DEFAULT,
      };

      slotIsBlack = !slotIsBlack;
    }

    result[ri] = row;

    slotIsBlack = !slotIsBlack;
  }

  return result;
};

export const renderPiece = (piece: Piece): FigureSymbol | EmptyString => {
  const { figure, color } = piece;

  const isBlack = color === BLACK;

  switch (figure) {
    case PAWN:
      return isBlack ? BLACK_PAWN_SYMBOL : WHITE_PAWN_SYMBOL;
    case BISHOP:
      return isBlack ? BLACK_BISHOP_SYMBOL : WHITE_BISHOP_SYMBOL;
    case KNIGHT:
      return isBlack ? BLACK_KNIGHT_SYMBOL : WHITE_KING_SYMBOL;
    case ROOK:
      return isBlack ? BLACK_ROOK_SYMBOL : WHITE_ROOK_SYMBOL;
    case QUEEN:
      return isBlack ? BLACK_QUEEN_SYMBOL : WHITE_QUEEN_SYMBOL;
    case KING:
      return isBlack ? BLACK_KING_SYMBOL : WHITE_KING_SYMBOL;
    default:
      return EMPTY_STRING;
  }
};
