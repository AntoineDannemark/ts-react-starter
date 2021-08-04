import React from 'react';

import Header from './Header';

import './Page.scss';

interface Props {
  children: React.ReactNode;
}

const Page: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="header_container">
        <Header />
      </div>
      <div className="content_container">{children}</div>
    </>
  );
};

export default Page;
