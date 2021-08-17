import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import store from './app/store';

import App from './app/App';

import './style.scss';

const renderApp = (): void => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};

renderApp();
