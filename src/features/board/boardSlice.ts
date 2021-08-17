/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { generateBoard } from '../../core/functions';

import {
  BOARD_DOMAIN,
  SLOT_STATUS_DEFAULT,
  SLOT_STATUS_SELECTED,
} from '../../core/constants';

import { BoardState } from './interfaces';

const board = generateBoard();

const initialState: BoardState = { board };

const boardSlice = createSlice({
  name: BOARD_DOMAIN,
  initialState,
  reducers: {
    select: (
      state,
      { payload: [rowIdx, colIdx] }: PayloadAction<[number, number]>
    ) => {
      state.board[rowIdx][colIdx].status = SLOT_STATUS_SELECTED;
    },
    deselect: (
      state,
      { payload: [rowIdx, colIdx] }: PayloadAction<[number, number]>
    ) => {
      state.board[rowIdx][colIdx].status = SLOT_STATUS_DEFAULT;
    },
  },
});

export const { select: selectSlot, deselect: deselectSlot } =
  boardSlice.actions;
export default boardSlice.reducer;
