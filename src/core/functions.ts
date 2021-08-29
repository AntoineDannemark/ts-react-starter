import { cloneDeep } from 'lodash-es';

import {
  BLACK,
  BISHOP,
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

import type { ISlot, IBoard, IRow } from '../features/board/interfaces';

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

const isOutOfBound = (index: number) => index < 0 || index > 7;

const isInboundTarget = (rowIdx: number, colIdx: number): boolean =>
  !isOutOfBound(rowIdx) && !isOutOfBound(colIdx);

const isNotEmpty = (rowIdx: number, colIdx: number, board: IBoard): boolean =>
  !!board[rowIdx][colIdx]?.piece?.figure;

const isEmpty = (rowIdx: number, colIdx: number, board: IBoard): boolean =>
  !isNotEmpty(rowIdx, colIdx, board);

const isOpponent = (
  rowIdx: number,
  colIdx: number,
  board: IBoard,
  color: Color
): boolean =>
  isNotEmpty(rowIdx, colIdx, board) &&
  board[rowIdx][colIdx].piece?.color !== color;

const isOpponentOrEmpty = (
  rowIx: number,
  colIdx: number,
  board: IBoard,
  color: Color
): boolean =>
  isOpponent(rowIx, colIdx, board, color) || isEmpty(rowIx, colIdx, board);

const isEmptyStraightOrOpponentDiagonal = (
  colIdx: number,
  targetRow: number,
  targetCol: number,
  board: IBoard,
  color: Color
): boolean =>
  (colIdx !== targetCol && isOpponent(targetRow, targetCol, board, color)) ||
  (colIdx === targetCol && isEmpty(targetRow, targetCol, board));

const isNotCurrentPosition = (rowAdd: number, colAdd: number): boolean =>
  !(rowAdd === 0 && colAdd === 0);

const isValidKnightMove = (rowAdd: number, colAdd: number): boolean =>
  (Math.abs(rowAdd) === 2 && Math.abs(colAdd) === 1) ||
  (Math.abs(rowAdd) === 1 && Math.abs(colAdd) === 2);

const isPawnFirstMove = (color: Color, rowIdx: number): boolean =>
  color === BLACK ? rowIdx === 6 : rowIdx === 1;

const getKingPosition = (board: IBoard, color: Color): string => {
  let result = '';

  Object.values(board).forEach(row =>
    Object.values(row).forEach(slot => {
      if (slot.piece?.figure === KING && slot.piece.color === color) {
        result = slot.coords;
      }
    })
  );

  return result;
};

const isNoLethalTarget = (
  slot: ISlot,
  board: IBoard,
  targetRow: number,
  targetCol: number
): boolean => {
  if (!slot.piece) throw new Error('Checking lethal target on empty slot');

  const [currentRowIdx, currentColIdx] = parseCoords(slot.coords);

  const { color } = slot.piece;

  const nextBoard = cloneDeep(board);

  nextBoard[targetRow][targetCol].piece = slot.piece;
  nextBoard[currentRowIdx][currentColIdx].piece = null;

  const kingsPosition = getKingPosition(nextBoard, color);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const opponentsTargets = getOpponentsTargets(nextBoard, color);

  const result = !opponentsTargets.includes(kingsPosition);

  return result;
};

const getPawnTargets = (
  slot: ISlot,
  board: IBoard,
  includeCheckComputation: boolean
): string[] => {
  const result: string[] = [];

  if (!slot.piece) return result;

  const [rowIdx, colIdx] = parseCoords(slot.coords);
  const { color } = slot.piece;

  const targetRow = color === BLACK ? rowIdx - 1 : rowIdx + 1;
  const secondTargetRow = color === BLACK ? rowIdx - 2 : rowIdx + 2;

  for (let i = -1; i < 2; i++) {
    const targetCol = colIdx + i;

    if (
      isInboundTarget(targetRow, targetCol) &&
      isEmptyStraightOrOpponentDiagonal(
        colIdx,
        targetRow,
        targetCol,
        board,
        color
      ) &&
      (!includeCheckComputation ||
        isNoLethalTarget(slot, board, targetRow, targetCol))
    ) {
      result.push(stringifyTarget(targetRow, targetCol));
    }
  }

  if (
    isPawnFirstMove(color, rowIdx) &&
    isEmpty(targetRow, colIdx, board) &&
    isEmpty(secondTargetRow, colIdx, board) &&
    (!includeCheckComputation ||
      isNoLethalTarget(slot, board, secondTargetRow, colIdx))
  ) {
    result.push(stringifyTarget(secondTargetRow, colIdx));
  }

  return result;
};

const getKnightTargets = (
  slot: ISlot,
  board: IBoard,
  includeCheckComputation: boolean
): string[] => {
  const result: string[] = [];

  if (!slot.piece) return result;

  const [rowIdx, colIdx] = parseCoords(slot.coords);
  const { color } = slot.piece;

  for (let rowAdd = -2; rowAdd < 3; rowAdd++) {
    for (let colAdd = -2; colAdd < 3; colAdd++) {
      const targetRow = rowIdx + rowAdd;
      const targetCol = colIdx + colAdd;

      if (
        isInboundTarget(targetRow, targetCol) &&
        isValidKnightMove(rowAdd, colAdd) &&
        isOpponentOrEmpty(targetRow, targetCol, board, color) &&
        (!includeCheckComputation ||
          isNoLethalTarget(slot, board, targetRow, targetCol))
      ) {
        result.push(`${targetRow},${targetCol}`);
      }
    }
  }

  return result;
};

const getBishopTargets = (
  slot: ISlot,
  board: IBoard,
  includeCheckComputation: boolean
): string[] => {
  const result: string[] = [];

  if (!slot.piece) return result;

  const [rowIdx, colIdx] = parseCoords(slot.coords);
  const { color } = slot.piece;

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

        if (isInboundTarget(targetRow, targetCol)) {
          if (!isEmpty(targetRow, targetCol, board)) {
            // eslint-disable-next-line no-param-reassign
            direction.stop = true;
          }

          if (
            isOpponentOrEmpty(targetRow, targetCol, board, color) &&
            (!includeCheckComputation ||
              isNoLethalTarget(slot, board, targetRow, targetCol))
          )
            result.push(stringifyTarget(targetRow, targetCol));
        }
      }
    });
  }

  return result;
};

