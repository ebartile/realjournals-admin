import React, { useMemo } from 'react';
import fileList from '@iconify-icons/ri/file-list-2-fill';
import shieldStar from '@iconify-icons/ri/shield-star-fill';
import award from '@iconify-icons/ri/award-fill';
import List from './components/List';
import PageTabs from 'components/PageTabs';
import { useAuth } from 'models/Auth';

const Users = () => {
  const auth = useAuth();

  const tabs = useMemo(() => {
    const stack = [
      {
        value: 'list',
        label: 'List',
        icon: fileList,
        component: <List />
      }
    ];

    return stack;
  }, [auth]);

  return <PageTabs initial="list" title="Users" tabs={tabs} />;
};

export default Users;
