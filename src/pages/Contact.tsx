import React from 'react';

import { useParams } from 'react-router-dom';

interface Params {
  tab: string;
}

const Contact: React.FC = () => {
  const { tab: contact } = useParams<Params>();

  return <h2>{`Contact us per ${contact}`}</h2>;
};

export default Contact;