const getRookTargets = (
  slot: ISlot,
  board: IBoard,
  includeCheckComputation: boolean
): string[] => {
  const result: string[] = [];

  if (!slot.piece) return result;

  const [rowIdx, colIdx] = parseCoords(slot.coords);
  const { color } = slot.piece;

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

        if (isInboundTarget(targetRow, targetCol)) {
          // eslint-disable-next-line no-param-reassign
          if (isNotEmpty(targetRow, targetCol, board)) direction.stop = true;

          if (
            isOpponentOrEmpty(targetRow, targetCol, board, color) &&
            (!includeCheckComputation ||
              isNoLethalTarget(slot, board, targetRow, targetCol))
          )
            result.push(stringifyTarget(targetRow, targetCol));
        }
      }
    });
  }

  return result;
};

const getKingTargets = (
  slot: ISlot,
  board: IBoard,
  includeCheckComputation: boolean,
  smallRoqueAllowed: boolean,
  greatRoqueAllowed: boolean
): string[] => {
  const result: string[] = [];

  if (!slot.piece) return result;

  const [rowIdx, colIdx] = parseCoords(slot.coords);
  const { color } = slot.piece;

  for (let rowAdd = -1; rowAdd < 2; rowAdd++) {
    for (let colAdd = -1; colAdd < 2; colAdd++) {
      const targetRow = rowIdx + rowAdd;
      const targetCol = colIdx + colAdd;

      if (
        isNotCurrentPosition(rowAdd, colAdd) &&
        isInboundTarget(targetRow, targetCol) &&
        isOpponentOrEmpty(targetRow, targetCol, board, color)
      ) {
        if (
          !includeCheckComputation ||
          isNoLethalTarget(slot, board, targetRow, targetCol)
        ) {
          result.push(stringifyTarget(targetRow, targetCol));
        }
      }
    }
  }

  if (smallRoqueAllowed) {
    result.push(slot.piece.color === BLACK ? '7,6' : '0,6');
  }

  if (greatRoqueAllowed) {
    result.push(slot.piece.color === BLACK ? '7,2' : '0,2');
  }

  return result;
};

export const getTargets = (
  slot: ISlot,
  board: IBoard,
  smallRoqueAllowed: boolean,
  greatRoqueAllowed: boolean,
  includeCheckComputation = true
): string[] => {
  switch (slot.piece?.figure) {
    case PAWN:
      return getPawnTargets(slot, board, includeCheckComputation);
    case BISHOP:
      return getBishopTargets(slot, board, includeCheckComputation);
    case KNIGHT:
      return getKnightTargets(slot, board, includeCheckComputation);
    case ROOK:
      return getRookTargets(slot, board, includeCheckComputation);
    case QUEEN:
      return [
        ...getBishopTargets(slot, board, includeCheckComputation),
        ...getRookTargets(slot, board, includeCheckComputation),
      ];
    case KING:
      return getKingTargets(
        slot,
        board,
        includeCheckComputation,
        smallRoqueAllowed,
        greatRoqueAllowed
      );
    default:
      return [];
  }
};

const getOpponentsTargets = (board: IBoard, color: Color): string[] => {
  const result: string[] = [];

  Object.values(board).forEach(row =>
    Object.values(row).forEach(slot => {
      const [rowIdx, colIdx] = parseCoords(slot.coords);

      if (slot.piece && isOpponent(rowIdx, colIdx, board, color)) {
        // TODO Check handling of roque in that case
        result.push(...getTargets(slot, board, false, false, false));
      }
    })
  );

  return result;
};
