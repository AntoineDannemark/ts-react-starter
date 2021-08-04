import React from 'react';

import TabLink from './TabLink';

import './TabMenu.scss';

const tabs = {
  Profile: [
    {
      name: 'bio',
      to: '/profile/bio',
    },
    {
      name: 'jobs',
      to: '/profile/jobs',
    },
    {
      name: 'others',
      to: '/profile/others',
    },
  ],
  Contact: [
    {
      name: 'tel',
      to: '/contact/tel',
    },
    {
      name: 'mail',
      to: '/contact/mail',
    },
    {
      name: 'fax',
      to: '/contact/fax',
    },
  ],
};

interface Props {
  page: string;
  currentTab: string;
}

const TabMenu: React.FC<Props> = ({ page, currentTab }) => {
  return (
    <>
      {tabs[page as keyof typeof tabs].map(tab => {
        // console.log({
        //   currentTab,
        //   tn: tab.name,
        // });
        return (
          <div
            className={currentTab === tab.name ? 'tablink_active' : 'tablink'}
            key={tab.name}>
            <TabLink name={tab.name} to={tab.to} />
          </div>
        );
      })}
    </>
  );
};

export default TabMenu;
