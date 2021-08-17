import { Color, Piece, SlotStatus } from '../../core/constants';

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
