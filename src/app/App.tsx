import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

import Board from '../features/board/Board';

const App: React.FC = () => {
    useEffect(() => {
        const socket = io('http://127.0.0.1:5000');

        // eslint-disable-next-line no-console
        console.log(socket);
    }, []);

    return (
        <>
            <Board />
        </>
    );
};

export default App;
