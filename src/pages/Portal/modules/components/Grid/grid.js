import React, { useMemo } from 'react';
import { route } from 'services/Http';
import { Card, Chip, Stack } from '@material-ui/core';
import TrapScrollBox from 'components/TrapScrollBox';
import AsyncTable from 'components/AsyncTable';
import ActionBar from './components/ActionBar';
import Label from 'components/Label';
import GridSwitch from './components/GridSwitch';

const Grid = () => {
  const columns = useMemo(
    () => [
      {
        field: 'title',
        minWidth: 150,
        flex: 1,
        headerName: 'Widgets'
      },
      {
        field: 'page_title',
        minWidth: 150,
        flex: 0.5,
        headerName: 'Page',
        renderCell: ({ value }) => {
          return <Chip size="small" label={value} />;
        }
      },
      {
        field: 'status',
        minWidth: 100,
        flex: 0.5,
        headerName: 'Status',
        renderCell: ({ value: status }) => {
          return status ? (
            <Label variant="ghost" color="success">
              Enabled
            </Label>
          ) : (
            <Label variant="ghost" color="error">
              Disabled
            </Label>
          );
        }
      },
      {
        field: 'action',
        width: 150,
        renderHeader: () => <span />,
        align: 'right',
        renderCell: ({ row: grid }) => {
          return (
            <Stack direction="row" spacing={1}>
              <GridSwitch grid={grid} />
            </Stack>
          );
        }
      }
    ],
    []
  );

  const url = route('admin.grid.paginate');

  return (
    <Card>
      <TrapScrollBox>
        <AsyncTable columns={columns} components={{ Toolbar: ActionBar }} url={url} />
      </TrapScrollBox>
    </Card>
  );
};

export default Grid;
