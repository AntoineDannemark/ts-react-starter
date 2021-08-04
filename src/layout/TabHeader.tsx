import React from 'react';

import { useLocation, matchPath, withRouter } from 'react-router-dom';

import TabMenu from './TabMenu';
import PageTitle from './PageTitle';

import './TabHeader.scss';

const pageHasTabs = (title: string): boolean =>
  title === 'Contact' || title === 'Profile';

const getPageTitle = (pathname: string): string => {
  let title = 'Home';

  if (pathname.includes('contact')) {
    title = 'Contact';
  } else if (pathname.includes('profile')) {
    title = 'Profile';
  }

  return title;
};

const TabHeader: React.FC = () => {
  const { pathname } = useLocation();
  const title = getPageTitle(pathname);

  const matchTab = matchPath(pathname, {
    path: '/:page/:tab',
    exact: true,
    strict: false,
  });

  const matchPage = matchPath(pathname, {
    path: '/:page',
    exact: true,
    strict: false,
  });

  const params =
    (matchTab?.params as {
      page: string;
      tab: string;
    }) ||
    (matchPage?.params as {
      page: string;
    });

  return (
    <>
      <div className="page_title_container">
        <PageTitle title={params?.page} />
      </div>
      {pageHasTabs(title) ? (
        <div className="tab_menu_container">
          <TabMenu page={title} currentTab={params?.tab} />
        </div>
      ) : null}
    </>
  );
};

export default TabHeader;
