import React, { useCallback, useEffect, useState } from 'react';
import { formatDollar } from 'utils/formatter';
import fundsIcon from '@iconify-icons/ri/funds-fill';
import { route, useRequest } from 'services/Http';
import SummaryItem from './SummaryItem';
import { notify } from 'utils/index';

const TotalEarnings = ({ className }) => {
  const [request, loading] = useRequest();
  const [total, setTotal] = useState(0);

  const fetchTotal = useCallback(() => {
    request
      .get(route('admin.statistics.total-earnings'))
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
      value={formatDollar(total)}
      loading={loading}
      title="Earnings"
      className={className}
      icon={fundsIcon}
    />
  );
};

export default TotalEarnings;
