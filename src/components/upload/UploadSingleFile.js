import { isString } from 'lodash';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Paper, Box, Typography, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
// utils
import { fData } from 'utils/formatNumber';
import UploadIllustration from 'assets/illustration_upload';
import { getFileThumb } from 'utils/getFileFormat';
//
import { varFadeInRight } from '../animate';
import { motion } from 'framer-motion';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' }
}));

// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sx: PropTypes.object
};

export default function UploadSingleFile({ error, file, sx, ...other }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: '100%', ...sx }}>
      {file && (
        <ListItem
          component={motion.div}
          {...varFadeInRight}
          sx={{
            my: 1,
            py: 0.75,
            px: 2,
            borderRadius: 1,
            border: (theme) => `solid 1px ${theme.palette.divider}`,
            bgcolor: 'background.paper'
          }}
        >
          <ListItemIcon>{getFileThumb(file.preview)}</ListItemIcon>
          <ListItemText
            primary={isString(file) ? file : file.path}
            secondary={isString(file) ? '' : fData(file.size)}
            primaryTypographyProps={{ variant: 'subtitle2' }}
            secondaryTypographyProps={{ variant: 'caption' }}
          />
        </ListItem>
      )}

      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
          ...(file && { padding: '12% 0' })
        }}
      >
        <input {...getInputProps()} />

        <UploadIllustration sx={{ width: 220 }} />

        <Box sx={{ p: 3, ml: { md: 2 } }}>
          <Typography gutterBottom variant="h5">
            Drop or Select file
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Drop files here or click&nbsp;
            <Typography variant="body2" component="span" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
              browse
            </Typography>
            &nbsp;thorough your machine
          </Typography>
        </Box>
      </DropZoneStyle>

      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}
