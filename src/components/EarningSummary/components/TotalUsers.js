import React, { useCallback, useEffect, useState } from 'react';
import { formatNumber } from 'utils/formatter';
import userIcon from '@iconify/icons-eva/people-fill';
import { route, useRequest } from 'services/Http';
import SummaryItem from './SummaryItem';
import { notify } from 'utils/index';

const TotalUsers = ({ className }) => {
  const [request, loading] = useRequest();
  const [total, setTotal] = useState(0);

  const fetchTotal = useCallback(() => {
    request
      .get(route('admin.statistics.total-users'))
      .then((data) => setTotal(data.total))
      .catch((error) => {
        notify.error(error.response.data._error_message);
      });
  }, [request]);

  useEffect(() => {
    fetchTotal();
  }, [fetchTotal]);

  return (
    <SummaryItem
      color="primary"
      value={formatNumber(total)}
      loading={loading}
      title="Total Users"
      className={className}
      icon={userIcon}
    />
  );
};

export default TotalUsers;
