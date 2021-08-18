/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { generateBoard, parseCoords } from '../../core/functions';

import { BOARD_DOMAIN, WHITE } from '../../core/constants';

import { BoardState, ISlot } from './interfaces';

const board = generateBoard();

const initialState: BoardState = {
  board,
  color: WHITE,
  selected: null,
  targets: ['2,1', '2,2'],
};

const boardSlice = createSlice({
  name: BOARD_DOMAIN,
  initialState,
  reducers: {
    select: (state, { payload }: PayloadAction<ISlot>) => {
      if (state.selected?.coords === payload.coords) {
        state.selected = null;
      } else {
        state.selected = payload;
      }
    },
    move: (state, { payload }: PayloadAction<ISlot>) => {
      if (!state.selected) return;

      const [targetRowIdx, targetColIdx] = parseCoords(payload.coords);
      const [selectedRowIdx, selectedColIdx] = parseCoords(
        state.selected.coords
      );

      const target = state.board[targetRowIdx][targetColIdx];
      const selected = state.board[selectedRowIdx][selectedColIdx];

      target.piece = state.selected.piece;
      selected.piece = null;

      state.selected = null;
    },
  },
});

export const { select: selectSlot, move: moveSlot } = boardSlice.actions;

export default boardSlice.reducer;
