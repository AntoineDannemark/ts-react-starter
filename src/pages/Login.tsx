import React from 'react';
import { Link } from 'react-router-dom';

import './Login.scss';

const Login: React.FC = () => {
  return (
    <div className="login_container">
      <h2>Login</h2>
      <Link to="/home">Go!</Link>
    </div>
  );
};

export default Login;
