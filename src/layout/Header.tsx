import React from 'react';

import TabHeader from './TabHeader';
import AccountMenu from './AccountMenu';

import './Header.scss';

const Header: React.FC = () => {
  return (
    <>
      <div className="tab_header_container">
        <TabHeader />
      </div>
      <div className="account_menu_container">
        <AccountMenu />
      </div>
    </>
  );
};

export default Header;
