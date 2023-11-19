import React, { Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MoreVert } from '@material-ui/icons';
import { IconButton, MenuItem } from '@material-ui/core';
import Dropdown from 'components/Dropdown';
import { intersection, isEmpty, map } from 'lodash';
import { useAuth } from 'models/Auth';
import User from 'models/User';
import { useModal } from 'utils/modal';
import Form, { AutoComplete, DateTimePicker } from 'components/Form';
import { route, useFormRequest, useRequest } from 'services/Http';
import Spin from 'components/Spin';
import { LoadingButton } from '@material-ui/lab';
import { notify } from 'utils/index';
import { normalizeDate } from 'utils/form';
import { Gavel } from '@material-ui/icons';
import { SettingsBackupRestore } from '@material-ui/icons';
import { AdminPanelSettings } from '@material-ui/icons';
import LoadingIcon from 'components/LoadingIcon';
import TableContext from 'contexts/TableContext';
import ModalActions from 'components/ModalActions';
import ModalContent from 'components/ModalContent';

const UserMenu = ({ user }) => {
  const auth = useAuth();
  const [modal, modalElements] = useModal();
  const [request, loading] = useRequest();
  const { reload: reloadTable } = useContext(TableContext);

  const activateUser = useCallback(() => {
    request
      .get(route('admin.user.activate', { id: user.id }))
      .then((response) => {
        notify.success(`User was ${response.is_active ? 'activated' : 'deactivated'}`);
        reloadTable();
      })
      .catch((error) => {
        notify.error(error.response.data._error_message);
      });
  }, [request, user, reloadTable]);

  const menuItems = useMemo(() => {
    const items = [];

    const data = User.use(user);

    if (data.isActive()) {
      items.push(
        <MenuItem key={1} onClick={activateUser}>
          <Gavel sx={{ mr: 2 }} />
          Deactivate
        </MenuItem>
      );
    } else {
      items.push(
        <MenuItem key={1} onClick={activateUser}>
          <SettingsBackupRestore sx={{ mr: 2 }} />
          Activate
        </MenuItem>
      );
    }

    return items;
  }, [user, auth, activateUser]);

  if (isEmpty(menuItems)) {
    return null;
  }

  return (
    <Fragment>
      <Dropdown menuItems={menuItems} component={IconButton}>
        <LoadingIcon component={MoreVert} loading={loading} />
      </Dropdown>

      {modalElements}
    </Fragment>
  );
};

export default UserMenu;
