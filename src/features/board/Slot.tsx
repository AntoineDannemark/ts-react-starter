/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

import { useAppDispatch } from '../../app/hooks';

import {
  BLACK,
  SLOT_STATUS_DEFAULT,
  SLOT_STATUS_SELECTED,
} from '../../core/constants';
import { deselectSlot, selectSlot } from './boardSlice';
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
      {slot.piece && (
        <>
          <span>{slot.piece?.color}</span>
          <span>{slot.piece?.figure}</span>
          <span>{`${coords[0]} - ${coords[1]}`}</span>
        </>
      )}
    </div>
  );
};

export default Slot;
