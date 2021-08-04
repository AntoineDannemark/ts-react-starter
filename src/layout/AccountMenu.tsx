import React from 'react';

import { Link } from 'react-router-dom';

import './AccountMenu.scss';

const AccountMenu: React.FC = () => {
  return (
    <>
      <div className="name_container">Valérie</div>
      <div className="link_container">
        <Link to="/login">Logout</Link>
      </div>
    </>
  );
};

export default AccountMenu;
