/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { useAppDispatch, useTypedSelector } from '../../app/hooks';

import { renderPiece } from '../../core/functions';

import { BLACK } from '../../core/constants';

import { ISlot } from './interfaces';

import './Slot.scss';
import { selectSlot, moveSlot } from './boardSlice';

interface SlotProps {
  slot: ISlot;
}

const Slot: React.FC<SlotProps> = ({ slot }) => {
  const { selected, color, targets } = useTypedSelector(state => state.board);

  const isSelected = selected?.coords === slot.coords;
  const isTarget = targets.includes(slot.coords);

  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    if (isTarget) {
      dispatch(moveSlot(slot));
    } else if (slot.piece?.color === color) {
      dispatch(selectSlot(slot));
    }
  };

  return (
    <div
      className={'slot'
        .concat(slot.color === BLACK ? ' slot__black' : '')
        .concat(isSelected ? ' slot__selected' : '')
        .concat(isTarget ? ' slot__target' : '')}
      onClick={handleClick}>
      {slot.piece && renderPiece(slot.piece)}
    </div>
  );
};

export default Slot;
