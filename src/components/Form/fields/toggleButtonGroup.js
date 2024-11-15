import React, { useContext } from 'react';
import { defaultTo } from 'lodash';
import { ToggleButtonGroup as BaseToggleButtonGroup } from '@material-ui/core';
import { FormInputContext } from 'components/Form/contexts';

const ToggleButtonGroup = ({ value, ...baseProps }) => {
  const { validateStatus } = useContext(FormInputContext);

  switch (validateStatus) {
    case 'error':
      baseProps.color = 'error';
      break;
    case 'success':
      baseProps.color = 'primary';
      break;
    default:
      baseProps.color = 'primary';
  }

  return <BaseToggleButtonGroup value={defaultTo(value, '')} {...baseProps} />;
};

export default ToggleButtonGroup;
