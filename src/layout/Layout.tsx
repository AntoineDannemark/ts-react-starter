import React from 'react';

import MainMenu from './MainMenu';
import Page from './Page';

import './Layout.scss';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="main_container">
      <div className="menu_container">
        <MainMenu />
      </div>
      <div className="page_container">
        <Page>{children}</Page>
      </div>
    </div>
  );
};

export default Layout;
