/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { BaseSyntheticEvent } from 'react';

import { debounce } from 'lodash-es';

import { useAppDispatch, useTypedSelector } from '../../app/hooks';

import { renderPiece } from '../../core/functions';

import { BLACK, EMPTY_TARGET_SYMBOL } from '../../core/constants';

import { ISlot } from './interfaces';

import './Slot.scss';
import {
    selectSlot,
    deselectSlot,
    moveSlot,
    setDraggedOverSlot,
    clearDraggedOverSlot,
} from './boardSlice';

interface SlotProps {
    slot: ISlot;
}

// const getClassName = (
//   isBlack: boolean,
//   isSelected: boolean,
//   isTarget: boolean,
//   noneSelected: boolean,
//   isLastPos: boolean,
//   isLastTarget: boolean
// ): string => {
//   const result = 'slot ';

//   if (isSelected) {
//     result.concat(isBlack ? 'slot__blackSelected ' : 'slot__whiteSelected ');
//   } else if (isTarget) {
//     result.concat(isBlack ? 'slot__blackTarget ' : 'slot__whiteTargets ');
//   } else if (noneSelected) {
//     result.concat(
//       isBlack ? 'slot__blackNoSelected ' : 'slot__whiteNoSelected '
//     );
//   }

//   return result;
// };

const Slot: React.FC<SlotProps> = ({ slot }) => {
    const { selected, color, targets, draggedOver, lastPos, lastTarget } =
        useTypedSelector(state => state.board);

    const dispatch = useAppDispatch();

    const isSelected = selected?.coords === slot.coords;
    const isTarget = targets.includes(slot.coords);
    const isBlack = slot.color === BLACK;
    const isLastPos = lastPos?.coords === slot.coords;
    const isLastTarget = lastTarget?.coords === slot.coords;

    const handleClick = (): void => {
        if (isTarget) {
            dispatch(moveSlot(slot));
        } else if (slot.piece?.color === color) {
            dispatch(selectSlot(slot));
        }
    };

    const handleDragStart = (e: BaseSyntheticEvent) => {
        if (slot.piece?.color === color) dispatch(selectSlot(slot));
        setTimeout(() => {
            e.target.style.visibility = 'hidden';
        }, 1);
    };

    const handleDragEnd = (e: BaseSyntheticEvent) => {
        if (draggedOver && targets.includes(draggedOver?.coords)) {
            dispatch(moveSlot(draggedOver));
        } else {
            dispatch(deselectSlot());
        }
        setTimeout(() => {
            e.target.style.visibility = '';
            document.body.style.cursor = '';
        }, 1);
    };

    const handleDragOver = debounce(() => {
        if (
            (!draggedOver || draggedOver.coords !== slot.coords) &&
            targets.includes(slot.coords)
        ) {
            dispatch(setDraggedOverSlot(slot));
        } else if (draggedOver && draggedOver.coords !== slot.coords) {
            dispatch(clearDraggedOverSlot());
        }
    }, 10);

    return (
        <div
            onDragOver={handleDragOver}
            className={'slot '
                .concat(isBlack ? ' slot__black ' : '')
                .concat(isSelected ? ' slot__selected ' : '')
                .concat(
                    (isLastTarget || isLastPos) && isBlack
                        ? 'slot__target__black '
                        : isLastTarget || isLastPos
                        ? 'slot__target__white '
                        : ''
                )}
            onClick={handleClick}>
            <div
                draggable={slot.piece?.color === color}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}>
                {/* {slot.piece && renderPiece(slot.piece)} */}
                {slot.piece && renderPiece(slot.piece)}
                {!slot.piece && isTarget && EMPTY_TARGET_SYMBOL}
            </div>
        </div>
    );
};

export default Slot;
