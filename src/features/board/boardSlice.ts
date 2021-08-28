/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { generateBoard, getTargets, parseCoords } from '../../core/functions';

import { BLACK, BOARD_DOMAIN, WHITE } from '../../core/constants';

import type { BoardState, ISlot } from './interfaces';

const board = generateBoard();

const initialState: BoardState = {
  board,
  color: WHITE,
  selected: null,
  targets: [],
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
        state.selected = payload;
        state.targets = getTargets(payload, state.board);
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
      state.targets = [];

      // TODO Update later using currentPlayingColor
      state.color = target.piece!.color === BLACK ? WHITE : BLACK;
    },
  },
});

export const { select: selectSlot, move: moveSlot } = boardSlice.actions;

export default boardSlice.reducer;
