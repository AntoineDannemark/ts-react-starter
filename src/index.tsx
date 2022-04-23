import React from 'react';
import { render } from 'react-dom';

import App from './app/App';

import './style.scss';

const renderApp = (): void => {
    render(<App />, document.getElementById('root'));
};

renderApp();
