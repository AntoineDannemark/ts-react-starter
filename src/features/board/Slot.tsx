/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { useAppDispatch } from '../../app/hooks';
import { deselectSlot, selectSlot } from './boardSlice';

import { renderPiece } from '../../core/functions';

import {
  BLACK,
  SLOT_STATUS_DEFAULT,
  SLOT_STATUS_SELECTED,
} from '../../core/constants';

import { ISlot } from './interfaces';

import './Slot.scss';

interface SlotProps {
  slot: ISlot;
  coords: [number, number];
}

const Slot: React.FC<SlotProps> = ({ slot, coords }) => {
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    if (!slot.piece) return;

    if (slot.status === SLOT_STATUS_DEFAULT) dispatch(selectSlot(coords));
    else if (slot.status === SLOT_STATUS_SELECTED)
      dispatch(deselectSlot(coords));
  };

  return (
    <div
      className={'slot'
        .concat(slot.color === BLACK ? ' slot__black' : '')
        .concat(slot.status === SLOT_STATUS_SELECTED ? ' slot__selected' : '')}
      onClick={handleClick}>
      {slot.piece && renderPiece(slot.piece)}
    </div>
  );
};

export default Slot;
