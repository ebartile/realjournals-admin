import React, { useMemo } from 'react';
import stack from '@iconify-icons/ri/stack-fill.js';
import layoutGrid from '@iconify-icons/ri/layout-grid-fill.js';
import PageTabs from 'components/PageTabs';
import Grid from './components/Grid';

const Modules = () => {
  const tabs = useMemo(
    () => [
      {
        value: 'grid',
        label: 'Grid',
        icon: layoutGrid,
        component: <Grid />
      }
    ],
    []
  );

  return <PageTabs initial="grid" title="Modules" tabs={tabs} />;
};

export default Modules;
