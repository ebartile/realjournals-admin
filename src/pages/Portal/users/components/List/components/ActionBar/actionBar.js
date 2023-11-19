import React, { useCallback, useContext } from 'react';
import { Box, Grid, IconButton, Stack, Tooltip, Typography } from '@material-ui/core';
import { Add, Gavel, Refresh } from '@material-ui/icons';
import { route, useFormRequest, useRequest } from 'services/Http';
import { styled } from '@material-ui/core/styles';
import { notify } from 'utils/index';
import Form, { DateTimePicker, TextField } from 'components/Form';
import { normalizeDate } from 'utils/form';
import { useModal } from 'utils/modal';
import { SettingsBackupRestore } from '@material-ui/icons';
import { StyledToolbar } from 'styles/toolbar.style';
import SearchTable from 'components/SearchTable';
import TableContext from 'contexts/TableContext';
import ModalActions from 'components/ModalActions';
import { LoadingButton } from '@material-ui/lab';
import { useDispatch } from 'react-redux';

const ActionBar = () => {
  const [modal, modalElements] = useModal();
  const { reload: reloadTable, selection } = useContext(TableContext);
  const [request] = useRequest();

  const createUser = useCallback(() => {
    modal.confirm({
      title: 'Create User',
      content: <CreateUser />,
      rootProps: { fullWidth: true }
    });
  }, [modal]);

  const batchActivate = useCallback(() => {
    request
      .post(route('admin.user.batch-activate'), { users: selection })
      .then(() => {
        notify.success('Users were activated.');
        reloadTable();
      })
      .catch((error) => {
        notify.error(error.response.data._error_message);
      });
  }, [request, selection, reloadTable]);

  const batchDeactivate = useCallback(() => {
    request
      .post(route('admin.user.batch-deactivate'), { users: selection })
      .then(() => {
        notify.success('Users were deactivated.');
        reloadTable();
      })
      .catch((error) => {
        notify.error(error.response.data._error_message);
      });
  }, [request, selection, reloadTable]);

  return (
    <StyledToolbar>
      {selection.length > 0 ? (
        <Typography variant="subtitle1">{selection.length} selected</Typography>
      ) : (
        <SearchTable sx={{ mr: 2 }} placeholder="Search name..." field="name" />
      )}

      {modalElements}

      <Stack direction="row" spacing={1}>
        <Tooltip title="Reload Table">
          <IconButton onClick={reloadTable}>
            <Refresh />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add User">
          <IconButton onClick={createUser}>
            <Add />
          </IconButton>
        </Tooltip>
        {selection.length > 0 && (
          <>
            <Tooltip title="Deactivate">
              <IconButton onClick={batchDeactivate}>
                <Gavel />
              </IconButton>
            </Tooltip>

            <Tooltip title="Activate">
              <IconButton onClick={batchActivate}>
                <SettingsBackupRestore />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>
    </StyledToolbar>
  );
};

const CreateUser = ({ closeModal }) => {
  const [form] = Form.useForm();
  const [request, loading] = useFormRequest(form);
  const dispatch = useDispatch();
  const { reload: reloadTable, selection } = useContext(TableContext);

  const submitForm = useCallback(
    (values) => {
      request
        .post(route('auth.invite'), values)
        .then((data) => {
          notify.success('User was successfully created.');
          closeModal();
          reloadTable();
        })
        .catch((error) => {
          if (error.response && error.response.data && !error.response.data._error_message) {
            const { data } = error.response;

            // Iterate over the fields in the error response
            Object.keys(data).forEach((fieldName) => {
              // Update the form with the field error
              form.setFields([
                {
                  name: fieldName,
                  errors: [data[fieldName][0]]
                }
              ]);
            });
          } else {
            notify.error(error.response.data._error_message);
          }
        });
    },
    [request, closeModal, reloadTable, dispatch, form]
  );

  return (
    <ContainerBox>
      <Box sx={{ mb: 5, px: 3 }}>
        <Grid container spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={12} md={12}>
            <Form form={form} onFinish={submitForm}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
                    <TextField fullWidth />
                  </Form.Item>

                  <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
                    <TextField fullWidth />
                  </Form.Item>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 12, sm: 12 }}>
                  <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                    <TextField fullWidth />
                  </Form.Item>
                </Stack>

                <LoadingButton variant="contained" type="submit" loading={loading}>
                  Create User
                </LoadingButton>
              </Stack>
            </Form>
          </Grid>
        </Grid>
      </Box>
    </ContainerBox>
  );
};

const ContainerBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0, -3),
  position: 'relative'
}));

export default ActionBar;
