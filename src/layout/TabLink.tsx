import React from 'react';

import { Link } from 'react-router-dom';

interface Props {
  name: string;
  to: string;
}

const TabLink: React.FC<Props> = ({ name, to }) => {
  return <Link to={to}>{name}</Link>;
};

export default TabLink;
