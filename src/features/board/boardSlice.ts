/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { generateBoard, getTargets, parseCoords } from '../../core/functions';

import { BLACK, BOARD_DOMAIN, KING, ROOK, WHITE } from '../../core/constants';

import type { BoardState, ISlot } from './interfaces';

const board = generateBoard();

const initialState: BoardState = {
    board,
    color: WHITE,
    selected: null,
    targets: [],
    lastPos: null,
    lastTarget: null,
    draggedOver: null,
    roqueAllowed: true,
};

const boardSlice = createSlice({
    name: BOARD_DOMAIN,
    initialState,
    reducers: {
        select: (state, { payload }: PayloadAction<ISlot>) => {
            if (state.selected?.coords === payload.coords) {
                state.selected = null;
                state.targets = [];
            } else {
                // TODO Change with multi user management
                const roqueRow = payload.piece?.color === WHITE ? 0 : 7;

                const smallRoqueAllowed =
                    state.roqueAllowed &&
                    !state.board[roqueRow][5].piece &&
                    !state.board[roqueRow][6].piece;
                const greatRoqueAllowed =
                    state.roqueAllowed &&
                    !state.board[roqueRow][1].piece &&
                    !state.board[roqueRow][2].piece &&
                    !state.board[roqueRow][3].piece;

                // eslint-disable-next-line no-console
                console.log({
                    roqueRow,
                    1: state.board[roqueRow][5].piece,
                    2: state.board[roqueRow][6].piece,
                    3: state.board[roqueRow][1].piece,
                    4: state.board[roqueRow][2].piece,
                    5: state.board[roqueRow][3].piece,
                });

                const targets = getTargets(
                    payload,
                    state.board,
                    smallRoqueAllowed,
                    greatRoqueAllowed
                );
                if (targets.length) {
                    state.targets = targets;
                    state.selected = payload;
                }
            }
            state.draggedOver = null;
        },
        deselect: state => {
            state.selected = null;
            state.targets = [];
        },
        move: (state, { payload }: PayloadAction<ISlot>) => {
            if (!state.selected?.piece) return;

            const [targetRowIdx, targetColIdx] = parseCoords(payload.coords);
            const [selectedRowIdx, selectedColIdx] = parseCoords(
                state.selected.coords
            );

            const target = state.board[targetRowIdx][targetColIdx];
            const selected = state.board[selectedRowIdx][selectedColIdx];

            if (state.selected.piece.figure === KING && state.roqueAllowed) {
                const roqueRow = state.selected.piece?.color === WHITE ? 0 : 7;
                // Check if is roque move
                if (targetColIdx === 6) {
                    state.board[roqueRow][5].piece = {
                        figure: ROOK,
                        color: state.selected.piece.color,
                    };
                    state.board[roqueRow][7].piece = null;
                }

                if (targetColIdx === 2) {
                    state.board[roqueRow][3].piece = {
                        figure: ROOK,
                        color: state.selected.piece.color,
                    };
                    state.board[roqueRow][0].piece = null;
                }

                // Discard all roques
                state.roqueAllowed = false;
            }

            if (state.selected.piece.figure === ROOK) {
                // Discard appropriate roque
            }

            target.piece = state.selected.piece;
            selected.piece = null;

            state.lastPos = state.selected;
            state.lastTarget = target;
            state.selected = null;
            state.targets = [];

            // TODO Update later using currentPlayingColor
            state.color = target.piece.color === BLACK ? WHITE : BLACK;
            state.draggedOver = null;
        },
        setDraggedOver: (state, { payload }: PayloadAction<ISlot>) => {
            state.draggedOver = payload;
        },
        clearDraggedOver: state => {
            state.draggedOver = null;
        },
    },
});

export const {
    select: selectSlot,
    deselect: deselectSlot,
    move: moveSlot,
    setDraggedOver: setDraggedOverSlot,
    clearDraggedOver: clearDraggedOverSlot,
} = boardSlice.actions;

export default boardSlice.reducer;
