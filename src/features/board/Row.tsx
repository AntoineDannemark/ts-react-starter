import React from 'react';

import Slot from './Slot';

import { IRow } from './interfaces';

import './Row.scss';

interface RowProps {
    row: IRow;
}

const Row: React.FC<RowProps> = ({ row }) => {
    return (
        <div className="row__container">
            {Object.values(row).map(slot => (
                <Slot slot={slot} key={slot.coords} />
            ))}
        </div>
    );
};

export default Row;
