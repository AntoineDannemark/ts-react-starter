import React from 'react';

import { useParams } from 'react-router-dom';

interface Params {
  tab: string;
}

const Profile: React.FC = () => {
  const { tab } = useParams<Params>();

  return <h2>{`my ${tab}`}</h2>;
};

export default Profile;
