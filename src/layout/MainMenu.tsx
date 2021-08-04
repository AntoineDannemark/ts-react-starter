import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu: React.FC = () => {
  return (
    <>
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/contact">Contact</Link>
    </>
  );
};

export default MainMenu;
