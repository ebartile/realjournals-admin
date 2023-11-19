import React, { useMemo } from 'react';
import { Card, Stack } from '@material-ui/core';
import UserMenu from './components/UserMenu';
import ActionBar from './components/ActionBar';
import UserView from './components/UserView';
import AsyncTable from 'components/AsyncTable';
import { route } from 'services/Http';
import User from 'models/User';
import TrapScrollBox from 'components/TrapScrollBox';
import CurrencyCell from 'components/CurrencyCell';
import Label from 'components/Label';
import UserInfoTableCell from 'components/TableCells/UserInfoTableCell';
import DateTableCell from 'components/TableCells/DateTableCell';

const List = () => {
  const columns = useMemo(
    () => [
      {
        field: 'name',
        minWidth: 200,
        flex: 1,
        renderHeader: () => <span />,
        renderCell: ({ row: user }) => <UserInfoTableCell user={user} />
      },
      {
        field: 'is_active',
        headerName: 'Status',
        flex: 1,
        minWidth: 140,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row: data }) => {
          const user = User.use(data);

          return !user.isActive() ? (
            <Label variant="ghost" color="warning">
              Deactivated
            </Label>
          ) : (
            <Label variant="ghost" color="success">
              Active
            </Label>
          );
        }
      },
      {
        field: 'date_joined',
        headerName: 'Joined',
        flex: 1,
        minWidth: 150,
        renderCell: ({ value }) => <DateTableCell value={value} />
      },
      {
        field: 'currency_name',
        headerName: 'Currency',
        flex: 1,
        minWidth: 170,
        renderCell: ({ row }) => (
          <CurrencyCell currency={row.currency_name} country={row.country_name} balance={row.balance} />
        )
      },
      {
        field: 'action',
        minWidth: 100,
        flex: 0.5,
        renderHeader: () => <span />,
        align: 'right',
        headerAlign: 'right',
        renderCell: ({ row: user }) => {
          return (
            <Stack direction="row" spacing={1}>
              <UserMenu user={user} />
              <UserView user={user} />
            </Stack>
          );
        }
      }
    ],
    []
  );

  const url = route('admin.user.paginate');

  return (
    <Card>
      <TrapScrollBox>
        <AsyncTable columns={columns} components={{ Toolbar: ActionBar }} checkboxSelection url={url} />
      </TrapScrollBox>
    </Card>
  );
};

export default List;
