import type {
  ISlot,
  IBoard,
  IRow,
  BoardState,
} from '../features/board/interfaces';

import {
  BISHOP,
  BLACK,
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
  WHITE_KNIGHT_SYMBOL,
} from './constants';

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
        coords: `${ri},${ci}`,
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
      return isBlack ? BLACK_KNIGHT_SYMBOL : WHITE_KNIGHT_SYMBOL;
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

export const parseCoords = (coords: string): [number, number] => [
  parseInt(coords.split(',')[0], 10),
  parseInt(coords.split(',')[1], 10),
];

const stringifyTarget = (rowIdx: number, colIdx: number): string =>
  `${rowIdx},${colIdx}`;

const outOfBound = (index: number) => index < 0 || index > 7;

const isNotEmpty = (rowIdx: number, colIdx: number, board: IBoard): boolean =>
  !!board[rowIdx][colIdx].piece;

const isEmpty = (rowIdx: number, colIdx: number, board: IBoard): boolean =>
  !isNotEmpty(rowIdx, colIdx, board);

const isTeamMate = (
  rowIdx: number,
  colIdx: number,
  board: IBoard,
  color: Color
): boolean =>
  isNotEmpty(rowIdx, colIdx, board) &&
  board[rowIdx][colIdx].piece?.color === color;

const isOpponent = (
  rowIdx: number,
  colIdx: number,
  board: IBoard,
  color: Color
): boolean =>
  isNotEmpty(rowIdx, colIdx, board) &&
  board[rowIdx][colIdx].piece?.color !== color;

const isPawnFirstMove = (color: Color, rowIdx: number): boolean =>
  color === BLACK ? rowIdx === 6 : rowIdx === 1;

const isEmptyStraightOrOpponentDiagonal = (
  colIdx: number,
  targetRow: number,
  targetCol: number,
  board: IBoard,
  color: Color
): boolean =>
  (colIdx !== targetCol && isOpponent(targetRow, targetCol, board, color)) ||
  (isEmpty(targetRow, targetCol, board) && colIdx === targetCol);

const getPawnTargets = (slot: ISlot, state: BoardState): string[] => {
  const result: string[] = [];

  const { color, board } = state;

  const [rowIdx, colIdx] = parseCoords(slot.coords);

  const targetRow = color === BLACK ? rowIdx - 1 : rowIdx + 1;

  if (outOfBound(targetRow)) return result;

  for (let i = -1; i < 2; i++) {
    const targetCol = colIdx + i;

    if (
      !outOfBound(targetCol) &&
      isEmptyStraightOrOpponentDiagonal(
        colIdx,
        targetRow,
        targetCol,
        board,
        color
      )
    ) {
      result.push(stringifyTarget(targetRow, targetCol));
    }
  }

  if (
    isPawnFirstMove(color, rowIdx) &&
    isEmpty(targetRow, colIdx, board) &&
    isEmpty(targetRow + 1, colIdx, board)
  ) {
    result.push(stringifyTarget(targetRow + 1, colIdx));
  }

  return result;
};

const getKnightTargets = (slot: ISlot, state: BoardState): string[] => {
  const { board, color } = state;

  const result: string[] = [];

  const [rowIdx, colIdx] = parseCoords(slot.coords);

  for (let rowAdd = -2; rowAdd < 3; rowAdd++) {
    for (let colAdd = -2; colAdd < 3; colAdd++) {
      const targetRow = rowIdx + rowAdd;
      const targetCol = colIdx + colAdd;

      if (
        !outOfBound(targetRow) &&
        !outOfBound(targetCol) &&
        colAdd !== 0 &&
        rowAdd !== 0 &&
        Math.abs(rowAdd) !== Math.abs(colAdd) &&
        !isTeamMate(targetRow, targetCol, board, color)
      ) {
        result.push(`${targetRow},${targetCol}`);
      }
    }
  }

  return result;
};

