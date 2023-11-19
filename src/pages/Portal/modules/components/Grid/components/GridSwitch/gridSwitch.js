import React, { useCallback, useContext } from 'react';
import TableContext from 'contexts/TableContext';
import { route, useRequest } from 'services/Http';
import { notify } from 'utils/index';
import PopConfirm from 'components/PopConfirm';
import { IconButton } from '@material-ui/core';
import LoadingIcon from 'components/LoadingIcon';
import { DoNotDisturb } from '@material-ui/icons';
import { CheckCircle } from '@material-ui/icons';

const GridSwitch = ({ grid }) => {
  const { reload: reloadTable } = useContext(TableContext);
  const [request, loading] = useRequest();

  const enable = useCallback(() => {
    request
      .patch(route('admin.grid.enable', { grid: grid.id }))
      .then(() => {
        notify.success('Widget was enabled.');
        reloadTable();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data._error_message) {
          notify.error(error.response.data._error_message);
        }
      });
  }, [request, grid, reloadTable]);

  const disable = useCallback(() => {
    request
      .patch(route('admin.grid.disable', { grid: grid.id }))
      .then(() => {
        notify.success('Widget was disabled.');
        reloadTable();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data._error_message) {
          notify.error(error.response.data._error_message);
        }
      });
  }, [request, grid, reloadTable]);

  return grid.status ? (
    <PopConfirm component={IconButton} content="Disable this widget?" onClick={disable}>
      <LoadingIcon color="error" component={DoNotDisturb} loading={loading} />
    </PopConfirm>
  ) : (
    <PopConfirm component={IconButton} content="Enable this widget?" onClick={enable}>
      <LoadingIcon color="success" component={CheckCircle} loading={loading} />
    </PopConfirm>
  );
};

export default GridSwitch;
