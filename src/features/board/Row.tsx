import React from 'react';

import Slot from './Slot';

import { IRow } from './interfaces';

import './Row.scss';

interface RowProps {
  row: IRow;
  index: number;
}

const Row: React.FC<RowProps> = ({ row, index: rowIndex }) => {
  return (
    <div className="row__container">
      {Object.entries(row).map(([slotIndex, slot]) => (
        <Slot
          slot={slot}
          key={slotIndex}
          coords={[rowIndex, parseInt(slotIndex, 10)]}
        />
      ))}
    </div>
  );
};

export default Row;
