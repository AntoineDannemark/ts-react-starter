import { Color, Piece } from '../../core/constants';

export interface ISlot {
    piece: Piece | null;
    color: Color;
    coords: string;
}

export type IRow = {
    [key: number]: ISlot;
};

export type IBoard = {
    [key: number]: IRow;
};

export interface BoardState {
    board: IBoard;
    color: Color;
    selected: ISlot | null;
    targets: string[];
    lastPos: ISlot | null;
    lastTarget: ISlot | null;
    draggedOver: ISlot | null;
    roqueAllowed: boolean;
}
