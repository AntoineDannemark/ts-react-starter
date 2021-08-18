/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { useAppDispatch, useTypedSelector } from '../../app/hooks';
// import { deselectSlot, selectSlot } from './boardSlice';

import { compareCoords, renderPiece } from '../../core/functions';

import { BLACK } from '../../core/constants';

import { ISlot } from './interfaces';

import './Slot.scss';

interface SlotProps {
  slot: ISlot;
  coords: [number, number];
}

const Slot: React.FC<SlotProps> = ({ slot, coords }) => {
  const { selected } = useTypedSelector(state => state.board);

  const isSelected = selected && compareCoords(coords, selected);

  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    if (!slot.piece) return;

    // if (!isSelected) dispatch(selectSlot(coords));
    // else if (isSelected) dispatch(deselectSlot(coords));
  };

  return (
    <div
      className={'slot'
        .concat(slot.color === BLACK ? ' slot__black' : '')
        .concat(isSelected ? ' slot__selected' : '')}
      onClick={handleClick}>
      {slot.piece && renderPiece(slot.piece)}
    </div>
  );
};

export default Slot;
