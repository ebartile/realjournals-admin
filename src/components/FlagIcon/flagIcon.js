import React from 'react';
import { toLower } from 'lodash';
import { Box } from '@material-ui/core';

const FlagIcon = ({ code, ...otherProps }) => {
  return <Box {...otherProps} className={`flag-icon flag-icon-${toLower(code)}`} component="span" />;
};

export default FlagIcon;
