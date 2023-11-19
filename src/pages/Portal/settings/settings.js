import React, { useMemo } from 'react';
import PageTabs from 'components/PageTabs';
import settings from '@iconify-icons/ri/settings-3-fill';
import bug from '@iconify-icons/ri/bug-fill';
import SystemLogs from './components/SystemLogs';

const Settings = () => {
  const tabs = useMemo(() => {
    return [
      {
        value: 'system-logs',
        label: 'System Logs',
        icon: bug,
        component: <SystemLogs />
      }
    ];
  }, []);

  return <PageTabs initial="system-logs" title="Settings" tabs={tabs} />;
};

export default Settings;