const getBishopTargets = (slot: ISlot, state: BoardState): string[] => {
  const { board, color } = state;

  const result: string[] = [];

  const [rowIdx, colIdx] = parseCoords(slot.coords);

  const directions = [
    // Upper Right
    {
      stop: false,
      getTargetRow: (distance: number) => rowIdx + distance,
      getTargetCol: (distance: number) => colIdx + distance,
    },
    // Upper Left
    {
      stop: false,
      getTargetRow: (distance: number) => rowIdx + distance,
      getTargetCol: (distance: number) => colIdx - distance,
    },
    // Lower Right
    {
      stop: false,
      getTargetRow: (distance: number) => rowIdx - distance,
      getTargetCol: (distance: number) => colIdx + distance,
    },
    // Lower Left
    {
      stop: false,
      getTargetRow: (distance: number) => rowIdx - distance,
      getTargetCol: (distance: number) => colIdx - distance,
    },
  ];

  for (let i = 1; i < 8; i++) {
    directions.forEach(direction => {
      if (!direction.stop) {
        const targetRow = direction.getTargetRow(i);
        const targetCol = direction.getTargetCol(i);

        if (!outOfBound(targetRow) && !outOfBound(targetCol)) {
          // eslint-disable-next-line no-param-reassign
          if (isNotEmpty(targetRow, targetCol, board)) direction.stop = true;
          if (!isTeamMate(targetRow, targetCol, board, color))
            result.push(stringifyTarget(targetRow, targetCol));
        }
      }
    });
  }

  return result;
};

const getRookTargets = (slot: ISlot, state: BoardState): string[] => {
  const { board, color } = state;

  const result: string[] = [];

  const [rowIdx, colIdx] = parseCoords(slot.coords);

  const directions = [
    // Up
    {
      stop: false,
      getTargetRow: (distance: number) => rowIdx + distance,
      getTargetCol: () => colIdx,
    },
    // Down
    {
      stop: false,
      getTargetRow: (distance: number) => rowIdx - distance,
      getTargetCol: () => colIdx,
    },
    // Right
    {
      stop: false,
      getTargetRow: () => rowIdx,
      getTargetCol: (distance: number) => colIdx + distance,
    },
    // Left
    {
      stop: false,
      getTargetRow: () => rowIdx,
      getTargetCol: (distance: number) => colIdx - distance,
    },
  ];

  for (let i = 1; i < 8; i++) {
    directions.forEach(direction => {
      if (!direction.stop) {
        const targetRow = direction.getTargetRow(i);
        const targetCol = direction.getTargetCol(i);

        if (!outOfBound(targetRow) && !outOfBound(targetCol)) {
          // eslint-disable-next-line no-param-reassign
          if (isNotEmpty(targetRow, targetCol, board)) direction.stop = true;
          if (!isTeamMate(targetRow, targetCol, board, color))
            result.push(stringifyTarget(targetRow, targetCol));
        }
      }
    });
  }

  return result;
};

const getKingTargets = (slot: ISlot, state: BoardState): string[] => {
  const { board, color } = state;

  const result: string[] = [];

  const [rowIdx, colIdx] = parseCoords(slot.coords);

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const targetRow = rowIdx + i;
      const targetCol = colIdx + j;

      if (
        !(i === 0 && j === 0) &&
        !outOfBound(targetRow) &&
        !outOfBound(targetCol) &&
        !isTeamMate(targetRow, targetCol, board, color)
      )
        result.push(stringifyTarget(targetRow, targetCol));
    }
  }

  return result;
};

export const getTargets = (slot: ISlot, state: BoardState): string[] => {
  switch (slot.piece?.figure) {
    case PAWN:
      return getPawnTargets(slot, state);
    case BISHOP:
      return getBishopTargets(slot, state);
    case KNIGHT:
      return getKnightTargets(slot, state);
    case ROOK:
      return getRookTargets(slot, state);
    case QUEEN:
      return [...getBishopTargets(slot, state), ...getRookTargets(slot, state)];
    case KING:
      return getKingTargets(slot, state);
    default:
      return [];
  }
};
