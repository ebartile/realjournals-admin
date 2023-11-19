import React, { useCallback, useContext } from 'react';
import { Beenhere } from '@material-ui/icons';
import { route, useRequest } from 'services/Http';
import { notify } from 'utils/index';
import { IconButton } from '@material-ui/core';
import TableContext from 'contexts/TableContext';
import LoadingIcon from 'components/LoadingIcon';

const LogMarkAsSeen = ({ log }) => {
  const { reload: reloadTable } = useContext(TableContext);
  const [request, loading] = useRequest();

  const markAsSeen = useCallback(() => {
    const url = route('admin.system-logs.mark-as-seen', { log: log.id });

    request
      .post(url)
      .then(() => {
        notify.success('Operation was successful.');
        reloadTable();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data._error_message) {
          notify.error(error.response.data._error_message);
        }
      });
  }, [request, log, reloadTable]);

  if (log.seen_at) {
    return null;
  }

  return (
    <IconButton onClick={markAsSeen}>
      <LoadingIcon component={Beenhere} loading={loading} />
    </IconButton>
  );
};

export default LogMarkAsSeen;
