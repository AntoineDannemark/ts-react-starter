import { Color, Figure, SlotStatus } from '../../core/constants';

export interface Piece {
  figure: Figure;
  color: Color;
}

export interface ISlot {
  piece: Piece | null;
  color: Color;
  status: SlotStatus;
}

export type IRow = {
  [key: number]: ISlot;
};

export type IBoard = {
  [key: number]: IRow;
};

export interface BoardState {
  board: IBoard;
}
