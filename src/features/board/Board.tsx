import React from 'react';

import { useTypedSelector } from '../../app/hooks';

import Row from './Row';

import { BOARD_DOMAIN } from '../../core/constants';

import './Board.scss';

interface Props {}

const Board: React.FC<Props> = () => {
  const { board } = useTypedSelector(state => state[BOARD_DOMAIN]);

  return (
    <div className="board__container">
      {Object.entries(board).map(([rowIndex, row]) => (
        <Row row={row} key={rowIndex} />
      ))}
    </div>
  );
};

export default Board;
