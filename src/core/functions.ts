import {
  BISHOP,
  BLACK,
  Color,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
  SLOT_STATUS_DEFAULT,
  WHITE,
} from './constants';

import { IBoard, Piece, IRow } from '../features/board/interfaces';

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
