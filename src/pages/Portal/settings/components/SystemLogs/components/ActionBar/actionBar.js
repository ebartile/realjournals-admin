import React, { useCallback, useContext } from 'react';
import { StyledToolbar } from 'styles/toolbar.style';
import { route, useRequest } from 'services/Http';
import { Beenhere } from '@material-ui/icons';
import { notify } from 'utils/index';
import SearchTable from 'components/SearchTable';
import TableContext from 'contexts/TableContext';
import { LoadingButton } from '@material-ui/lab';

const ActionBar = () => {
  const { reload: reloadTable } = useContext(TableContext);
  const [request, loading] = useRequest();

  const markAllAsSeen = useCallback(() => {
    request
      .post(route('admin.system-logs.mark-all-as-seen'))
      .then(() => {
        notify.success('Operation was successful.');
        reloadTable();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data._error_message) {
          notify.error(error.response.data._error_message);
        }
      });
  }, [request, reloadTable]);

  return (
    <StyledToolbar>
      <SearchTable sx={{ mr: 2 }} placeholder="Search message..." field="message" />

      <LoadingButton variant="contained" startIcon={<Beenhere />} onClick={markAllAsSeen} loading={loading}>
        Mark As Seen
      </LoadingButton>
    </StyledToolbar>
  );
};

export default ActionBar;
