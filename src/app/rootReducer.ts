import { combineReducers } from '@reduxjs/toolkit';
import boardSlice from '../features/board/boardSlice';
import { BOARD_DOMAIN } from '../core/constants';

const rootReducer = combineReducers({ [BOARD_DOMAIN]: boardSlice });

export default rootReducer;
